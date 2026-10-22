const jwt = require('jsonwebtoken');
const User = require('../modules/auth/user.model');
const { errorResponse } = require('../utils/apiResponse');

const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET
      );

      req.user = await User.findById(decoded.id).select('-password');
      if (!req.user) {
        return errorResponse(res, 'User linked to this token no longer exists', 401, 'USER_NOT_FOUND');
      }

      return next();
    } catch (error) {
      return errorResponse(res, 'Invalid or expired authorization token', 401, 'INVALID_TOKEN');
    }
  }

  if (!token) {
    return errorResponse(res, 'Please sign in to perform this action', 401, 'UNAUTHORIZED');
  }
};

const optionalAuth = async (req, res, next) => {
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      const token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET
      );
      req.user = await User.findById(decoded.id).select('-password');
    } catch (e) {
      // Ignored for optional authentication
    }
  }
  next();
};

module.exports = {
  protect,
  optionalAuth
};
