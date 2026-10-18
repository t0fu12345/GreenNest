const metadataService = require('./metadata.service');
const { successResponse } = require('../../utils/apiResponse');

class MetadataController {
  async getFilters(req, res, next) {
    try {
      const filters = await metadataService.getFilters();
      return successResponse(res, filters, 'Lấy dữ liệu danh mục & bộ lọc thành công');
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new MetadataController();
