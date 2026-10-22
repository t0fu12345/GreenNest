const { errorResponse } = require('../utils/apiResponse');

/**
 * Role Authorization Middleware (Role Guard)
 * @param  {...string} roles - Permitted roles (e.g. 'admin')
 */
const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return errorResponse(res, 'User is not authenticated', 401, 'UNAUTHORIZED');
    }

    if (!roles.includes(req.user.role)) {
      return errorResponse(
        res,
        `Access denied: Account with role [${req.user.role}] is not authorized for this resource`,
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
