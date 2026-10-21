const Gardener = require('./gardener.model');

class GardenerService {
  async getGardeners() {
    return Gardener.find().sort({ experienceYears: -1 });
  }

  async getGardenerById(id) {
    const gardener = await Gardener.findById(id).populate(
      'associatedPlants',
      'name scientificName specimenId images biome careLevel'
    );

    if (!gardener) {
      const error = new Error('Không tìm thấy hồ sơ chuyên gia');
      error.statusCode = 404;
      error.errorCode = 'GARDENER_NOT_FOUND';
      throw error;
    }

    return gardener;
  }

  async createGardener(data) {
    return Gardener.create(data);
  }

  async updateGardener(id, updateData) {
    const gardener = await Gardener.findById(id);
    if (!gardener) {
      const error = new Error('Không tìm thấy chuyên gia cần cập nhật');
      error.statusCode = 404;
      error.errorCode = 'GARDENER_NOT_FOUND';
      throw error;
    }

    return Gardener.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true
    });
  }

  async deleteGardener(id) {
    const gardener = await Gardener.findById(id);
    if (!gardener) {
      const error = new Error('Không tìm thấy chuyên gia cần xóa');
      error.statusCode = 404;
      error.errorCode = 'GARDENER_NOT_FOUND';
      throw error;
    }

    await Gardener.findByIdAndDelete(id);
    return true;
  }
}

module.exports = new GardenerService();
