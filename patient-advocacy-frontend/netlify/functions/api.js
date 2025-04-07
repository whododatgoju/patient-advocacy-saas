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

// Import required packages
const bodyParser = require('body-parser');

// Initialize MongoDB connection using the recommended pattern for serverless
const mongoClient = mongoose.connection;
let isConnected = false;

// Connect to MongoDB - this pattern is optimized for serverless functions
const connectToDatabase = async () => {
  if (isConnected) {
    console.log('Using existing database connection');
    return;
  }

  console.log('Creating new database connection');
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://dcampos2014:YOUR_ACTUAL_PASSWORD@cluster0.7gp1tzu.mongodb.net/patient_advocacy?retryWrites=true&writeConcern=majority', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    isConnected = true;
    console.log('Database connected successfully');
  } catch (error) {
    console.error('Database connection error:', error);
    throw error;
  }
};

// Define MongoDB schemas
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

// Ensure DB connection before request handling
app.use(async (req, res, next) => {
  try {
    await connectToDatabase();
    next();
  } catch (error) {
    console.error('Database connection middleware error:', error);
    res.status(500).json({ success: false, message: 'Database connection failed' });
  }
});

// AUTH ROUTES
// Signup
app.post('/api/auth/signup', async (req, res) => {
  try {
    const { name, email, password, role, ...additionalData } = req.body;
    
    // Validate request
    if (!name || !email || !password || !role) {
      return res.status(400).json({ success: false, message: 'Missing required fields' });
    }
    
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: 'User already exists' });
    }
    
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Create user based on role with additional data
    const userData = {
      name,
      email,
      password: hashedPassword,
      role,
      ...additionalData
    };
    
    const newUser = new User(userData);
    await newUser.save();
    
    // Generate JWT token
    const token = jwt.sign(
      { userId: newUser._id, email: newUser.email, role: newUser.role },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '7d' }
    );
    
    res.status(201).json({
      success: true,
      token,
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role
      }
    });
    
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ success: false, message: 'Error creating user', error: error.message });
  }
});

// Login
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Validate request
    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Email and password are required' });
    }
    
    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
    
    // Compare passwords
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
    
    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '7d' }
    );
    
    res.json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
    
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ success: false, message: 'Error during login', error: error.message });
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

// Update user profile
app.patch('/api/users/profile', protect, async (req, res) => {
  try {
    const allowedFields = [
      'name', 'email', 'bio', 'location', 'phone', 'profilePicture',
      'specialty', 'certifications', 'experiences', 'availability'
    ];
    
    // Filter out fields that are not allowed to be updated
    const filteredBody = {};
    Object.keys(req.body).forEach(field => {
      if (allowedFields.includes(field)) {
        filteredBody[field] = req.body[field];
      }
    });
    
    // If email is being updated, check if it's already in use
    if (filteredBody.email && filteredBody.email !== req.user.email) {
      const existingUser = await User.findOne({ email: filteredBody.email });
      if (existingUser) {
        return res.status(400).json({
          status: 'fail',
          message: 'Email already in use'
        });
      }
    }
    
    // Update user
    const updatedUser = await User.findByIdAndUpdate(req.user._id, filteredBody, {
      new: true,
      runValidators: true
    });
    
    res.status(200).json({
      status: 'success',
      data: { user: updatedUser }
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error.message
    });
  }
});

// Update user password
app.patch('/api/users/password', protect, async (req, res) => {
  try {
    const { currentPassword, newPassword, confirmPassword } = req.body;
    
    // Check if all fields are provided
    if (!currentPassword || !newPassword || !confirmPassword) {
      return res.status(400).json({
        status: 'fail',
        message: 'Please provide all password fields'
      });
    }
    
    // Check if new password and confirm password match
    if (newPassword !== confirmPassword) {
      return res.status(400).json({
        status: 'fail',
        message: 'New password and confirm password do not match'
      });
    }
    
    // Get user with password
    const user = await User.findById(req.user._id).select('+password');
    
    // Check if current password is correct
    const isPasswordCorrect = await bcrypt.compare(currentPassword, user.password);
    if (!isPasswordCorrect) {
      return res.status(401).json({
        status: 'fail',
        message: 'Current password is incorrect'
      });
    }
    
    // Update password
    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();
    
    res.status(200).json({
      status: 'success',
      message: 'Password updated successfully'
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error.message
    });
  }
});

// Upload profile picture
app.post('/api/users/profile-picture', protect, async (req, res) => {
  try {
    // Note: In a production environment, you would handle file uploads
    // with a service like Cloudinary, AWS S3, or similar.
    // For this implementation, we'll just accept a URL for the profile picture
    const { profilePictureUrl } = req.body;
    
    if (!profilePictureUrl) {
      return res.status(400).json({
        status: 'fail',
        message: 'Please provide a profile picture URL'
      });
    }
    
    // Update user with new profile picture URL
    const updatedUser = await User.findByIdAndUpdate(
      req.user._id, 
      { profilePicture: profilePictureUrl },
      { new: true }
    );
    
    res.status(200).json({
      status: 'success',
      data: { user: updatedUser }
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error.message
    });
  }
});

// Get all providers
app.get('/api/users/providers', async (req, res) => {
  try {
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
        
        // Create new user with hashed password
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
