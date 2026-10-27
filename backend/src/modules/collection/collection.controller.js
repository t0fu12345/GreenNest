const collectionService = require('./collection.service');
const { successResponse, errorResponse } = require('../../utils/apiResponse');

class CollectionController {
  async getCollections(req, res, next) {
    try {
      const collections = await collectionService.getCollections(req.query.season, req.user?.role === 'admin');
      return successResponse(res, collections, 'Curated collections retrieved successfully');
    } catch (error) {
      next(error);
    }
  }

  async getCollectionById(req, res, next) {
    try {
      const collection = await collectionService.getCollectionById(req.params.id, req.user?.role === 'admin');
      return successResponse(res, collection, 'Curated collection details retrieved successfully');
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
        return errorResponse(res, 'Please provide title, description, and cover image for the collection', 400, 'MISSING_FIELDS');
      }

      const collection = await collectionService.createCollection(req.body);
      return successResponse(res, collection, 'Curated collection created successfully', 201);
    } catch (error) {
      next(error);
    }
  }

  async updateCollection(req, res, next) {
    try {
      const updated = await collectionService.updateCollection(req.params.id, req.body);
      return successResponse(res, updated, 'Curated collection updated successfully');
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
      return successResponse(res, null, 'Curated collection deleted successfully');
    } catch (error) {
      if (error.statusCode) {
        return errorResponse(res, error.message, error.statusCode, error.errorCode);
      }
      next(error);
    }
  }
}

module.exports = new CollectionController();
