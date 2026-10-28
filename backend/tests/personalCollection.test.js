const assert = require('node:assert/strict');
const test = require('node:test');

let PersonalCollectionService;
try {
  ({ PersonalCollectionService } = require('../src/modules/personalCollection/personalCollection.service'));
} catch {
  PersonalCollectionService = undefined;
}

test('personal collection service is available as an injectable service', () => {
  assert.equal(typeof PersonalCollectionService, 'function');
});

test('updateCollection cannot update a collection owned by another user', async () => {
  const records = [{ _id: 'collection-1', owner: 'owner-1', name: 'Indoor plants' }];
  const collectionModel = {
    async findOneAndUpdate(query, update) {
      const record = records.find(item => item._id === query._id && item.owner === query.owner);
      if (!record) return null;
      Object.assign(record, update);
      return { ...record };
    }
  };
  const service = new PersonalCollectionService(collectionModel, {});

  await assert.rejects(
    service.updateCollection('collection-1', 'owner-2', { name: 'Stolen collection' }),
    error => error.statusCode === 404 && error.errorCode === 'PERSONAL_COLLECTION_NOT_FOUND'
  );
  assert.equal(records[0].name, 'Indoor plants');
});

test('addPlant accepts only a published plant and scopes the write to the owner', async () => {
  const records = [{ _id: 'collection-1', owner: 'owner-1', plants: [] }];
  const collectionModel = {
    async findOneAndUpdate(query, update) {
      const record = records.find(item => item._id === query._id && item.owner === query.owner);
      if (!record) return null;
      if (!record.plants.includes(update.$addToSet.plants)) record.plants.push(update.$addToSet.plants);
      return { ...record };
    }
  };
  const plantModel = {
    async findOne(query) {
      return query._id === 'plant-1' && query.status === 'published' ? { _id: 'plant-1' } : null;
    }
  };
  const service = new PersonalCollectionService(collectionModel, plantModel);

  const result = await service.addPlant('collection-1', 'owner-1', 'plant-1');
  assert.deepEqual(result.plants, ['plant-1']);

  await assert.rejects(
    service.addPlant('collection-1', 'owner-1', 'draft-plant'),
    error => error.statusCode === 404 && error.errorCode === 'PLANT_NOT_FOUND'
  );
});
