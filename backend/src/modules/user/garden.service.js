const User = require('../auth/user.model');
const Plant = require('../plant/plant.model');

class GardenService {
  async getGarden(userId) {
    const user = await User.findById(userId)
      .populate('garden.plant', 'name scientificName specimenId biome images watering light careLevel')
      .populate('savedPlants', 'name scientificName specimenId biome images');

    return {
      garden: user.garden || [],
      savedPlants: user.savedPlants || []
    };
  }

  async addToGarden(userId, plantId, customNickname) {
    const plant = await Plant.findById(plantId);
    if (!plant) {
      const error = new Error('Không tìm thấy cây trồng này');
      error.statusCode = 404;
      error.errorCode = 'PLANT_NOT_FOUND';
      throw error;
    }

    const user = await User.findById(userId);

    const alreadyInGarden = user.garden.some(item => item.plant.toString() === plantId);
    if (alreadyInGarden) {
      const error = new Error('Cây trồng này đã có trong Vườn của bạn');
      error.statusCode = 400;
      error.errorCode = 'PLANT_ALREADY_IN_GARDEN';
      throw error;
    }

    const defaultChecklist = [
      { taskName: 'water', completed: false, lastCompletedAt: null },
      { taskName: 'mist', completed: false, lastCompletedAt: null },
      { taskName: 'fertilize', completed: false, lastCompletedAt: null },
      { taskName: 'prune', completed: false, lastCompletedAt: null }
    ];

    user.garden.push({
      plant: plantId,
      customNickname: customNickname || plant.name,
      addedAt: new Date(),
      checklist: defaultChecklist
    });

    await user.save();
    return user.garden;
  }

  async removeFromGarden(userId, gardenItemId) {
    const user = await User.findById(userId);
    user.garden = user.garden.filter(
      item => item._id.toString() !== gardenItemId && item.plant.toString() !== gardenItemId
    );

    await user.save();
    return user.garden;
  }

  async syncGarden(userId, plantIds) {
    if (!Array.isArray(plantIds) || plantIds.length === 0) {
      return { syncedCount: 0 };
    }

    const user = await User.findById(userId);
    let syncedCount = 0;

    for (const pid of plantIds) {
      const plant = await Plant.findOne({
        $or: [
          ...(pid.match(/^[0-9a-fA-F]{24}$/) ? [{ _id: pid }] : []),
          { specimenId: pid }
        ]
      });

      if (plant) {
        const exists = user.garden.some(item => item.plant.toString() === plant._id.toString());
        if (!exists) {
          user.garden.push({
            plant: plant._id,
            customNickname: plant.name,
            checklist: [
              { taskName: 'water', completed: false, lastCompletedAt: null },
              { taskName: 'mist', completed: false, lastCompletedAt: null },
              { taskName: 'fertilize', completed: false, lastCompletedAt: null },
              { taskName: 'prune', completed: false, lastCompletedAt: null }
            ]
          });
          syncedCount++;
        }

        if (!user.savedPlants.includes(plant._id)) {
          user.savedPlants.push(plant._id);
        }
      }
    }

    if (syncedCount > 0) {
      await user.save();
    }

    return {
      syncedCount,
      totalGardenCount: user.garden.length
    };
  }

  async updateChecklist(userId, gardenItemId, taskName, completed) {
    const user = await User.findById(userId);
    const gardenItem = user.garden.id(gardenItemId);

    if (!gardenItem) {
      const error = new Error('Không tìm thấy mục cây trong vườn');
      error.statusCode = 404;
      error.errorCode = 'ITEM_NOT_FOUND';
      throw error;
    }

    let task = gardenItem.checklist.find(t => t.taskName === taskName);
    if (!task) {
      task = { taskName, completed: false, lastCompletedAt: null };
      gardenItem.checklist.push(task);
    }

    task.completed = completed !== undefined ? completed : !task.completed;
    if (task.completed) {
      task.lastCompletedAt = new Date();
    }

    await user.save();
    return gardenItem.checklist;
  }

  async resetChecklist(userId) {
    const user = await User.findById(userId);

    user.garden.forEach(item => {
      item.checklist.forEach(task => {
        task.completed = false;
      });
    });

    await user.save();
    return true;
  }

  async toggleBookmark(userId, plantId) {
    const user = await User.findById(userId);
    const index = user.savedPlants.indexOf(plantId);

    let isBookmarked = false;
    if (index > -1) {
      user.savedPlants.splice(index, 1);
      isBookmarked = false;
    } else {
      user.savedPlants.push(plantId);
      isBookmarked = true;
    }

    await user.save();
    return { isBookmarked, savedCount: user.savedPlants.length };
  }
}

module.exports = new GardenService();
