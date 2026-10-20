const gardenService = require('./garden.service');
const { successResponse, errorResponse } = require('../../utils/apiResponse');

class GardenController {
  async getGarden(req, res, next) {
    try {
      const data = await gardenService.getGarden(req.user._id);
      return successResponse(res, data, 'Lấy danh sách Vườn của tôi thành công');
    } catch (error) {
      next(error);
    }
  }

  async addToGarden(req, res, next) {
    try {
      const { plantId, customNickname } = req.body;

      if (!plantId) {
        return errorResponse(res, 'Vui lòng cung cấp ID cây trồng', 400, 'MISSING_PLANT_ID');
      }

      const garden = await gardenService.addToGarden(req.user._id, plantId, customNickname);
      return successResponse(res, garden, 'Đã thêm cây vào Vườn cá nhân thành công', 201);
    } catch (error) {
      if (error.statusCode) {
        return errorResponse(res, error.message, error.statusCode, error.errorCode);
      }
      next(error);
    }
  }

  async removeFromGarden(req, res, next) {
    try {
      const garden = await gardenService.removeFromGarden(req.user._id, req.params.gardenItemId);
      return successResponse(res, garden, 'Đã xóa cây khỏi Vườn của bạn');
    } catch (error) {
      next(error);
    }
  }

  async syncGarden(req, res, next) {
    try {
      const { plantIds } = req.body;
      const result = await gardenService.syncGarden(req.user._id, plantIds);
      return successResponse(
        res,
        result,
        `Đồng bộ thành công ${result.syncedCount || 0} cây vào tài khoản của bạn`
      );
    } catch (error) {
      next(error);
    }
  }

  async updateChecklist(req, res, next) {
    try {
      const { taskName, completed } = req.body;
      const itemId = req.params.plantId || req.body.gardenItemId || req.body.plantId;

      if (!itemId || !taskName) {
        return errorResponse(res, 'Vui lòng cung cấp plantId (hoặc gardenItemId) và taskName', 400, 'MISSING_FIELDS');
      }

      const checklist = await gardenService.updateChecklist(req.user._id, itemId, taskName, completed);
      return successResponse(res, checklist, 'Cập nhật trạng thái chăm sóc thành công');
    } catch (error) {
      if (error.statusCode) {
        return errorResponse(res, error.message, error.statusCode, error.errorCode);
      }
      next(error);
    }
  }

  async resetChecklist(req, res, next) {
    try {
      await gardenService.resetChecklist(req.user._id);
      return successResponse(res, null, 'Đã làm mới (reset) toàn bộ danh sách công việc chăm sóc');
    } catch (error) {
      next(error);
    }
  }

  async toggleBookmark(req, res, next) {
    try {
      const { plantId } = req.body;

      if (!plantId) {
        return errorResponse(res, 'Vui lòng cung cấp plantId', 400, 'MISSING_PLANT_ID');
      }

      const result = await gardenService.toggleBookmark(req.user._id, plantId);
      return successResponse(
        res,
        result,
        result.isBookmarked ? 'Đã lưu cây vào danh sách yêu thích' : 'Đã bỏ lưu cây khỏi danh sách yêu thích'
      );
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new GardenController();
