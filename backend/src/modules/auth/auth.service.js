const User = require('./user.model');
const generateToken = require('../../utils/generateToken');

class AuthService {
  async register({ fullName, email, password }) {
    const cleanEmail = (email || '').trim().toLowerCase();
    const cleanName = (fullName || '').trim();
    const userExists = await User.findOne({ email: cleanEmail });
    if (userExists) {
      const error = new Error('This email address is already registered in the system');
      error.statusCode = 409;
      error.errorCode = 'EMAIL_EXISTS';
      throw error;
    }

    const user = await User.create({
      fullName: cleanName,
      email: cleanEmail,
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
    const cleanEmail = (email || '').trim().toLowerCase();
    const user = await User.findOne({ email: cleanEmail }).select('+password');
    if (!user) {
      const error = new Error('Invalid email or password');
      error.statusCode = 401;
      error.errorCode = 'INVALID_CREDENTIALS';
      throw error;
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      const error = new Error('Invalid email or password');
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
      const error = new Error('User not found');
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
      const error = new Error('New password must be at least 6 characters');
      error.statusCode = 400;
      throw error;
    }

    const user = await User.findById(userId).select('+password');
    const isMatch = await user.matchPassword(currentPassword);
    if (!isMatch) {
      const error = new Error('Current password is incorrect');
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
