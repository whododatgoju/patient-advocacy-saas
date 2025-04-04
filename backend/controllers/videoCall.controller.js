const VideoCall = require('../models/VideoCall.model');
const User = require('../models/User.model');

// Create a new video call
exports.createVideoCall = async (req, res, next) => {
  try {
    const {
      title,
      scheduledStartTime,
      scheduledEndTime,
      participantIds,
      participantRoles,
      notes
    } = req.body;

    // Validate participants data
    if (!participantIds || !participantRoles || participantIds.length !== participantRoles.length) {
      const error = new Error('Invalid participants data');
      error.statusCode = 400;
      return next(error);
    }

    // Verify all participants exist
    const participants = [];
    for (let i = 0; i < participantIds.length; i++) {
      const user = await User.findById(participantIds[i]);
      if (!user) {
        const error = new Error(`User with ID ${participantIds[i]} not found`);
        error.statusCode = 404;
        return next(error);
      }
      participants.push({
        user: participantIds[i],
        role: participantRoles[i]
      });
    }

    // Add the creator if not already included
    if (!participantIds.includes(req.user.id)) {
      participants.push({
        user: req.user.id,
        role: req.user.role
      });
    }

    // Create the video call
    const newVideoCall = await VideoCall.create({
      title,
      scheduledStartTime,
      scheduledEndTime,
      participants,
      creator: req.user.id,
      notes
    });

    // Return the newly created video call
    res.status(201).json({
      status: 'success',
      data: {
        videoCall: newVideoCall
      }
    });
  } catch (error) {
    next(error);
  }
};

// Get all video calls for a user
exports.getUserVideoCalls = async (req, res, next) => {
  try {
    const { status, startDate, endDate } = req.query;
    
    // Build query object
    const query = {
      'participants.user': req.user.id
    };
    
    // Filter by status if provided
    if (status) {
      query.status = status;
    }
    
    // Filter by date range if provided
    if (startDate || endDate) {
      query.scheduledStartTime = {};
      if (startDate) {
        query.scheduledStartTime.$gte = new Date(startDate);
      }
      if (endDate) {
        query.scheduledStartTime.$lte = new Date(endDate);
      }
    }
    
    // Find video calls
    const videoCalls = await VideoCall.find(query)
      .populate({
        path: 'participants.user',
        select: 'name email profilePicture role'
      })
      .populate({
        path: 'creator',
        select: 'name email profilePicture role'
      })
      .sort({ scheduledStartTime: 1 });
    
    res.status(200).json({
      status: 'success',
      results: videoCalls.length,
      data: {
        videoCalls
      }
    });
  } catch (error) {
    next(error);
  }
};

// Get a single video call by ID
exports.getVideoCall = async (req, res, next) => {
  try {
    const videoCall = await VideoCall.findById(req.params.id)
      .populate({
        path: 'participants.user',
        select: 'name email profilePicture role'
      })
      .populate({
        path: 'creator',
        select: 'name email profilePicture role'
      });
    
    if (!videoCall) {
      const error = new Error('No video call found with that ID');
      error.statusCode = 404;
      return next(error);
    }
    
    // Check if the user is a participant
    const isParticipant = videoCall.participants.some(
      participant => participant.user._id.toString() === req.user.id
    );
    
    if (!isParticipant && req.user.role !== 'admin') {
      const error = new Error('You are not authorized to access this video call');
      error.statusCode = 403;
      return next(error);
    }
    
    res.status(200).json({
      status: 'success',
      data: {
        videoCall
      }
    });
  } catch (error) {
    next(error);
  }
};

// Update a video call
exports.updateVideoCall = async (req, res, next) => {
  try {
    const { title, scheduledStartTime, scheduledEndTime, status, notes } = req.body;
    
    const videoCall = await VideoCall.findById(req.params.id);
    
    if (!videoCall) {
      const error = new Error('No video call found with that ID');
      error.statusCode = 404;
      return next(error);
    }
    
    // Check if the user is the creator or an admin
    if (videoCall.creator.toString() !== req.user.id && req.user.role !== 'admin') {
      const error = new Error('You are not authorized to update this video call');
      error.statusCode = 403;
      return next(error);
    }
    
    // Cannot update a completed or canceled call
    if (videoCall.status === 'completed' || videoCall.status === 'canceled') {
      const error = new Error(`Cannot update a ${videoCall.status} video call`);
      error.statusCode = 400;
      return next(error);
    }
    
    // Update fields
    if (title) videoCall.title = title;
    if (scheduledStartTime) videoCall.scheduledStartTime = scheduledStartTime;
    if (scheduledEndTime) videoCall.scheduledEndTime = scheduledEndTime;
    if (status) videoCall.status = status;
    if (notes) videoCall.notes = notes;
    
    await videoCall.save();
    
    res.status(200).json({
      status: 'success',
      data: {
        videoCall
      }
    });
  } catch (error) {
    next(error);
  }
};

// Cancel a video call
exports.cancelVideoCall = async (req, res, next) => {
  try {
    const videoCall = await VideoCall.findById(req.params.id);
    
    if (!videoCall) {
      const error = new Error('No video call found with that ID');
      error.statusCode = 404;
      return next(error);
    }
    
    // Check if the user is a participant
    const isParticipant = videoCall.participants.some(
      participant => participant.user.toString() === req.user.id
    );
    
    if (!isParticipant && req.user.role !== 'admin') {
      const error = new Error('You are not authorized to cancel this video call');
      error.statusCode = 403;
      return next(error);
    }
    
    // Cannot cancel a completed call
    if (videoCall.status === 'completed') {
      const error = new Error('Cannot cancel a completed video call');
      error.statusCode = 400;
      return next(error);
    }
    
    // Set status to canceled
    videoCall.status = 'canceled';
    await videoCall.save();
    
    res.status(200).json({
      status: 'success',
      data: {
        videoCall
      }
    });
  } catch (error) {
    next(error);
  }
};

// Add a chat message to a video call
exports.addChatMessage = async (req, res, next) => {
  try {
    const { message } = req.body;
    
    if (!message) {
      const error = new Error('Message content is required');
      error.statusCode = 400;
      return next(error);
    }
    
    const videoCall = await VideoCall.findById(req.params.id);
    
    if (!videoCall) {
      const error = new Error('No video call found with that ID');
      error.statusCode = 404;
      return next(error);
    }
    
    // Check if the user is a participant
    const isParticipant = videoCall.participants.some(
      participant => participant.user.toString() === req.user.id
    );
    
    if (!isParticipant) {
      const error = new Error('You are not authorized to add messages to this video call');
      error.statusCode = 403;
      return next(error);
    }
    
    // Add chat message
    const chatMessage = {
      sender: req.user.id,
      message,
      timestamp: new Date()
    };
    
    videoCall.chatMessages.push(chatMessage);
    await videoCall.save();
    
    res.status(201).json({
      status: 'success',
      data: {
        chatMessage
      }
    });
  } catch (error) {
    next(error);
  }
};
