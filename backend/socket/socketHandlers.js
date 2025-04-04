const jwt = require('jsonwebtoken');
const User = require('../models/User.model');
const VideoCall = require('../models/VideoCall.model');

// Map to store active users and their socket connections
const activeUsers = new Map();
// Map to store active video call rooms
const activeRooms = new Map();

// Authenticate socket connection using JWT token
const authenticateSocket = async (socket, next) => {
  try {
    const token = socket.handshake.auth.token;
    
    if (!token) {
      return next(new Error('Authentication error: Token not provided'));
    }
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key-here');
    const user = await User.findById(decoded.id);
    
    if (!user) {
      return next(new Error('Authentication error: User not found'));
    }
    
    // Attach user info to socket
    socket.user = {
      id: user._id.toString(),
      name: user.name,
      email: user.email,
      role: user.role
    };
    
    next();
  } catch (error) {
    return next(new Error('Authentication error: Invalid token'));
  }
};

// Setup socket handlers
exports.setupSocketHandlers = (io) => {
  // Use authentication middleware
  io.use(authenticateSocket);
  
  io.on('connection', (socket) => {
    console.log(`User connected: ${socket.user.name} (${socket.user.id})`);
    
    // Add user to active users map
    activeUsers.set(socket.user.id, socket);
    
    // User joins a video call room
    socket.on('join-room', async ({ roomId }) => {
      try {
        // Verify that the video call exists and user is a participant
        const videoCall = await VideoCall.findById(roomId);
        
        if (!videoCall) {
          socket.emit('error', { message: 'Video call not found' });
          return;
        }
        
        // Check if user is a participant
        const isParticipant = videoCall.participants.some(
          participant => participant.user.toString() === socket.user.id
        );
        
        if (!isParticipant) {
          socket.emit('error', { message: 'You are not authorized to join this video call' });
          return;
        }
        
        // Join the room
        socket.join(roomId);
        console.log(`${socket.user.name} joined room: ${roomId}`);
        
        // Update join time for participant
        const participantIndex = videoCall.participants.findIndex(
          p => p.user.toString() === socket.user.id
        );
        
        if (participantIndex !== -1) {
          videoCall.participants[participantIndex].joinedAt = new Date();
          await videoCall.save();
        }
        
        // If video call is not in progress, update status
        if (videoCall.status === 'scheduled') {
          videoCall.status = 'in-progress';
          videoCall.actualStartTime = new Date();
          await videoCall.save();
        }
        
        // Get current participants in the room
        const roomParticipants = Array.from(io.sockets.adapter.rooms.get(roomId) || [])
          .map(socketId => io.sockets.sockets.get(socketId).user);
        
        // Add room to active rooms if not already there
        if (!activeRooms.has(roomId)) {
          activeRooms.set(roomId, {
            id: roomId,
            participants: new Set()
          });
        }
        
        // Add this participant to the room
        activeRooms.get(roomId).participants.add(socket.user.id);
        
        // Inform everyone in the room that a new user has joined
        io.to(roomId).emit('user-joined', {
          user: socket.user,
          participants: roomParticipants,
          timestamp: new Date()
        });
        
        // Send the current active participants to the newly joined user
        socket.emit('room-participants', { participants: roomParticipants });
      } catch (error) {
        console.error('Error joining room:', error);
        socket.emit('error', { message: 'Failed to join video call' });
      }
    });
    
    // WebRTC signaling - sending offer
    socket.on('send-signal', ({ to, signal, callerId }) => {
      if (activeUsers.has(to)) {
        activeUsers.get(to).emit('receive-signal', {
          signal,
          callerId,
          callerInfo: socket.user
        });
      }
    });
    
    // WebRTC signaling - sending answer
    socket.on('return-signal', ({ to, signal }) => {
      if (activeUsers.has(to)) {
        activeUsers.get(to).emit('signal-returned', {
          signal,
          id: socket.user.id
        });
      }
    });
    
    // Chat message in video call
    socket.on('send-chat', async ({ roomId, message }) => {
      try {
        const videoCall = await VideoCall.findById(roomId);
        
        if (!videoCall) {
          socket.emit('error', { message: 'Video call not found' });
          return;
        }
        
        // Add chat message to the database
        const chatMessage = {
          sender: socket.user.id,
          message,
          timestamp: new Date()
        };
        
        videoCall.chatMessages.push(chatMessage);
        await videoCall.save();
        
        // Broadcast the message to all participants in the room
        io.to(roomId).emit('receive-chat', {
          sender: {
            id: socket.user.id,
            name: socket.user.name,
            role: socket.user.role
          },
          message,
          timestamp: chatMessage.timestamp
        });
      } catch (error) {
        console.error('Error sending chat message:', error);
        socket.emit('error', { message: 'Failed to send chat message' });
      }
    });
    
    // User leaves a video call room
    socket.on('leave-room', async ({ roomId }) => {
      try {
        console.log(`${socket.user.name} leaving room: ${roomId}`);
        
        // Leave the socket.io room
        socket.leave(roomId);
        
        const videoCall = await VideoCall.findById(roomId);
        if (videoCall) {
          // Update leave time for participant
          const participantIndex = videoCall.participants.findIndex(
            p => p.user.toString() === socket.user.id
          );
          
          if (participantIndex !== -1) {
            videoCall.participants[participantIndex].leftAt = new Date();
            await videoCall.save();
          }
          
          // Remove participant from active room
          if (activeRooms.has(roomId)) {
            activeRooms.get(roomId).participants.delete(socket.user.id);
            
            // If no participants left, end the call
            if (activeRooms.get(roomId).participants.size === 0) {
              videoCall.status = 'completed';
              videoCall.actualEndTime = new Date();
              await videoCall.save();
              
              // Remove the room from active rooms
              activeRooms.delete(roomId);
            }
          }
        }
        
        // Notify others that user has left
        io.to(roomId).emit('user-left', {
          userId: socket.user.id,
          name: socket.user.name,
          timestamp: new Date()
        });
      } catch (error) {
        console.error('Error leaving room:', error);
      }
    });
    
    // Handle disconnection
    socket.on('disconnect', async () => {
      console.log(`User disconnected: ${socket.user.name} (${socket.user.id})`);
      
      // Remove user from active users
      activeUsers.delete(socket.user.id);
      
      // Handle user disconnection from active rooms
      for (const [roomId, room] of activeRooms.entries()) {
        if (room.participants.has(socket.user.id)) {
          try {
            // User was in this room, update participation info
            room.participants.delete(socket.user.id);
            
            const videoCall = await VideoCall.findById(roomId);
            if (videoCall) {
              // Update leave time for participant
              const participantIndex = videoCall.participants.findIndex(
                p => p.user.toString() === socket.user.id
              );
              
              if (participantIndex !== -1) {
                videoCall.participants[participantIndex].leftAt = new Date();
                await videoCall.save();
              }
              
              // If no participants left, end the call
              if (room.participants.size === 0) {
                videoCall.status = 'completed';
                videoCall.actualEndTime = new Date();
                await videoCall.save();
                
                // Remove the room from active rooms
                activeRooms.delete(roomId);
              }
            }
            
            // Notify others that user has left
            io.to(roomId).emit('user-left', {
              userId: socket.user.id,
              name: socket.user.name,
              timestamp: new Date()
            });
          } catch (error) {
            console.error('Error handling disconnection from room:', error);
          }
        }
      }
    });
  });
};
