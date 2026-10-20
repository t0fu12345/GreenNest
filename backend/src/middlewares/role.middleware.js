const { errorResponse } = require('../utils/apiResponse');

/**
 * Middleware phân quyền (Role Guard)
 * @param  {...string} roles - Danh sách vai trò được phép truy cập (vd: 'admin')
 */
const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return errorResponse(res, 'Chưa xác thực người dùng', 401, 'UNAUTHORIZED');
    }

    if (!roles.includes(req.user.role)) {
      return errorResponse(
        res,
        `Quyền truy cập bị từ chối: Tài khoản vai trò [${req.user.role}] không được phép thực hiện hành động này`,
        403,
        'FORBIDDEN'
      );
    }

    next();
  };
};

module.exports = {
  authorize
};
