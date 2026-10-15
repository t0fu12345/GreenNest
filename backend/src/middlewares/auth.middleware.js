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
        process.env.JWT_SECRET || 'greennest_botanical_jwt_secret_key_2026_super_secure'
      );

      req.user = await User.findById(decoded.id).select('-password');
      if (!req.user) {
        return errorResponse(res, 'Người dùng liên kết với token này không còn tồn tại', 401, 'USER_NOT_FOUND');
      }

      return next();
    } catch (error) {
      return errorResponse(res, 'Mã xác thực không hợp lệ hoặc đã hết hạn', 401, 'INVALID_TOKEN');
    }
  }

  if (!token) {
    return errorResponse(res, 'Vui lòng đăng nhập để thực hiện hành động này', 401, 'UNAUTHORIZED');
  }
};

module.exports = {
  protect
};
