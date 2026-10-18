const { errorResponse } = require('../utils/apiResponse');

/**
 * Middleware kiểm tra hợp lệ dữ liệu đầu vào (Input Validator)
 * Chuẩn hóa lỗi theo cấu trúc OpenAPI: VALIDATION_ERROR (422)
 */

const validateRegister = (req, res, next) => {
  const { fullName, email, password } = req.body;
  const errors = [];

  if (!fullName || fullName.trim().length < 2) {
    errors.push({ field: 'fullName', message: 'Họ và tên là bắt buộc và phải có ít nhất 2 ký tự' });
  }

  const emailRegex = /^\S+@\S+\.\S+$/;
  if (!email || !emailRegex.test(email.trim())) {
    errors.push({ field: 'email', message: 'Email không đúng định dạng' });
  }

  if (!password || password.length < 6) {
    errors.push({ field: 'password', message: 'Mật khẩu phải có độ dài tối thiểu 6 ký tự' });
  }

  if (errors.length > 0) {
    return errorResponse(res, 'Dữ liệu đăng ký không hợp lệ', 422, 'VALIDATION_ERROR', errors);
  }

  next();
};

const validateLogin = (req, res, next) => {
  const { email, password } = req.body;
  const errors = [];

  if (!email || email.trim().length === 0) {
    errors.push({ field: 'email', message: 'Email hoặc định danh đăng nhập là bắt buộc' });
  }

  if (!password || password.length === 0) {
    errors.push({ field: 'password', message: 'Mật khẩu là bắt buộc' });
  }

  if (errors.length > 0) {
    return errorResponse(res, 'Dữ liệu đăng nhập không hợp lệ', 422, 'VALIDATION_ERROR', errors);
  }

  next();
};

const validateContact = (req, res, next) => {
  const { fullName, email, subject, message } = req.body;
  const errors = [];

  if (!fullName || fullName.trim().length < 2) {
    errors.push({ field: 'fullName', message: 'Họ và tên là bắt buộc' });
  }

  const emailRegex = /^\S+@\S+\.\S+$/;
  if (!email || !emailRegex.test(email.trim())) {
    errors.push({ field: 'email', message: 'Email liên hệ không hợp lệ' });
  }

  if (!subject || subject.trim().length === 0) {
    errors.push({ field: 'subject', message: 'Chủ đề liên hệ là bắt buộc' });
  }

  if (!message || message.trim().length < 5) {
    errors.push({ field: 'message', message: 'Nội dung tin nhắn phải có ít nhất 5 ký tự' });
  }

  if (errors.length > 0) {
    return errorResponse(res, 'Dữ liệu liên hệ không hợp lệ', 422, 'VALIDATION_ERROR', errors);
  }

  next();
};

const validatePlant = (req, res, next) => {
  const { name, scientificName, category, biome } = req.body;
  const errors = [];

  if (!name || name.trim().length === 0) {
    errors.push({ field: 'name', message: 'Tên cây trồng là bắt buộc' });
  }

  if (!scientificName || scientificName.trim().length === 0) {
    errors.push({ field: 'scientificName', message: 'Tên khoa học là bắt buộc' });
  }

  if (!category || category.trim().length === 0) {
    errors.push({ field: 'category', message: 'Danh mục cây trồng là bắt buộc' });
  }

  if (!biome || biome.trim().length === 0) {
    errors.push({ field: 'biome', message: 'Môi trường sinh trưởng (biome) là bắt buộc' });
  }

  if (errors.length > 0) {
    return errorResponse(res, 'Dữ liệu cây trồng không hợp lệ', 422, 'VALIDATION_ERROR', errors);
  }

  next();
};

module.exports = {
  validateRegister,
  validateLogin,
  validateContact,
  validatePlant
};
