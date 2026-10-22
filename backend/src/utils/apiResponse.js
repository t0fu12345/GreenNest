/**
 * Standardize JSON Response structure according to OpenAPI 3.0.3 Contract
 */
const successResponse = (res, data = null, message = 'Success', statusCode = 200, pagination = null) => {
  const payload = {
    success: true,
    message
  };

  if (data !== null) {
    payload.data = data;
  }

  if (pagination) {
    payload.pagination = pagination;
  }

  return res.status(statusCode).json(payload);
};

const errorResponse = (res, message = 'Internal Server Error', statusCode = 500, error = 'INTERNAL_ERROR', details = []) => {
  return res.status(statusCode).json({
    success: false,
    statusCode,
    error,
    message,
    details
  });
};

module.exports = {
  successResponse,
  errorResponse
};
