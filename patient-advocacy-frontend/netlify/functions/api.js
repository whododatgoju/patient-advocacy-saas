const express = require('express');
const serverless = require('serverless-http');
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Initialize express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
let cachedDb = null;
const connectToDatabase = async () => {
  if (cachedDb) {
    return cachedDb;
  }
  
  const mongoUri = process.env.MONGODB_URI || 'mongodb+srv://dcampos2014:YOUR_ACTUAL_PASSWORD@cluster0.7gp1tzu.mongodb.net/patient_advocacy?retryWrites=true&writeConcern=majority';
  
  try {
    // Connect to MongoDB Atlas (required for serverless)
    const client = await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    
    cachedDb = client;
    console.log('Connected to MongoDB Atlas');
    return cachedDb;
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw error;
  }
};

// User Schema/Model (simplified for serverless function)
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, select: false },
  role: { type: String, enum: ['patient', 'advocate', 'provider', 'admin'], default: 'patient' },
  profilePicture: String,
  specialty: String,
  certifications: [String],
  experiences: [{
    title: String,
    organization: String,
    description: String,
    startDate: Date,
    endDate: Date
  }],
  availability: [{
    day: String,
    startTime: String,
    endTime: String
  }],
  bio: String,
  createdAt: { type: Date, default: Date.now }
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

// Compare password method
userSchema.methods.correctPassword = async function(candidatePassword, userPassword) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

const User = mongoose.models.User || mongoose.model('User', userSchema);

// Video Call Schema/Model
const videoCallSchema = new mongoose.Schema({
  title: { type: String, required: true },
  scheduledStartTime: { type: Date, required: true },
  scheduledEndTime: { type: Date, required: true },
  status: {
    type: String,
    enum: ['scheduled', 'in-progress', 'completed', 'canceled'],
    default: 'scheduled'
  },
  participants: [{
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    role: String
  }],
  creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  notes: String,
  createdAt: { type: Date, default: Date.now }
});

const VideoCall = mongoose.models.VideoCall || mongoose.model('VideoCall', videoCallSchema);

// Authentication middleware
const protect = async (req, res, next) => {
  try {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }
    
    if (!token) {
      return res.status(401).json({
        status: 'fail',
        message: 'You are not logged in. Please log in to get access.'
      });
    }
    
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-temp-secret-key');
    
    // Find user
    const currentUser = await User.findById(decoded.id);
    if (!currentUser) {
      return res.status(401).json({
        status: 'fail',
        message: 'The user belonging to this token no longer exists.'
      });
    }
    
    // Grant access
    req.user = currentUser;
    next();
  } catch (error) {
    return res.status(401).json({
      status: 'fail',
      message: 'Invalid token or session expired'
    });
  }
};

// ==================== API Routes ====================

// AUTH ROUTES
// Signup
app.post('/api/auth/signup', async (req, res) => {
  try {
    await connectToDatabase();
    
    const newUser = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      role: req.body.role || 'patient',
      profilePicture: req.body.profilePicture,
      specialty: req.body.specialty,
      certifications: req.body.certifications,
      experiences: req.body.experiences,
      availability: req.body.availability,
      bio: req.body.bio
    });
    
    // Remove password from output
    newUser.password = undefined;
    
    // Create JWT
    const token = jwt.sign(
      { id: newUser._id },
      process.env.JWT_SECRET || 'your-temp-secret-key',
      { expiresIn: '7d' }
    );
    
    res.status(201).json({
      status: 'success',
      token,
      data: { user: newUser }
    });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(400).json({
      status: 'fail',
      message: error.message
    });
  }
});

