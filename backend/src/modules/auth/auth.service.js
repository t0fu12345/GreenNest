const User = require('./user.model');
const generateToken = require('../../utils/generateToken');

class AuthService {
  async register({ fullName, email, password }) {
    const userExists = await User.findOne({ email });
    if (userExists) {
      const error = new Error('Email này đã được sử dụng trong hệ thống');
      error.statusCode = 409;
      error.errorCode = 'EMAIL_EXISTS';
      throw error;
    }

    const user = await User.create({
      fullName,
      email,
      password
    });

    const token = generateToken(user._id, user.role);

    return {
      token,
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
        avatarUrl: user.avatarUrl
      }
    };
  }

  async login({ email, password }) {
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      const error = new Error('Email hoặc mật khẩu không chính xác');
      error.statusCode = 401;
      error.errorCode = 'INVALID_CREDENTIALS';
      throw error;
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      const error = new Error('Email hoặc mật khẩu không chính xác');
      error.statusCode = 401;
      error.errorCode = 'INVALID_CREDENTIALS';
      throw error;
    }

    const token = generateToken(user._id, user.role);

    return {
      token,
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
        avatarUrl: user.avatarUrl
      }
    };
  }

  async getProfile(userId) {
    const user = await User.findById(userId);
    if (!user) {
      const error = new Error('Không tìm thấy người dùng');
      error.statusCode = 404;
      throw error;
    }

    return {
      id: user._id,
      fullName: user.fullName,
      email: user.email,
      role: user.role,
      avatarUrl: user.avatarUrl,
      savedPlantsCount: user.savedPlants?.length || 0,
      gardenCount: user.garden?.length || 0
    };
  }

  async changePassword(userId, currentPassword, newPassword) {
    if (newPassword.length < 6) {
      const error = new Error('Mật khẩu mới phải có tối thiểu 6 ký tự');
      error.statusCode = 400;
      throw error;
    }

    const user = await User.findById(userId).select('+password');
    const isMatch = await user.matchPassword(currentPassword);
    if (!isMatch) {
      const error = new Error('Mật khẩu hiện tại không chính xác');
      error.statusCode = 400;
      error.errorCode = 'INCORRECT_CURRENT_PASSWORD';
      throw error;
    }

    user.password = newPassword;
    await user.save();
    return true;
  }
}

module.exports = new AuthService();
