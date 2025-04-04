const express = require('express');
const videoCallController = require('../controllers/videoCall.controller');
const authController = require('../controllers/auth.controller');

const router = express.Router();

// Protect all routes after this middleware
router.use(authController.protect);

// Get all video calls for the authenticated user
router.get('/my-calls', videoCallController.getUserVideoCalls);

// Routes for specific video calls
router
  .route('/')
  .post(videoCallController.createVideoCall);

router
  .route('/:id')
  .get(videoCallController.getVideoCall)
  .patch(videoCallController.updateVideoCall);

// Cancel a video call
router.patch('/:id/cancel', videoCallController.cancelVideoCall);

// Add chat message to a video call
router.post('/:id/chat', videoCallController.addChatMessage);

module.exports = router;
