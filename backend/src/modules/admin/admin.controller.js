const adminService = require('./admin.service');
const { successResponse, errorResponse } = require('../../utils/apiResponse');

class AdminController {
  async getDashboardStats(req, res, next) {
    try {
      const stats = await adminService.getDashboardStats();
      return successResponse(res, stats, 'Dashboard metrics and telemetry stats retrieved successfully');
    } catch (error) {
      next(error);
    }
  }

  async getUsers(req, res, next) {
    try {
      const { users, pagination } = await adminService.getUsers(req.query);
      return successResponse(res, users, 'Administrator user directory retrieved successfully', 200, pagination);
    } catch (error) {
      next(error);
    }
  }

  async updateUserRole(req, res, next) {
    try {
      const user = await adminService.updateUserRole(req.params.id, req.body.role, req.user._id);
      return successResponse(res, user, 'User role updated successfully');
    } catch (error) {
      if (error.statusCode) return errorResponse(res, error.message, error.statusCode, error.errorCode);
      next(error);
    }
  }

  async deleteUser(req, res, next) {
    try {
      await adminService.deleteUser(req.params.id, req.user._id);
      return successResponse(res, null, 'User deleted successfully');
    } catch (error) {
      if (error.statusCode) return errorResponse(res, error.message, error.statusCode, error.errorCode);
      next(error);
    }
  }
}

module.exports = new AdminController();
