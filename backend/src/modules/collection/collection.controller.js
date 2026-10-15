const collectionService = require('./collection.service');
const { successResponse, errorResponse } = require('../../utils/apiResponse');

class CollectionController {
  async getCollections(req, res, next) {
    try {
      const collections = await collectionService.getCollections(req.query.season);
      return successResponse(res, collections, 'Lấy danh sách bộ sưu tập thành công');
    } catch (error) {
      next(error);
    }
  }

  async getCollectionById(req, res, next) {
    try {
      const collection = await collectionService.getCollectionById(req.params.id);
      return successResponse(res, collection, 'Lấy chi tiết bộ sưu tập thành công');
    } catch (error) {
      if (error.statusCode) {
        return errorResponse(res, error.message, error.statusCode, error.errorCode);
      }
      next(error);
    }
  }

  async createCollection(req, res, next) {
    try {
      const { title, description, coverImage } = req.body;

      if (!title || !description || !coverImage) {
        return errorResponse(res, 'Vui lòng cung cấp tiêu đề, mô tả và ảnh bìa cho bộ sưu tập', 400, 'MISSING_FIELDS');
      }

      const collection = await collectionService.createCollection(req.body);
      return successResponse(res, collection, 'Tạo bộ sưu tập thành công', 201);
    } catch (error) {
      next(error);
    }
  }

  async updateCollection(req, res, next) {
    try {
      const updated = await collectionService.updateCollection(req.params.id, req.body);
      return successResponse(res, updated, 'Cập nhật bộ sưu tập thành công');
    } catch (error) {
      if (error.statusCode) {
        return errorResponse(res, error.message, error.statusCode, error.errorCode);
      }
      next(error);
    }
  }

  async deleteCollection(req, res, next) {
    try {
      await collectionService.deleteCollection(req.params.id);
      return successResponse(res, null, 'Xóa bộ sưu tập thành công');
    } catch (error) {
      if (error.statusCode) {
        return errorResponse(res, error.message, error.statusCode, error.errorCode);
      }
      next(error);
    }
  }
}

module.exports = new CollectionController();
