const metadataService = require('./metadata.service');
const { successResponse } = require('../../utils/apiResponse');

class MetadataController {
  async getFilters(req, res, next) {
    try {
      const filters = await metadataService.getFilters();
      return successResponse(res, filters, 'Categories and filter metadata retrieved successfully');
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new MetadataController();
