const User = require('../models/User.model');

// Get current user profile
exports.getMe = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    
    res.status(200).json({
      status: 'success',
      data: {
        user
      }
    });
  } catch (error) {
    next(error);
  }
};

// Update current user profile
exports.updateMe = async (req, res, next) => {
  try {
    // Check if user is trying to update password
    if (req.body.password) {
      const error = new Error('This route is not for password updates. Please use /updatePassword.');
      error.statusCode = 400;
      return next(error);
    }
    
    // Filter out unwanted fields that are not allowed to be updated
    const filteredBody = filterObj(
      req.body,
      'name',
      'email',
      'profilePicture',
      'phoneNumber',
      'bio',
      'availability',
      'specialty',
      'certifications',
      'experiences',
      'emergencyContact'
    );
    
    // Update user document
    const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
      new: true,
      runValidators: true
    });
    
    res.status(200).json({
      status: 'success',
      data: {
        user: updatedUser
      }
    });
  } catch (error) {
    next(error);
  }
};

// Get providers (doctors, nurses, etc.)
exports.getProviders = async (req, res, next) => {
  try {
    const providers = await User.find({ role: 'provider' })
      .select('name email profilePicture specialty certifications availability');
    
    res.status(200).json({
      status: 'success',
      results: providers.length,
      data: {
        providers
      }
    });
  } catch (error) {
    next(error);
  }
};

// Get advocates
exports.getAdvocates = async (req, res, next) => {
  try {
    const advocates = await User.find({ role: 'advocate' })
      .select('name email profilePicture specialty certifications experiences availability');
    
    res.status(200).json({
      status: 'success',
      results: advocates.length,
      data: {
        advocates
      }
    });
  } catch (error) {
    next(error);
  }
};

// Get single provider or advocate by ID
exports.getUserById = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id)
      .select('name email profilePicture role specialty certifications experiences availability');
    
    if (!user) {
      const error = new Error('No user found with that ID');
      error.statusCode = 404;
      return next(error);
    }
    
    // Only allow access to providers and advocates
    if (user.role !== 'provider' && user.role !== 'advocate') {
      const error = new Error('You can only view providers and advocates');
      error.statusCode = 403;
      return next(error);
    }
    
    res.status(200).json({
      status: 'success',
      data: {
        user
      }
    });
  } catch (error) {
    next(error);
  }
};

// Helper function to filter allowed fields
const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach(key => {
    if (allowedFields.includes(key)) {
      newObj[key] = obj[key];
    }
  });
  return newObj;
};
