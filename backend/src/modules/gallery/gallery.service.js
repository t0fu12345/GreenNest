const Gallery = require('./gallery.model');

class GalleryService {
  async getGallery({ aspectRatio, page = 1, limit = 20 }) {
    const query = {};

    if (aspectRatio && aspectRatio !== 'all') {
      query.aspectRatio = aspectRatio;
    }

    const pageNum = Math.max(1, parseInt(page, 10) || 1);
    const limitNum = Math.min(100, Math.max(1, parseInt(limit, 10) || 20));
    const skip = (pageNum - 1) * limitNum;

    const [totalItems, gallery] = await Promise.all([
      Gallery.countDocuments(query),
      Gallery.find(query)
        .populate('plant', 'name scientificName specimenId')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limitNum)
    ]);

    const totalPages = Math.ceil(totalItems / limitNum);

    return {
      gallery,
      pagination: {
        page: pageNum,
        limit: limitNum,
        totalItems,
        totalPages
      }
    };
  }

  async likeImage(id) {
    const image = await Gallery.findById(id);
    if (!image) {
      const error = new Error('Không tìm thấy ảnh');
      error.statusCode = 404;
      error.errorCode = 'IMAGE_NOT_FOUND';
      throw error;
    }

    image.likesCount = (image.likesCount || 0) + 1;
    await image.save();

    return { likesCount: image.likesCount };
  }

  async createImage(data) {
    const { imageUrl, alt, caption, credit, aspectRatio, plant } = data;

    const newImage = await Gallery.create({
      imageUrl,
      alt,
      caption,
      credit: credit || 'Pinterest',
      aspectRatio: aspectRatio || 'tall',
      plant: plant || null
    });

    return newImage;
  }

  async updateImage(id, data) {
    const image = await Gallery.findById(id);
    if (!image) {
      const error = new Error('Không tìm thấy ảnh cần cập nhật');
      error.statusCode = 404;
      error.errorCode = 'IMAGE_NOT_FOUND';
      throw error;
    }

    const updated = await Gallery.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true
    });

    return updated;
  }

  async deleteImage(id) {
    const image = await Gallery.findById(id);
    if (!image) {
      const error = new Error('Không tìm thấy ảnh cần xóa');
      error.statusCode = 404;
      error.errorCode = 'IMAGE_NOT_FOUND';
      throw error;
    }

    await Gallery.findByIdAndDelete(id);
    return true;
  }
}

module.exports = new GalleryService();
