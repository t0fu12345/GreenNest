const PersonalCollection = require('./personalCollection.model');
const Plant = require('../plant/plant.model');

const notFound = () => {
  const error = new Error('Personal collection not found');
  error.statusCode = 404;
  error.errorCode = 'PERSONAL_COLLECTION_NOT_FOUND';
  return error;
};

class PersonalCollectionService {
  constructor(collectionModel = PersonalCollection, plantModel = Plant) {
    this.collectionModel = collectionModel;
    this.plantModel = plantModel;
  }

  async getCollections(ownerId) {
    return this.collectionModel.find({ owner: ownerId })
      .populate({ path: 'plants', match: { status: 'published' } })
      .sort({ updatedAt: -1 });
  }

  async createCollection(ownerId, data) {
    return this.collectionModel.create({
      owner: ownerId,
      name: data.name,
      description: data.description || '',
      plants: []
    });
  }

  async updateCollection(collectionId, ownerId, data) {
    const update = {};
    if (data.name !== undefined) update.name = data.name;
    if (data.description !== undefined) update.description = data.description;

    const collection = await this.collectionModel.findOneAndUpdate(
      { _id: collectionId, owner: ownerId },
      update,
      { new: true, runValidators: true }
    );
    if (!collection) throw notFound();
    return collection;
  }

  async deleteCollection(collectionId, ownerId) {
    const collection = await this.collectionModel.findOneAndDelete({
      _id: collectionId,
      owner: ownerId
    });
    if (!collection) throw notFound();
    return true;
  }

  async addPlant(collectionId, ownerId, plantId) {
    const plant = await this.plantModel.findOne({ _id: plantId, status: 'published' });
    if (!plant) {
      const error = new Error('Published plant not found');
      error.statusCode = 404;
      error.errorCode = 'PLANT_NOT_FOUND';
      throw error;
    }

    const collection = await this.collectionModel.findOneAndUpdate(
      { _id: collectionId, owner: ownerId },
      { $addToSet: { plants: plantId } },
      { new: true, runValidators: true }
    );
    if (!collection) throw notFound();
    return collection;
  }

  async removePlant(collectionId, ownerId, plantId) {
    const collection = await this.collectionModel.findOneAndUpdate(
      { _id: collectionId, owner: ownerId },
      { $pull: { plants: plantId } },
      { new: true, runValidators: true }
    );
    if (!collection) throw notFound();
    return collection;
  }
}

module.exports = new PersonalCollectionService();
module.exports.PersonalCollectionService = PersonalCollectionService;
