const adminService = require('./admin.service');
const { successResponse } = require('../../utils/apiResponse');

class AdminController {
  async getDashboardStats(req, res, next) {
    try {
      const stats = await adminService.getDashboardStats();
      return successResponse(res, stats, 'Dashboard metrics and telemetry stats retrieved successfully');
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new AdminController();
