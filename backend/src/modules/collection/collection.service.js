const Collection = require('./collection.model');

class CollectionService {
  async getCollections(season) {
    const query = {};

    if (season && season !== 'all') {
      query.season = season;
    }

    return Collection.find(query)
      .populate('plants', 'name scientificName specimenId images biome')
      .sort({ isFeatured: -1, createdAt: -1 });
  }

  async getCollectionById(id) {
    let collection;
    if (id.match(/^[0-9a-fA-F]{24}$/)) {
      collection = await Collection.findById(id).populate('plants');
    } else {
      collection = await Collection.findOne({ slug: id }).populate('plants');
    }

    if (!collection) {
      const error = new Error('Không tìm thấy bộ sưu tập');
      error.statusCode = 404;
      error.errorCode = 'COLLECTION_NOT_FOUND';
      throw error;
    }

    return collection;
  }

  async createCollection(data) {
    const slug = data.slug || data.title.toLowerCase().replace(/[^a-z0-9]/g, '-');
    return Collection.create({
      ...data,
      slug
    });
  }

  async updateCollection(id, updateData) {
    const collection = await Collection.findById(id);
    if (!collection) {
      const error = new Error('Không tìm thấy bộ sưu tập cần cập nhật');
      error.statusCode = 404;
      error.errorCode = 'COLLECTION_NOT_FOUND';
      throw error;
    }

    return Collection.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true
    });
  }

  async deleteCollection(id) {
    const collection = await Collection.findById(id);
    if (!collection) {
      const error = new Error('Không tìm thấy bộ sưu tập cần xóa');
      error.statusCode = 404;
      error.errorCode = 'COLLECTION_NOT_FOUND';
      throw error;
    }

    await Collection.findByIdAndDelete(id);
    return true;
  }
}

module.exports = new CollectionService();
