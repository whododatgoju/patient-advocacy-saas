const mongoose = require('mongoose');

const videoCallSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'A video call must have a title'],
    trim: true
  },
  scheduledStartTime: {
    type: Date,
    required: [true, 'A video call must have a scheduled start time']
  },
  scheduledEndTime: {
    type: Date,
    required: [true, 'A video call must have a scheduled end time']
  },
  actualStartTime: {
    type: Date
  },
  actualEndTime: {
    type: Date
  },
  status: {
    type: String,
    enum: ['scheduled', 'in-progress', 'completed', 'canceled'],
    default: 'scheduled'
  },
  participants: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'A participant must be associated with a user']
    },
    role: {
      type: String,
      enum: ['patient', 'advocate', 'provider'],
      required: [true, 'A participant must have a role']
    },
    joinedAt: Date,
    leftAt: Date
  }],
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'A video call must have a creator']
  },
  notes: {
    type: String,
    trim: true
  },
  recordingUrl: String,
  callSummary: String,
  actionItems: [{
    description: String,
    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    completed: {
      type: Boolean,
      default: false
    },
    dueDate: Date
  }],
  chatMessages: [{
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    message: {
      type: String,
      required: true
    },
    timestamp: {
      type: Date,
      default: Date.now
    }
  }]
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Indexes for efficient querying
videoCallSchema.index({ scheduledStartTime: 1 });
videoCallSchema.index({ status: 1 });
videoCallSchema.index({ 'participants.user': 1 });

// Virtual property to calculate duration in minutes
videoCallSchema.virtual('scheduledDuration').get(function() {
  if (!this.scheduledStartTime || !this.scheduledEndTime) return null;
  const durationMs = this.scheduledEndTime - this.scheduledStartTime;
  return Math.round(durationMs / (1000 * 60)); // Convert to minutes
});

videoCallSchema.virtual('actualDuration').get(function() {
  if (!this.actualStartTime || !this.actualEndTime) return null;
  const durationMs = this.actualEndTime - this.actualStartTime;
  return Math.round(durationMs / (1000 * 60)); // Convert to minutes
});

// Pre-save hook to validate times
videoCallSchema.pre('save', function(next) {
  // Ensure scheduled end time is after scheduled start time
  if (this.scheduledEndTime <= this.scheduledStartTime) {
    const error = new Error('Scheduled end time must be after scheduled start time');
    error.statusCode = 400;
    return next(error);
  }
  
  // If actual times are provided, ensure they make sense
  if (this.actualStartTime && this.actualEndTime) {
    if (this.actualEndTime <= this.actualStartTime) {
      const error = new Error('Actual end time must be after actual start time');
      error.statusCode = 400;
      return next(error);
    }
  }
  
  next();
});

const VideoCall = mongoose.model('VideoCall', videoCallSchema);

module.exports = VideoCall;
