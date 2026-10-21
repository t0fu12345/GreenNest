const plantService = require('./plant.service');
const { successResponse, errorResponse } = require('../../utils/apiResponse');

class PlantController {
  async getPlants(req, res, next) {
    try {
      const { plants, pagination } = await plantService.getPlants(req.query);
      return successResponse(res, plants, 'Lấy danh sách cây trồng thành công', 200, pagination);
    } catch (error) {
      next(error);
    }
  }

  async getPlantById(req, res, next) {
    try {
      const plant = await plantService.getPlantById(req.params.id);
      return successResponse(res, plant, 'Lấy chi tiết cây trồng thành công');
    } catch (error) {
      if (error.statusCode) {
        return errorResponse(res, error.message, error.statusCode, error.errorCode);
      }
      next(error);
    }
  }

  async getRelatedPlants(req, res, next) {
    try {
      const related = await plantService.getRelatedPlants(req.params.id);
      return successResponse(res, related, 'Lấy danh sách cây liên quan thành công');
    } catch (error) {
      if (error.statusCode) {
        return errorResponse(res, error.message, error.statusCode, error.errorCode);
      }
      next(error);
    }
  }

  async createPlant(req, res, next) {
    try {
      const { name, scientificName, category, biome, light, watering } = req.body;

      if (!name || !scientificName || !category || !biome || !light || !watering) {
        return errorResponse(res, 'Vui lòng cung cấp đầy đủ các thông số cốt lõi của cây trồng', 400, 'MISSING_FIELDS');
      }

      const newPlant = await plantService.createPlant(req.body);
      return successResponse(res, newPlant, 'Thêm mới cây trồng thành công', 201);
    } catch (error) {
      if (error.statusCode) {
        return errorResponse(res, error.message, error.statusCode, error.errorCode);
      }
      next(error);
    }
  }

  async updatePlant(req, res, next) {
    try {
      const updated = await plantService.updatePlant(req.params.id, req.body);
      return successResponse(res, updated, 'Cập nhật cây trồng thành công');
    } catch (error) {
      if (error.statusCode) {
        return errorResponse(res, error.message, error.statusCode, error.errorCode);
      }
      next(error);
    }
  }

  async deletePlant(req, res, next) {
    try {
      await plantService.deletePlant(req.params.id);
      return successResponse(res, null, 'Xóa cây trồng thành công');
    } catch (error) {
      if (error.statusCode) {
        return errorResponse(res, error.message, error.statusCode, error.errorCode);
      }
      next(error);
    }
  }
}

module.exports = new PlantController();
