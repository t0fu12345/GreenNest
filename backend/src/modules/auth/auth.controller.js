const authService = require('./auth.service');
const { successResponse, errorResponse } = require('../../utils/apiResponse');

class AuthController {
  async register(req, res, next) {
    try {
      const { fullName, email, password } = req.body;

      if (!fullName || !email || !password) {
        return errorResponse(res, 'Please provide full name, email, and password', 400, 'MISSING_FIELDS');
      }

      const result = await authService.register({ fullName, email, password });
      return successResponse(res, result, 'User account registered successfully', 201);
    } catch (error) {
      if (error.statusCode) {
        return errorResponse(res, error.message, error.statusCode, error.errorCode);
      }
      next(error);
    }
  }

  async login(req, res, next) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return errorResponse(res, 'Please provide email and password', 400, 'MISSING_FIELDS');
      }

      const result = await authService.login({ email, password });
      return successResponse(res, result, 'User authenticated successfully');
    } catch (error) {
      if (error.statusCode) {
        return errorResponse(res, error.message, error.statusCode, error.errorCode);
      }
      next(error);
    }
  }

  async getMe(req, res, next) {
    try {
      const profile = await authService.getProfile(req.user._id);
      return successResponse(res, profile, 'User profile retrieved successfully');
    } catch (error) {
      next(error);
    }
  }

  async changePassword(req, res, next) {
    try {
      const { currentPassword, newPassword } = req.body;

      if (!currentPassword || !newPassword) {
        return errorResponse(res, 'Please provide both current and new passwords', 400, 'MISSING_FIELDS');
      }

      await authService.changePassword(req.user._id, currentPassword, newPassword);
      return successResponse(res, null, 'Password updated successfully');
    } catch (error) {
      if (error.statusCode) {
        return errorResponse(res, error.message, error.statusCode, error.errorCode);
      }
      next(error);
    }
  }
}

module.exports = new AuthController();
