const Plant = require('./plant.model');

class PlantService {
  async getPlants({
    q,
    search,
    category,
    biome,
    environment,
    light,
    watering,
    careLevel,
    status,
    sort = 'latest',
    page = 1,
    limit = 12
  }) {
    const query = {};

    if (status) {
      query.status = status;
    } else {
      query.status = 'published';
    }

    const searchTerm = q || search;
    if (searchTerm) {
      query.$or = [
        { name: { $regex: searchTerm, $options: 'i' } },
        { scientificName: { $regex: searchTerm, $options: 'i' } },
        { tags: { $regex: searchTerm, $options: 'i' } }
      ];
    }

    if (category && category !== 'all') {
      query.category = { $regex: new RegExp(`^${category}$`, 'i') };
    }

    const biomeVal = biome || environment;
    if (biomeVal && biomeVal !== 'all') {
      query.biome = biomeVal.toLowerCase();
    }

    if (light && light !== 'all') {
      query.light = { $regex: light, $options: 'i' };
    }

    if (watering && watering !== 'all') {
      query.watering = { $regex: watering, $options: 'i' };
    }

    if (careLevel && careLevel !== 'all') {
      query.careLevel = careLevel;
    }

    let sortOptions = { createdAt: -1 };
    if (sort === 'name_asc') sortOptions = { name: 1 };
    if (sort === 'name_desc') sortOptions = { name: -1 };
    if (sort === 'oldest') sortOptions = { createdAt: 1 };

    const pageNum = Math.max(1, parseInt(page, 10) || 1);
    const limitNum = Math.min(100, Math.max(1, parseInt(limit, 10) || 12));
    const skip = (pageNum - 1) * limitNum;

    const [totalItems, plants] = await Promise.all([
      Plant.countDocuments(query),
      Plant.find(query)
        .populate('gardener', 'name avatar specialization')
        .sort(sortOptions)
        .skip(skip)
        .limit(limitNum)
    ]);

    const totalPages = Math.ceil(totalItems / limitNum);

    return {
      plants,
      pagination: {
        page: pageNum,
        limit: limitNum,
        totalItems,
        totalPages
      }
    };
  }

  async getPlantById(id) {
    let plant;
    if (id.match(/^[0-9a-fA-F]{24}$/)) {
      plant = await Plant.findById(id).populate('gardener', 'name avatar specialization bio contactEmail');
    } else {
      plant = await Plant.findOne({
        $or: [{ specimenId: id }, { slug: id }]
      }).populate('gardener', 'name avatar specialization bio contactEmail');
    }

    if (!plant) {
      const error = new Error(`Không tìm thấy cây trồng với định danh: ${id}`);
      error.statusCode = 404;
      error.errorCode = 'PLANT_NOT_FOUND';
      throw error;
    }

    return plant;
  }

  async getRelatedPlants(id) {
    let plant;
    if (id.match(/^[0-9a-fA-F]{24}$/)) {
      plant = await Plant.findById(id);
    } else {
      plant = await Plant.findOne({ $or: [{ specimenId: id }, { slug: id }] });
    }

    if (!plant) {
      const error = new Error('Không tìm thấy cây trồng gốc');
      error.statusCode = 404;
      error.errorCode = 'PLANT_NOT_FOUND';
      throw error;
    }

    return Plant.find({
      _id: { $ne: plant._id },
      status: 'published',
      $or: [
        { category: plant.category },
        { biome: plant.biome }
      ]
    })
      .limit(4)
      .select('name scientificName specimenId biome images careLevel light watering');
  }

  async createPlant(plantData) {
    const finalSpecimenId = plantData.specimenId || `specimen-${plantData.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}`;

    const exists = await Plant.findOne({ specimenId: finalSpecimenId });
    if (exists) {
      const error = new Error(`Cây trồng với mã ${finalSpecimenId} đã tồn tại`);
      error.statusCode = 409;
      error.errorCode = 'PLANT_EXISTS';
      throw error;
    }

    return Plant.create({
      ...plantData,
      specimenId: finalSpecimenId,
      images: plantData.images || {
        hero: 'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&w=1200&q=80',
        gallery: []
      }
    });
  }

  async updatePlant(id, updateData) {
    const plant = await Plant.findById(id);
    if (!plant) {
      const error = new Error('Không tìm thấy cây trồng cần chỉnh sửa');
      error.statusCode = 404;
      error.errorCode = 'PLANT_NOT_FOUND';
      throw error;
    }

    return Plant.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true
    });
  }

  async deletePlant(id) {
    const plant = await Plant.findById(id);
    if (!plant) {
      const error = new Error('Không tìm thấy cây trồng cần xóa');
      error.statusCode = 404;
      error.errorCode = 'PLANT_NOT_FOUND';
      throw error;
    }

    await Plant.findByIdAndDelete(id);
    return true;
  }
}

module.exports = new PlantService();
