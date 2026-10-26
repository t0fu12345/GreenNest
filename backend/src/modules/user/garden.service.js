const User = require('../auth/user.model');
const Plant = require('../plant/plant.model');

class GardenService {
  async getGarden(userId) {
    const user = await User.findById(userId)
      .populate('garden.plant', 'name scientificName specimenId slug biome images watering light careLevel category')
      .populate('savedPlants', 'name scientificName specimenId slug biome images');

    return {
      garden: user.garden || [],
      savedPlants: user.savedPlants || []
    };
  }

  async addToGarden(userId, plantIdentifier, customNickname) {
    let plant = null;
    if (plantIdentifier && typeof plantIdentifier === 'string' && plantIdentifier.match(/^[0-9a-fA-F]{24}$/)) {
      plant = await Plant.findById(plantIdentifier);
    }
    if (!plant) {
      plant = await Plant.findOne({ specimenId: plantIdentifier });
    }
    if (!plant) {
      plant = await Plant.findOne({
        $or: [
          { slug: plantIdentifier },
          { catalogCode: plantIdentifier },
          { name: new RegExp(`^${plantIdentifier}$`, 'i') }
        ]
      });
    }
    if (!plant) {
      const error = new Error('Plant specimen not found');
      error.statusCode = 404;
      error.errorCode = 'PLANT_NOT_FOUND';
      throw error;
    }

    const user = await User.findById(userId);

    const alreadyInGarden = user.garden.some(
      item => item.plant && item.plant.toString() === plant._id.toString()
    );
    if (alreadyInGarden) {
      const error = new Error('This plant specimen is already in your Garden');
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
      plant: plant._id,
      customNickname: (customNickname && customNickname.trim()) ? customNickname.trim() : plant.name,
      addedAt: new Date(),
      checklist: defaultChecklist
    });

    await user.save();

    const updatedUser = await User.findById(userId)
      .populate('garden.plant', 'name scientificName specimenId slug biome images watering light careLevel category');

    return updatedUser.garden;
  }

  async removeFromGarden(userId, gardenItemId) {
    const user = await User.findById(userId);
    user.garden = user.garden.filter(
      item => item._id.toString() !== gardenItemId && item.plant?.toString() !== gardenItemId
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
          { specimenId: pid },
          { slug: pid }
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
    let gardenItem = user.garden.id(gardenItemId);
    if (!gardenItem) {
      gardenItem = user.garden.find(item => item.plant && item.plant.toString() === gardenItemId.toString());
    }

    if (!gardenItem) {
      const error = new Error('Garden item not found');
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

  async toggleBookmark(userId, plantIdentifier) {
    let plant = null;
    if (plantIdentifier && typeof plantIdentifier === 'string' && plantIdentifier.match(/^[0-9a-fA-F]{24}$/)) {
      plant = await Plant.findById(plantIdentifier);
    }
    if (!plant) {
      plant = await Plant.findOne({ specimenId: plantIdentifier });
    }
    if (!plant) {
      plant = await Plant.findOne({
        $or: [
          { slug: plantIdentifier },
          { catalogCode: plantIdentifier },
          { name: new RegExp(`^${plantIdentifier}$`, 'i') }
        ]
      });
    }
    if (!plant) {
      const error = new Error('Plant specimen not found');
      error.statusCode = 404;
      error.errorCode = 'PLANT_NOT_FOUND';
      throw error;
    }

    const user = await User.findById(userId);
    const plantIdStr = plant._id.toString();
    const index = user.savedPlants.findIndex(
      id => id && id.toString() === plantIdStr
    );

    let isBookmarked = false;
    if (index > -1) {
      user.savedPlants.splice(index, 1);
      isBookmarked = false;
    } else {
      user.savedPlants.push(plant._id);
      isBookmarked = true;
    }

    await user.save();
    return { isBookmarked, savedCount: user.savedPlants.length };
  }
}

module.exports = new GardenService();