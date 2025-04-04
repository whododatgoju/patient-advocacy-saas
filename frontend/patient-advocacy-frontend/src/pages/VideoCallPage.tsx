import React, { useEffect, useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Peer from 'simple-peer';
import io, { Socket } from 'socket.io-client';
import MainLayout from '../components/layout/MainLayout';
import styles from './VideoCallPage.module.css';
import { FiMic, FiMicOff, FiVideo, FiVideoOff, FiPhoneOff, FiMessageSquare, FiUsers, FiX } from 'react-icons/fi';

interface Message {
  sender: string;
  content: string;
  timestamp: Date;
}

// This would be replaced with real user data from authentication context
const MOCK_CURRENT_USER = {
  id: 'user1',
  name: 'Jane Smith',
  role: 'patient'
};

const VideoCallPage: React.FC = () => {
  const { callId } = useParams<{ callId: string }>();
  const navigate = useNavigate();
  const [callStatus, setCallStatus] = useState<'connecting' | 'connected' | 'failed' | 'ended'>('connecting');
  const [audioEnabled, setAudioEnabled] = useState<boolean>(true);
  const [videoEnabled, setVideoEnabled] = useState<boolean>(true);
  const [chatOpen, setChatOpen] = useState<boolean>(false);
  const [participantsOpen, setParticipantsOpen] = useState<boolean>(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState<string>('');
  const [participants, setParticipants] = useState<{id: string; name: string; role: string}[]>([
    MOCK_CURRENT_USER,
    {id: 'user2', name: 'Dr. James Wilson', role: 'provider'},
    {id: 'user3', name: 'Sarah Johnson', role: 'advocate'}
  ]);
  
  const socketRef = useRef<Socket | null>(null);
  const userVideoRef = useRef<HTMLVideoElement>(null);
  const peerVideoRef = useRef<HTMLVideoElement>(null);
  const userStreamRef = useRef<MediaStream | null>(null);
  const peerRef = useRef<Peer.Instance | null>(null);

  // Setup socket connection and peer connection
  useEffect(() => {
    // In a real implementation, this would connect to your actual socket server
    // socketRef.current = io('https://your-socket-server.com');
    
    // For demo purposes, we'll simulate the connection
    const timer = setTimeout(() => {
      setCallStatus('connected');
    }, 2000);

    // Get user's media stream
    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then(stream => {
        userStreamRef.current = stream;
        if (userVideoRef.current) {
          userVideoRef.current.srcObject = stream;
        }
        
        // In a real implementation, you would create a peer connection here
        // and handle signaling via the socket
        
        // Simulated peer video for demo
        setTimeout(() => {
          simulatePeerVideo();
        }, 3000);
      })
      .catch(error => {
        console.error("Error accessing media devices:", error);
        setCallStatus('failed');
      });

    return () => {
      clearTimeout(timer);
      // Clean up the user's media stream
      if (userStreamRef.current) {
        userStreamRef.current.getTracks().forEach(track => {
          track.stop();
        });
      }
      
      // Clean up the peer connection
      if (peerRef.current) {
        peerRef.current.destroy();
      }
      
      // Clean up socket connection
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, []);

  // For demo purposes - simulates peer video
  const simulatePeerVideo = () => {
    // This is a mockup for demonstrating UI only
    // In a real implementation, you would receive a stream from the peer
    const canvas = document.createElement('canvas');
    canvas.width = 640;
    canvas.height = 480;
    const ctx = canvas.getContext('2d');
    
    if (ctx) {
      // Draw a gradient background
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradient.addColorStop(0, '#4f46e5');
      gradient.addColorStop(1, '#3b82f6');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Draw a placeholder avatar
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(canvas.width / 2, canvas.height / 2 - 50, 80, 0, Math.PI * 2);
      ctx.fill();
      
      // Draw initials
      ctx.font = '70px Arial';
      ctx.fillStyle = '#4f46e5';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('DW', canvas.width / 2, canvas.height / 2 - 50);
      
      // Draw name
      ctx.font = '24px Arial';
      ctx.fillStyle = '#ffffff';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('Dr. James Wilson', canvas.width / 2, canvas.height / 2 + 80);
    }
    
    // Convert canvas to media stream
    const stream = canvas.captureStream(30); // 30 FPS
    
    // Display the stream in the peer video element
    if (peerVideoRef.current) {
      peerVideoRef.current.srcObject = stream;
    }
  };

  const toggleAudio = () => {
    if (userStreamRef.current) {
      const audioTracks = userStreamRef.current.getAudioTracks();
      audioTracks.forEach(track => {
        track.enabled = !audioEnabled;
      });
      setAudioEnabled(!audioEnabled);
    }
  };

  const toggleVideo = () => {
    if (userStreamRef.current) {
      const videoTracks = userStreamRef.current.getVideoTracks();
      videoTracks.forEach(track => {
        track.enabled = !videoEnabled;
      });
      setVideoEnabled(!videoEnabled);
    }
  };

  const endCall = () => {
    setCallStatus('ended');
    
    // In a real implementation, send a signal to end the call
    // and clean up resources
    
    // Navigate back to the dashboard
    setTimeout(() => {
      navigate('/dashboard');
    }, 1500);
  };

  const toggleChat = () => {
    setChatOpen(!chatOpen);
    if (participantsOpen) setParticipantsOpen(false);
  };

  const toggleParticipants = () => {
    setParticipantsOpen(!participantsOpen);
    if (chatOpen) setChatOpen(false);
  };

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim()) {
      const message: Message = {
        sender: MOCK_CURRENT_USER.name,
        content: newMessage,
        timestamp: new Date()
      };
      
      setMessages([...messages, message]);
      setNewMessage('');
      
      // In a real implementation, send the message via socket
      
      // Simulate receiving a response
      if (messages.length === 0) {
        setTimeout(() => {
          const response: Message = {
            sender: 'Dr. James Wilson',
            content: 'Hello! I can see your test results are looking good. How have you been feeling since our last appointment?',
            timestamp: new Date()
          };
          setMessages(prev => [...prev, response]);
        }, 3000);
      }
    }
  };

  return (
    <MainLayout>
      <div className={styles.videoCallContainer}>
        {callStatus === 'connecting' && (
          <div className={styles.connectingOverlay}>
            <div className={styles.spinner}></div>
            <p>Connecting to your call...</p>
          </div>
        )}
        
        {callStatus === 'failed' && (
          <div className={styles.failedOverlay}>
            <div className={styles.iconError}>
              <FiPhoneOff size={48} />
            </div>
            <h2>Call Failed</h2>
            <p>We couldn't establish a connection. Please check your internet connection and try again.</p>
            <button className={styles.retryButton} onClick={() => navigate('/dashboard')}>
              Return to Dashboard
            </button>
          </div>
        )}
        
        {callStatus === 'ended' && (
          <div className={styles.endedOverlay}>
            <h2>Call Ended</h2>
            <p>Thank you for using our video call service.</p>
          </div>
        )}
        
        <div className={styles.videoContainer}>
          <div className={styles.mainVideo}>
            <video
              ref={peerVideoRef}
              className={styles.peerVideo}
              autoPlay
              playsInline
            />
            <div className={styles.peerName}>
              Dr. James Wilson
              <span className={styles.roleBadge}>Provider</span>
            </div>
          </div>
          
          <div className={styles.selfVideo}>
            <video
              ref={userVideoRef}
              className={styles.userVideo}
              autoPlay
              playsInline
              muted
            />
            <div className={styles.userName}>
              You
              <span className={styles.roleBadge}>Patient</span>
            </div>
          </div>
        </div>
        
        <div className={styles.controls}>
          <button 
            className={`${styles.controlButton} ${!audioEnabled ? styles.controlDisabled : ''}`}
            onClick={toggleAudio}
          >
            {audioEnabled ? <FiMic size={24} /> : <FiMicOff size={24} />}
            <span>{audioEnabled ? 'Mute' : 'Unmute'}</span>
          </button>
          
          <button 
            className={`${styles.controlButton} ${!videoEnabled ? styles.controlDisabled : ''}`}
            onClick={toggleVideo}
          >
            {videoEnabled ? <FiVideo size={24} /> : <FiVideoOff size={24} />}
            <span>{videoEnabled ? 'Stop Video' : 'Start Video'}</span>
          </button>
          
          <button 
            className={`${styles.controlButton} ${chatOpen ? styles.controlActive : ''}`}
            onClick={toggleChat}
          >
            <FiMessageSquare size={24} />
            <span>Chat</span>
          </button>
          
          <button 
            className={`${styles.controlButton} ${participantsOpen ? styles.controlActive : ''}`}
            onClick={toggleParticipants}
          >
            <FiUsers size={24} />
            <span>Participants</span>
          </button>
          
          <button 
            className={styles.endCallButton}
            onClick={endCall}
          >
            <FiPhoneOff size={24} />
            <span>End Call</span>
          </button>
        </div>
        
        {/* Chat Sidebar */}
        <div className={`${styles.sidebar} ${chatOpen ? styles.sidebarOpen : ''}`}>
          <div className={styles.sidebarHeader}>
            <h3>Chat</h3>
            <button className={styles.closeButton} onClick={() => setChatOpen(false)}>
              <FiX size={20} />
            </button>
          </div>
          
          <div className={styles.messagesContainer}>
            {messages.length === 0 ? (
              <div className={styles.noMessages}>
                <p>No messages yet</p>
                <p className={styles.noMessagesSubtext}>Send a message to start the conversation</p>
              </div>
            ) : (
              messages.map((message, index) => (
                <div 
                  key={index} 
                  className={`${styles.message} ${message.sender === MOCK_CURRENT_USER.name ? styles.outgoingMessage : styles.incomingMessage}`}
                >
                  <div className={styles.messageHeader}>
                    <span className={styles.messageSender}>{message.sender}</span>
                    <span className={styles.messageTime}>
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                  <div className={styles.messageContent}>{message.content}</div>
                </div>
              ))
            )}
          </div>
          
          <form className={styles.messageForm} onSubmit={sendMessage}>
            <input
              type="text"
              placeholder="Type a message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              className={styles.messageInput}
            />
            <button type="submit" className={styles.sendButton}>Send</button>
          </form>
        </div>
        
        {/* Participants Sidebar */}
        <div className={`${styles.sidebar} ${participantsOpen ? styles.sidebarOpen : ''}`}>
          <div className={styles.sidebarHeader}>
            <h3>Participants (3)</h3>
            <button className={styles.closeButton} onClick={() => setParticipantsOpen(false)}>
              <FiX size={20} />
            </button>
          </div>
          
          <div className={styles.participantsList}>
            {participants.map((participant) => (
              <div key={participant.id} className={styles.participant}>
                <div className={styles.participantAvatar}>
                  {participant.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div className={styles.participantInfo}>
                  <div className={styles.participantName}>
                    {participant.name}
                    {participant.id === MOCK_CURRENT_USER.id && <span className={styles.youBadge}>You</span>}
                  </div>
                  <div className={styles.participantRole}>{participant.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default VideoCallPage;