// Login
app.post('/api/auth/login', async (req, res) => {
  try {
    await connectToDatabase();
    
    const { email, password } = req.body;
    
    // Check if email and password exist
    if (!email || !password) {
      return res.status(400).json({
        status: 'fail',
        message: 'Please provide email and password'
      });
    }
    
    // Check if user exists & password is correct
    const user = await User.findOne({ email }).select('+password');
    
    if (!user || !(await user.correctPassword(password, user.password))) {
      return res.status(401).json({
        status: 'fail',
        message: 'Incorrect email or password'
      });
    }
    
    // Create JWT
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET || 'your-temp-secret-key',
      { expiresIn: '7d' }
    );
    
    // Remove password from output
    user.password = undefined;
    
    res.status(200).json({
      status: 'success',
      token,
      data: { user }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(400).json({
      status: 'fail',
      message: error.message
    });
  }
});

// USER ROUTES
// Get current user
app.get('/api/users/me', protect, async (req, res) => {
  try {
    res.status(200).json({
      status: 'success',
      data: { user: req.user }
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
});

// Get all providers
app.get('/api/users/providers', async (req, res) => {
  try {
    await connectToDatabase();
    
    const providers = await User.find({ role: 'provider' })
      .select('name email profilePicture specialty certifications availability');
    
    res.status(200).json({
      status: 'success',
      results: providers.length,
      data: { providers }
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
});

// Get all advocates
app.get('/api/users/advocates', async (req, res) => {
  try {
    await connectToDatabase();
    
    const advocates = await User.find({ role: 'advocate' })
      .select('name email profilePicture specialty certifications experiences availability bio');
    
    res.status(200).json({
      status: 'success',
      results: advocates.length,
      data: { advocates }
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
});

// VIDEO CALL ROUTES
// Create a video call
app.post('/api/video-calls', protect, async (req, res) => {
  try {
    await connectToDatabase();
    
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
      return res.status(400).json({
        status: 'fail',
        message: 'Invalid participants data'
      });
    }
    
    // Create participants array
    const participants = participantIds.map((id, index) => ({
      user: id,
      role: participantRoles[index]
    }));
    
    // Add creator if not included
    if (!participantIds.includes(req.user._id.toString())) {
      participants.push({
        user: req.user._id,
        role: req.user.role
      });
    }
    
    // Create the video call
    const newVideoCall = await VideoCall.create({
      title,
      scheduledStartTime,
      scheduledEndTime,
      participants,
      creator: req.user._id,
      notes
    });
    
    res.status(201).json({
      status: 'success',
      data: { videoCall: newVideoCall }
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error.message
    });
  }
});

// Get user's video calls
app.get('/api/video-calls/my-calls', protect, async (req, res) => {
  try {
    await connectToDatabase();
    
    const { status, startDate, endDate } = req.query;
    
    // Build query
    const query = {
      'participants.user': req.user._id
    };
    
    if (status) {
      query.status = status;
    }
    
    if (startDate || endDate) {
      query.scheduledStartTime = {};
      if (startDate) {
        query.scheduledStartTime.$gte = new Date(startDate);
      }
      if (endDate) {
        query.scheduledStartTime.$lte = new Date(endDate);
      }
    }
    
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
      data: { videoCalls }
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
});

// Get single video call
app.get('/api/video-calls/:id', protect, async (req, res) => {
  try {
    await connectToDatabase();
    
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
      return res.status(404).json({
        status: 'fail',
        message: 'No video call found with that ID'
      });
    }
    
    // Check if user is participant
    const isParticipant = videoCall.participants.some(
      p => p.user._id.toString() === req.user._id.toString()
    );
    
    if (!isParticipant && req.user.role !== 'admin') {
      return res.status(403).json({
        status: 'fail',
        message: 'You are not authorized to access this video call'
      });
    }
    
    res.status(200).json({
      status: 'success',
      data: { videoCall }
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
});

// Update video call status
app.patch('/api/video-calls/:id/status', protect, async (req, res) => {
  try {
    await connectToDatabase();
    
    const { status } = req.body;
    
    if (!status || !['scheduled', 'in-progress', 'completed', 'canceled'].includes(status)) {
      return res.status(400).json({
        status: 'fail',
        message: 'Invalid status provided'
      });
    }
    
    const videoCall = await VideoCall.findById(req.params.id);
    
    if (!videoCall) {
      return res.status(404).json({
        status: 'fail',
        message: 'No video call found with that ID'
      });
    }
    
    // Update status
    videoCall.status = status;
    await videoCall.save();
    
    res.status(200).json({
      status: 'success',
      data: { videoCall }
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error.message
    });
  }
});

// ADVOCATE ROUTES
// Match with advocates
app.post('/api/advocates/match', async (req, res) => {
  try {
    await connectToDatabase();
    
    const {
      conditions = [],
      specialtyNeeded,
      experienceLevel,
      availabilityNeeded
    } = req.body;
    
    // Build query
    const queryObj = { role: 'advocate' };
    
    if (specialtyNeeded) {
      queryObj.specialty = specialtyNeeded;
    }
    
    // Find advocates
    let advocates = await User.find(queryObj)
      .select('name email profilePicture specialty certifications experiences availability bio');
    
    // Calculate match scores
    advocates = advocates.map(advocate => {
      let score = 0;
      
      // Score based on specialty match
      if (specialtyNeeded && advocate.specialty === specialtyNeeded) {
        score += 30;
      }
      
      // Score based on conditions knowledge
      if (conditions.length > 0 && advocate.bio) {
        conditions.forEach(condition => {
          if (advocate.bio.toLowerCase().includes(condition.toLowerCase())) {
            score += 10;
          }
        });
      }
      
      // Score based on certifications
      if (advocate.certifications && advocate.certifications.length > 0) {
        score += Math.min(advocate.certifications.length * 5, 20);
      }
      
      return {
        ...advocate.toObject(),
        matchScore: score
      };
    });
    
    // Sort by match score
    advocates.sort((a, b) => b.matchScore - a.matchScore);
    
    res.status(200).json({
      status: 'success',
      results: advocates.length,
      data: { advocates }
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
});

// Add a test user endpoint for easy testing and development
app.get('/create-test-users', async (req, res) => {
  try {
    console.log('Creating test users for development purposes');
    
    // Define test users for each role
    const testUsers = [
      {
        name: 'Test Patient',
        email: 'test@patient.com',
        password: 'password123',
        role: 'patient',
        medicalConditions: ['Diabetes Type 2', 'Hypertension'],
        primaryConcerns: 'Managing medications and doctor appointments',
        insuranceProvider: 'Blue Cross Blue Shield'
      },
      {
        name: 'Test Advocate',
        email: 'test@advocate.com',
        password: 'password123',
        role: 'advocate',
        specializations: ['Insurance Navigation', 'Patient Rights'],
        yearsOfExperience: '5',
        languages: ['English', 'Spanish'],
        bio: 'Experienced healthcare advocate specializing in patient rights and insurance navigation.'
      },
      {
        name: 'Dr. Test Provider',
        email: 'test@provider.com',
        password: 'password123',
        role: 'provider',
        organization: 'Community Health Center',
        title: 'Family Physician',
        licensure: 'MD',
        specializations: ['Family Medicine', 'Preventive Care']
      }
    ];
    
    const createdUsers = [];
    const errors = [];
    
    // Find or create each test user
    for (const userData of testUsers) {
      try {
        // Check if user already exists
        const existingUser = await User.findOne({ email: userData.email });
        
        if (existingUser) {
          createdUsers.push({
            email: existingUser.email,
            role: existingUser.role,
            status: 'already exists'
          });
          continue;
        }
        
        // Create new user
        const hashedPassword = await bcrypt.hash(userData.password, 10);
        const newUser = new User({
          ...userData,
          password: hashedPassword
        });
        
        await newUser.save();
        
        createdUsers.push({
          email: newUser.email,
          role: newUser.role,
          status: 'created'
        });
      } catch (userError) {
        errors.push({
          email: userData.email,
          error: userError.message
        });
      }
    }
    
    res.json({
      success: true,
      message: 'Test user setup complete',
      users: createdUsers,
      errors: errors.length > 0 ? errors : undefined
    });
  } catch (error) {
    console.error('Failed to create test users:', error);
    res.status(500).json({ 
      success: false, 
      error: error.message,
      message: 'Failed to create test users' 
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'API is running'
  });
});

// Not found route
app.use('*', (req, res) => {
  res.status(404).json({
    status: 'fail',
    message: `Can't find ${req.originalUrl} on this server!`
  });
});

// Export the serverless handler
module.exports.handler = serverless(app);
