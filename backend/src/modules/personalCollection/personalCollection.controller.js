const personalCollectionService = require('./personalCollection.service');
const { successResponse, errorResponse } = require('../../utils/apiResponse');

const handleKnownError = (error, res, next) => {
  if (error.statusCode) {
    return errorResponse(res, error.message, error.statusCode, error.errorCode);
  }
  return next(error);
};

class PersonalCollectionController {
  async list(req, res, next) {
    try {
      const collections = await personalCollectionService.getCollections(req.user._id);
      return successResponse(res, collections, 'Personal collections retrieved successfully');
    } catch (error) {
      return handleKnownError(error, res, next);
    }
  }

  async create(req, res, next) {
    try {
      if (!req.body.name?.trim()) {
        return errorResponse(res, 'Collection name is required', 400, 'MISSING_COLLECTION_NAME');
      }
      const collection = await personalCollectionService.createCollection(req.user._id, req.body);
      return successResponse(res, collection, 'Personal collection created successfully', 201);
    } catch (error) {
      return handleKnownError(error, res, next);
    }
  }

  async update(req, res, next) {
    try {
      if (req.body.name !== undefined && !req.body.name.trim()) {
        return errorResponse(res, 'Collection name cannot be empty', 400, 'INVALID_COLLECTION_NAME');
      }
      const collection = await personalCollectionService.updateCollection(req.params.id, req.user._id, req.body);
      return successResponse(res, collection, 'Personal collection updated successfully');
    } catch (error) {
      return handleKnownError(error, res, next);
    }
  }

  async remove(req, res, next) {
    try {
      await personalCollectionService.deleteCollection(req.params.id, req.user._id);
      return successResponse(res, null, 'Personal collection deleted successfully');
    } catch (error) {
      return handleKnownError(error, res, next);
    }
  }

  async addPlant(req, res, next) {
    try {
      if (!req.body.plantId) {
        return errorResponse(res, 'plantId is required', 400, 'MISSING_PLANT_ID');
      }
      const collection = await personalCollectionService.addPlant(req.params.id, req.user._id, req.body.plantId);
      return successResponse(res, collection, 'Plant added to personal collection');
    } catch (error) {
      return handleKnownError(error, res, next);
    }
  }

  async removePlant(req, res, next) {
    try {
      const collection = await personalCollectionService.removePlant(
        req.params.id,
        req.user._id,
        req.params.plantId
      );
      return successResponse(res, collection, 'Plant removed from personal collection');
    } catch (error) {
      return handleKnownError(error, res, next);
    }
  }
}

module.exports = new PersonalCollectionController();
