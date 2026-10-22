const { errorResponse } = require('../utils/apiResponse');

/**
 * Input Validation Middleware
 * Standardized error structure compliant with OpenAPI 3.0.3: VALIDATION_ERROR (422)
 */

const validateRegister = (req, res, next) => {
  const { fullName, email, password } = req.body;
  const errors = [];

  if (!fullName || fullName.trim().length < 2) {
    errors.push({ field: 'fullName', message: 'Full name is required and must be at least 2 characters' });
  }

  const emailRegex = /^\S+@\S+\.\S+$/;
  if (!email || !emailRegex.test(email.trim())) {
    errors.push({ field: 'email', message: 'Invalid email address format' });
  }

  if (!password || password.length < 6) {
    errors.push({ field: 'password', message: 'Password must be at least 6 characters' });
  }

  if (errors.length > 0) {
    return errorResponse(res, 'Registration validation failed', 422, 'VALIDATION_ERROR', errors);
  }

  next();
};

const validateLogin = (req, res, next) => {
  const { email, password } = req.body;
  const errors = [];

  if (!email || email.trim().length === 0) {
    errors.push({ field: 'email', message: 'Email address or username is required' });
  }

  if (!password || password.length === 0) {
    errors.push({ field: 'password', message: 'Password is required' });
  }

  if (errors.length > 0) {
    return errorResponse(res, 'Login validation failed', 422, 'VALIDATION_ERROR', errors);
  }

  next();
};

const validateContact = (req, res, next) => {
  const { fullName, email, subject, message } = req.body;
  const errors = [];

  if (!fullName || fullName.trim().length < 2) {
    errors.push({ field: 'fullName', message: 'Full name is required' });
  }

  const emailRegex = /^\S+@\S+\.\S+$/;
  if (!email || !emailRegex.test(email.trim())) {
    errors.push({ field: 'email', message: 'Invalid contact email address' });
  }

  if (!subject || subject.trim().length === 0) {
    errors.push({ field: 'subject', message: 'Message subject is required' });
  }

  if (!message || message.trim().length < 5) {
    errors.push({ field: 'message', message: 'Message content must be at least 5 characters' });
  }

  if (errors.length > 0) {
    return errorResponse(res, 'Contact validation failed', 422, 'VALIDATION_ERROR', errors);
  }

  next();
};

const validatePlant = (req, res, next) => {
  const { name, scientificName, category, biome } = req.body;
  const errors = [];

  if (!name || name.trim().length === 0) {
    errors.push({ field: 'name', message: 'Plant common name is required' });
  }

  if (!scientificName || scientificName.trim().length === 0) {
    errors.push({ field: 'scientificName', message: 'Scientific name is required' });
  }

  if (!category || category.trim().length === 0) {
    errors.push({ field: 'category', message: 'Botanical category is required' });
  }

  if (!biome || biome.trim().length === 0) {
    errors.push({ field: 'biome', message: 'Growth biome environment is required' });
  }

  if (errors.length > 0) {
    return errorResponse(res, 'Specimen validation failed', 422, 'VALIDATION_ERROR', errors);
  }

  next();
};

module.exports = {
  validateRegister,
  validateLogin,
  validateContact,
  validatePlant
};
