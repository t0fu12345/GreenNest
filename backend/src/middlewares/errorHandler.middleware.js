const { errorResponse } = require('../utils/apiResponse');

// 404 Not Found Middleware
const notFound = (req, res, next) => {
  return errorResponse(res, `Route not found - ${req.originalUrl}`, 404, 'NOT_FOUND');
};

// Global Error Handler Middleware
const errorHandler = (err, req, res, next) => {
  let statusCode = err.statusCode || (res.statusCode === 200 ? 500 : res.statusCode);
  let message = err.message || 'Internal Server Error';
  let errorCode = err.errorCode || 'SERVER_ERROR';

  // Mongoose Bad ObjectId (CastError)
  if (err.name === 'CastError' && err.kind === 'ObjectId') {
    statusCode = 404;
    message = 'Resource not found with the provided identifier';
    errorCode = 'RESOURCE_NOT_FOUND';
  }

  // Mongoose Validation Error
  if (err.name === 'ValidationError') {
    statusCode = 400;
    message = Object.values(err.errors).map(val => val.message).join(', ');
    errorCode = 'VALIDATION_ERROR';
  }

  // Mongoose Duplicate Key Error (code 11000)
  if (err.code === 11000) {
    statusCode = 409;
    const field = Object.keys(err.keyValue)[0];
    message = `Field '${field}' already exists in the system`;
    errorCode = 'DUPLICATE_KEY';
  }

  // JWT Errors
  if (err.name === 'JsonWebTokenError') {
    statusCode = 401;
    message = 'Invalid JWT authentication token';
    errorCode = 'UNAUTHORIZED';
  }

  if (err.name === 'TokenExpiredError') {
    statusCode = 401;
    message = 'Authentication token has expired. Please sign in again';
    errorCode = 'TOKEN_EXPIRED';
  }

  console.error(`💥 [Error] ${req.method} ${req.originalUrl}:`, err);

  return errorResponse(
    res,
    message,
    statusCode,
    errorCode,
    process.env.NODE_ENV === 'development' ? [{ stack: err.stack }] : []
  );
};

module.exports = {
  notFound,
  errorHandler
};
