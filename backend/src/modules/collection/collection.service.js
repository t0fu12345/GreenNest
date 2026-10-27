const Collection = require('./collection.model');

class CollectionService {
  async getCollections(season, includeDrafts = false) {
    const query = {};

    if (season && season !== 'all') {
      query.season = season;
    }

    return Collection.find(query)
      .populate({ path: 'plants', select: 'name scientificName specimenId images biome status', match: includeDrafts ? {} : { status: 'published' } })
      .sort({ isFeatured: -1, createdAt: -1 });
  }

  async getCollectionById(id, includeDrafts = false) {
    let collection;
    if (id.match(/^[0-9a-fA-F]{24}$/)) {
      collection = await Collection.findById(id).populate({ path: 'plants', match: includeDrafts ? {} : { status: 'published' } });
    } else {
      collection = await Collection.findOne({ slug: id }).populate({ path: 'plants', match: includeDrafts ? {} : { status: 'published' } });
    }

    if (!collection) {
      const error = new Error('Curated collection not found');
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
      const error = new Error('Collection to update not found');
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
      const error = new Error('Collection to delete not found');
      error.statusCode = 404;
      error.errorCode = 'COLLECTION_NOT_FOUND';
      throw error;
    }

    await Collection.findByIdAndDelete(id);
    return true;
  }
}

module.exports = new CollectionService();
