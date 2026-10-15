const authService = require('./auth.service');
const { successResponse, errorResponse } = require('../../utils/apiResponse');

class AuthController {
  async register(req, res, next) {
    try {
      const { fullName, email, password } = req.body;

      if (!fullName || !email || !password) {
        return errorResponse(res, 'Vui lòng điền đầy đủ họ tên, email và mật khẩu', 400, 'MISSING_FIELDS');
      }

      const result = await authService.register({ fullName, email, password });
      return successResponse(res, result, 'Đăng ký tài khoản thành công', 201);
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
        return errorResponse(res, 'Vui lòng cung cấp email và mật khẩu', 400, 'MISSING_FIELDS');
      }

      const result = await authService.login({ email, password });
      return successResponse(res, result, 'Đăng nhập thành công');
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
      return successResponse(res, profile, 'Lấy thông tin tài khoản thành công');
    } catch (error) {
      next(error);
    }
  }

  async changePassword(req, res, next) {
    try {
      const { currentPassword, newPassword } = req.body;

      if (!currentPassword || !newPassword) {
        return errorResponse(res, 'Vui lòng cung cấp mật khẩu hiện tại và mật khẩu mới', 400, 'MISSING_FIELDS');
      }

      await authService.changePassword(req.user._id, currentPassword, newPassword);
      return successResponse(res, null, 'Đổi mật khẩu thành công');
    } catch (error) {
      if (error.statusCode) {
        return errorResponse(res, error.message, error.statusCode, error.errorCode);
      }
      next(error);
    }
  }
}

module.exports = new AuthController();
