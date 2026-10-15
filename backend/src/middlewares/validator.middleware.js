const { validationResult } = require('express-validator');
const { errorResponse } = require('../utils/apiResponse');

/**
 * Middleware xử lý kết quả validation từ express-validator
 */
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const formattedErrors = errors.array().map(err => ({
      field: err.path || err.param,
      message: err.msg
    }));
    return errorResponse(
      res,
      'Dữ liệu đầu vào không hợp lệ',
      422,
      'VALIDATION_ERROR',
      formattedErrors
    );
  }
  next();
};

module.exports = {
  validate
};
