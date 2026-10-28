const User = require('../../src/modules/auth/user.model');
const Plant = require('../../src/modules/plant/plant.model');
const Gardener = require('../../src/modules/gardener/gardener.model');
const Collection = require('../../src/modules/collection/collection.model');
const Gallery = require('../../src/modules/gallery/gallery.model');
const ContactMessage = require('../../src/modules/contact/contact.model');
const PersonalCollection = require('../../src/modules/personalCollection/personalCollection.model');

const models = [PersonalCollection, ContactMessage, Gallery, Collection, Plant, Gardener, User];

const clearTestDatabase = async () => Promise.all(models.map(model => model.deleteMany({})));

const resetTestDatabase = async () => {
  await clearTestDatabase();
  const admin = new User({ fullName: 'Test Administrator', email: 'admin@greennest.vn', password: 'Admin@123456', role: 'admin' });
  const member = new User({ fullName: 'Test Member', email: 'nam.le@greennest.vn', password: 'GreenNest@2026', role: 'user' });
  await admin.save();
  await member.save();

  const gardener = await Gardener.create({ name: 'Test Botanist', specialization: 'Atlas test horticulture', experienceYears: 8, contactEmail: 'botanist@example.com' });
  const plants = await Plant.insertMany(Array.from({ length: 6 }, (_, index) => ({
    specimenId: `test-specimen-${index + 1}`,
    catalogCode: `TEST-${index + 1}`,
    name: `Test Plant ${index + 1}`,
    scientificName: `Planta testii ${index + 1}`,
    slug: `test-plant-${index + 1}`,
    category: index % 2 ? 'Foliage' : 'Aroid',
    biome: 'tropical',
    description: 'A deterministic fixture used only in GreenNestTest.',
    light: 'Bright indirect light',
    watering: 'Weekly',
    careLevel: 'Easy',
    images: { hero: `https://example.com/test-plant-${index + 1}.jpg`, gallery: [] },
    gardener: gardener._id,
    status: 'published'
  })));
  gardener.associatedPlants = plants.map(plant => plant._id);
  await gardener.save();

  await Collection.create({ title: 'Test Seasonal Collection', slug: 'test-seasonal-collection', description: 'Curated only for automated tests.', coverImage: 'https://example.com/test-collection.jpg', season: 'spring', isFeatured: true, plants: plants.slice(0, 3).map(plant => plant._id) });
  await Gallery.insertMany(Array.from({ length: 10 }, (_, index) => ({ imageUrl: `https://example.com/gallery-${index + 1}.jpg`, alt: `Test gallery image ${index + 1}`, caption: `Test gallery caption ${index + 1}`, credit: 'GreenNest Test', aspectRatio: 'square', plant: plants[index % plants.length]._id })));
  await ContactMessage.create({ fullName: 'Fixture Contact', email: 'fixture@example.com', subject: 'Fixture inquiry', message: 'This message exists only in GreenNestTest.', status: 'pending' });
};

module.exports = { resetTestDatabase, clearTestDatabase };
