const gardenerService = require('./gardener.service');
const { successResponse, errorResponse } = require('../../utils/apiResponse');

class GardenerController {
  async getGardeners(req, res, next) {
    try {
      const gardeners = await gardenerService.getGardeners();
      return successResponse(res, gardeners, 'Botanists and curators retrieved successfully');
    } catch (error) {
      next(error);
    }
  }

  async getGardenerById(req, res, next) {
    try {
      const gardener = await gardenerService.getGardenerById(req.params.id, req.user?.role === 'admin');
      return successResponse(res, gardener, 'Botanist profile retrieved successfully');
    } catch (error) {
      if (error.statusCode) {
        return errorResponse(res, error.message, error.statusCode, error.errorCode);
      }
      next(error);
    }
  }

  async createGardener(req, res, next) {
    try {
      const { name, specialization, contactEmail } = req.body;

      if (!name || !specialization || !contactEmail) {
        return errorResponse(res, 'Please provide botanist name, specialization, and contact email', 400, 'MISSING_FIELDS');
      }

      const gardener = await gardenerService.createGardener(req.body);
      return successResponse(res, gardener, 'Botanist profile created successfully', 201);
    } catch (error) {
      next(error);
    }
  }

  async updateGardener(req, res, next) {
    try {
      const updated = await gardenerService.updateGardener(req.params.id, req.body);
      return successResponse(res, updated, 'Botanist profile updated successfully');
    } catch (error) {
      if (error.statusCode) {
        return errorResponse(res, error.message, error.statusCode, error.errorCode);
      }
      next(error);
    }
  }

  async deleteGardener(req, res, next) {
    try {
      await gardenerService.deleteGardener(req.params.id);
      return successResponse(res, null, 'Botanist profile deleted successfully');
    } catch (error) {
      if (error.statusCode) {
        return errorResponse(res, error.message, error.statusCode, error.errorCode);
      }
      next(error);
    }
  }
}

module.exports = new GardenerController();
