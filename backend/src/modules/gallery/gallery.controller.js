const galleryService = require('./gallery.service');
const { successResponse, errorResponse } = require('../../utils/apiResponse');

class GalleryController {
  async getGallery(req, res, next) {
    try {
      const { aspectRatio, page, limit } = req.query;
      const { gallery, pagination } = await galleryService.getGallery({
        aspectRatio,
        page,
        limit,
        userId: req.user?._id
      });

      return successResponse(
        res,
        gallery,
        'Lấy danh sách ảnh thư viện thành công',
        200,
        pagination
      );
    } catch (error) {
      next(error);
    }
  }

  async likeImage(req, res, next) {
    try {
      const result = await galleryService.likeImage(req.params.id, req.user._id);
      const msg = result.liked ? 'Đã thả tim cho ảnh' : 'Đã hủy thả tim cho ảnh';
      return successResponse(res, result, msg);
    } catch (error) {
      if (error.statusCode) {
        return errorResponse(res, error.message, error.statusCode, error.errorCode);
      }
      next(error);
    }
  }

  async createImage(req, res, next) {
    try {
      const { imageUrl, alt, caption } = req.body;

      if (!imageUrl || !alt || !caption) {
        return errorResponse(res, 'Vui lòng cung cấp URL ảnh, thẻ alt và caption', 400, 'MISSING_FIELDS');
      }

      const newImage = await galleryService.createImage(req.body);
      return successResponse(res, newImage, 'Thêm ảnh vào gallery thành công', 201);
    } catch (error) {
      next(error);
    }
  }

  async updateImage(req, res, next) {
    try {
      const updated = await galleryService.updateImage(req.params.id, req.body);
      return successResponse(res, updated, 'Cập nhật ảnh thành công');
    } catch (error) {
      if (error.statusCode) {
        return errorResponse(res, error.message, error.statusCode, error.errorCode);
      }
      next(error);
    }
  }

  async deleteImage(req, res, next) {
    try {
      await galleryService.deleteImage(req.params.id);
      return successResponse(res, null, 'Xóa ảnh thành công');
    } catch (error) {
      if (error.statusCode) {
        return errorResponse(res, error.message, error.statusCode, error.errorCode);
      }
      next(error);
    }
  }
}

module.exports = new GalleryController();
