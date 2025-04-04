// Global error handler middleware
const errorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';
  
  // Development error response - with stack trace
  if (process.env.NODE_ENV === 'development') {
    return res.status(err.statusCode).json({
      status: err.status,
      error: err,
      message: err.message,
      stack: err.stack
    });
  }
  
  // Production error response - clean error message
  // Handle specific error types
  let error = { ...err };
  error.message = err.message;
  
  // Mongoose validation error
  if (err.name === 'ValidationError') {
    error = handleValidationError(err);
  }
  
  // Mongoose duplicate key error
  if (err.code === 11000) {
    error = handleDuplicateFieldsError(err);
  }
  
  // Mongoose cast error (invalid ID)
  if (err.name === 'CastError') {
    error = handleCastError(err);
  }
  
  // Send generic error response
  return res.status(error.statusCode || 500).json({
    status: error.status,
    message: error.message || 'Something went wrong'
  });
};

// Helper for validation errors
const handleValidationError = (err) => {
  const errors = Object.values(err.errors).map(el => el.message);
  const message = `Invalid input data. ${errors.join('. ')}`;
  return { message, statusCode: 400, status: 'fail' };
};

// Helper for duplicate field errors
const handleDuplicateFieldsError = (err) => {
  const value = err.errmsg.match(/(["'])(\\?.)*?\1/)[0];
  const message = `Duplicate field value: ${value}. Please use another value!`;
  return { message, statusCode: 400, status: 'fail' };
};

// Helper for cast errors
const handleCastError = (err) => {
  const message = `Invalid ${err.path}: ${err.value}.`;
  return { message, statusCode: 400, status: 'fail' };
};

module.exports = errorHandler;
