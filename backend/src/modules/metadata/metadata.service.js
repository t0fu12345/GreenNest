const Plant = require('../plant/plant.model');
const constants = require('../../config/constants');

class MetadataService {
  async getFilters() {
    const dbCategories = await Plant.distinct('category');
    const defaultCategories = ['araceae', 'ferns', 'succulents', 'orchids', 'palms', 'carnivorous'];
    const categories = Array.from(new Set([...defaultCategories, ...dbCategories]));

    return {
      categories,
      biomes: constants.BIOMES || ['tropical', 'subtropical', 'arid', 'temperate'],
      lightLevels: constants.LIGHT_LEVELS || ['low', 'medium', 'bright-indirect', 'direct-sun'],
      wateringFrequencies: constants.WATER_FREQUENCIES || ['daily', 'weekly', 'bi-weekly', 'monthly'],
      seasons: constants.COLLECTION_SEASONS || ['all', 'spring', 'summer', 'autumn', 'winter'],
      careTasks: constants.CARE_TASKS || ['water', 'mist', 'fertilize', 'prune', 'repot']
    };
  }
}

module.exports = new MetadataService();
