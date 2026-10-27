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
      publishedPlants,
      draftPlants,
      totalAccounts,
      totalAdmins,
      resolvedContacts,
      recentContacts,
      recentUsers
    ] = await Promise.all([
      Plant.countDocuments(),
      Gardener.countDocuments(),
      Collection.countDocuments(),
      Gallery.countDocuments(),
      ContactMessage.countDocuments({ status: 'pending' }),
      User.countDocuments({ role: 'user' }),
      Plant.countDocuments({ status: 'published' }),
      Plant.countDocuments({ status: 'draft' }),
      User.countDocuments(),
      User.countDocuments({ role: 'admin' }),
      ContactMessage.countDocuments({ status: 'resolved' }),
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
      publishedPlants,
      draftPlants,
      totalAccounts,
      totalAdmins,
      resolvedContacts,
      recentContacts,
      recentUsers
    };
  }

  async getUsers({ search, role, page = 1, limit = 15 }) {
    const query = {};
    if (role && role !== 'all') query.role = role;
    if (search && search.trim()) {
      const escapedSearch = search.trim().replace(/[|\\{}()[\]^$+*?.]/g, '\\$&');
      query.$or = [
        { fullName: { $regex: escapedSearch, $options: 'i' } },
        { email: { $regex: escapedSearch, $options: 'i' } }
      ];
    }

    const pageNum = Math.max(1, Number.parseInt(page, 10) || 1);
    const limitNum = Math.min(100, Math.max(1, Number.parseInt(limit, 10) || 15));
    const [totalItems, users] = await Promise.all([
      User.countDocuments(query),
      User.find(query)
        .select('fullName email role avatarUrl createdAt')
        .sort({ createdAt: -1 })
        .skip((pageNum - 1) * limitNum)
        .limit(limitNum)
    ]);

    return {
      users,
      pagination: {
        page: pageNum,
        limit: limitNum,
        totalItems,
        totalPages: Math.ceil(totalItems / limitNum)
      }
    };
  }

  async updateUserRole(userId, role, actorId) {
    if (!['admin', 'user'].includes(role)) {
      const error = new Error('Role must be either admin or user');
      error.statusCode = 400;
      error.errorCode = 'INVALID_ROLE';
      throw error;
    }
    if (userId === actorId.toString()) {
      const error = new Error('Administrators cannot change their own role');
      error.statusCode = 409;
      error.errorCode = 'CANNOT_MODIFY_SELF';
      throw error;
    }

    const user = await User.findById(userId);
    if (!user) {
      const error = new Error('User not found');
      error.statusCode = 404;
      error.errorCode = 'USER_NOT_FOUND';
      throw error;
    }
    if (user.role === 'admin' && role === 'user' && await User.countDocuments({ role: 'admin' }) <= 1) {
      const error = new Error('At least one administrator account must remain');
      error.statusCode = 409;
      error.errorCode = 'LAST_ADMIN_REQUIRED';
      throw error;
    }

    user.role = role;
    await user.save();
    return User.findById(user._id).select('fullName email role avatarUrl createdAt');
  }

  async deleteUser(userId, actorId) {
    if (userId === actorId.toString()) {
      const error = new Error('Administrators cannot delete their own active account');
      error.statusCode = 409;
      error.errorCode = 'CANNOT_MODIFY_SELF';
      throw error;
    }

    const user = await User.findById(userId);
    if (!user) {
      const error = new Error('User not found');
      error.statusCode = 404;
      error.errorCode = 'USER_NOT_FOUND';
      throw error;
    }
    if (user.role === 'admin' && await User.countDocuments({ role: 'admin' }) <= 1) {
      const error = new Error('At least one administrator account must remain');
      error.statusCode = 409;
      error.errorCode = 'LAST_ADMIN_REQUIRED';
      throw error;
    }

    await user.deleteOne();
    return true;
  }
}

module.exports = new AdminService();
