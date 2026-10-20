const Plant = require('../plant/plant.model');
const Gardener = require('../gardener/gardener.model');
const Collection = require('../collection/collection.model');
const Gallery = require('../gallery/gallery.model');
const ContactMessage = require('../contact/contact.model');
const User = require('../auth/user.model');

class AdminService {
  async getDashboardStats() {
    const [
      totalPlants,
      totalGardeners,
      totalCollections,
      totalGalleryImages,
      pendingContacts,
      totalUsers,
      recentContacts,
      recentUsers
    ] = await Promise.all([
      Plant.countDocuments(),
      Gardener.countDocuments(),
      Collection.countDocuments(),
      Gallery.countDocuments(),
      ContactMessage.countDocuments({ status: 'pending' }),
      User.countDocuments({ role: 'user' }),
      ContactMessage.find().sort({ createdAt: -1 }).limit(5),
      User.find({ role: 'user' }).select('fullName email createdAt').sort({ createdAt: -1 }).limit(5)
    ]);

    return {
      totalPlants,
      totalGardeners,
      totalCollections,
      totalGalleryImages,
      pendingContacts,
      totalUsers,
      recentContacts,
      recentUsers
    };
  }
}

module.exports = new AdminService();
