const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config({ path: path.join(__dirname, '../.env') });

// Load models
const User = require('../src/modules/auth/user.model');
const Plant = require('../src/modules/plant/plant.model');
const Gardener = require('../src/modules/gardener/gardener.model');
const Collection = require('../src/modules/collection/collection.model');
const Gallery = require('../src/modules/gallery/gallery.model');
const ContactMessage = require('../src/modules/contact/contact.model');

const connectDB = require('../src/config/db');

// Read data from database/seedData/
const seedDataPath = path.join(__dirname, '../../database/seedData');

const usersData = JSON.parse(fs.readFileSync(path.join(seedDataPath, 'users.json'), 'utf-8'));
const gardenersData = JSON.parse(fs.readFileSync(path.join(seedDataPath, 'gardeners.json'), 'utf-8'));
const plantsData = JSON.parse(fs.readFileSync(path.join(seedDataPath, 'plants.json'), 'utf-8'));
const collectionsData = JSON.parse(fs.readFileSync(path.join(seedDataPath, 'plantCollections.json'), 'utf-8'));
const galleryData = JSON.parse(fs.readFileSync(path.join(seedDataPath, 'gallery.json'), 'utf-8'));

// Import seed dataset
const importData = async () => {
  try {
    await connectDB();

    console.log('🧹 Purging existing database collections...');
    await User.deleteMany();
    await Plant.deleteMany();
    await Gardener.deleteMany();
    await Collection.deleteMany();
    await Gallery.deleteMany();
    await ContactMessage.deleteMany();

    console.log('👤 Seeding user accounts (auto-hashing passwords via bcrypt)...');
    const createdUsers = [];
    for (const u of usersData) {
      const userDoc = new User(u);
      await userDoc.save();
      createdUsers.push(userDoc);
    }
    console.log(`   -> Seeded ${createdUsers.length} users (including Admin: admin@greennest.vn / Admin@123456)`);

    console.log('🧑‍🌾 Seeding botanist & curator profiles...');
    const createdGardeners = await Gardener.insertMany(gardenersData);
    console.log(`   -> Seeded ${createdGardeners.length} botanists`);

    console.log('🌿 Seeding 20 core botanical specimens & microclimate telemetry...');
    const plantsToInsert = plantsData.map((plant, index) => {
      const gardener = createdGardeners[index % createdGardeners.length];
      return {
        ...plant,
        gardener: gardener._id
      };
    });
    const createdPlants = await Plant.insertMany(plantsToInsert);
    console.log(`   -> Seeded ${createdPlants.length} plant specimens`);

    // Link associated plants to botanists
    for (const gardener of createdGardeners) {
      const associated = createdPlants.filter(p => p.gardener.toString() === gardener._id.toString());
      gardener.associatedPlants = associated.map(p => p._id);
      await gardener.save();
    }

    console.log('📚 Seeding seasonal curated collections...');
    for (const col of collectionsData) {
      const matchedPlantIds = createdPlants
        .filter(p => col.plantSpecimenIds && col.plantSpecimenIds.includes(p.specimenId))
        .map(p => p._id);

      await Collection.create({
        title: col.title,
        slug: col.slug,
        description: col.description,
        coverImage: col.coverImage,
        season: col.season || 'all',
        isFeatured: col.isFeatured || false,
        plants: matchedPlantIds
      });
    }
    console.log(`   -> Seeded ${collectionsData.length} curated seasonal collections`);

    console.log('🖼️ Seeding interactive Lightbox gallery items...');
    const galleryToInsert = galleryData.map((item, index) => {
      const linkedPlant = createdPlants[index % createdPlants.length];
      return {
        ...item,
        plant: linkedPlant ? linkedPlant._id : null
      };
    });
    const createdGalleries = await Gallery.insertMany(galleryToInsert);
    console.log(`   -> Seeded ${createdGalleries.length} gallery images`);

    console.log('💌 Seeding sample inquiries...');
    await ContactMessage.create([
      {
        fullName: 'Quan Tran',
        email: 'quan.tran@gmail.com',
        subject: 'Consultation for low-light office sanctuary',
        message: 'Hello GreenNest team, I would like to request advice on air-purifying indoor species that thrive under low natural light environments.',
        status: 'pending'
      },
      {
        fullName: 'Elena Rostova',
        email: 'elena.rostova@botanic.org',
        subject: 'Biosphere skylight curation partnership',
        message: 'We would love to connect with Dr. Elena Vance to discuss bioclimatic dome consultation for our new conservatory project.',
        status: 'resolved'
      }
    ]);
    console.log('   -> Seeded 2 sample inquiries');

    // Seed personal garden for standard user
    const normalUser = createdUsers.find(u => u.role === 'user');
    if (normalUser && createdPlants.length >= 2) {
      normalUser.savedPlants = [createdPlants[0]._id, createdPlants[1]._id];
      normalUser.garden = [
        {
          plant: createdPlants[0]._id,
          customNickname: 'Living Room Monstera',
          addedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
          checklist: [
            { taskName: 'water', completed: true, lastCompletedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000) },
            { taskName: 'mist', completed: true, lastCompletedAt: new Date() },
            { taskName: 'fertilize', completed: false, lastCompletedAt: null },
            { taskName: 'prune', completed: false, lastCompletedAt: null }
          ]
        },
        {
          plant: createdPlants[1]._id,
          customNickname: 'Balcony Velvet Rose',
          addedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
          checklist: [
            { taskName: 'water', completed: true, lastCompletedAt: new Date() },
            { taskName: 'mist', completed: false, lastCompletedAt: null },
            { taskName: 'fertilize', completed: false, lastCompletedAt: null },
            { taskName: 'prune', completed: false, lastCompletedAt: null }
          ]
        }
      ];
      await normalUser.save();
      console.log('🪴 Seeded sample Living Sanctuary & Care Checklist for member Nam Le');
    }

    console.log('\n🎉 BOTANICAL SEED DATA INGESTION COMPLETED SUCCESSFULLY!');
    process.exit(0);
  } catch (error) {
    console.error(`❌ [Seeder] Error seeding database: ${error.message}`);
    console.error(error);
    process.exit(1);
  }
};

// Purge all data
const destroyData = async () => {
  try {
    await connectDB();
    console.log('🧹 Purging all collections from MongoDB...');
    await User.deleteMany();
    await Plant.deleteMany();
    await Gardener.deleteMany();
    await Collection.deleteMany();
    await Gallery.deleteMany();
    await ContactMessage.deleteMany();
    console.log('✅ Successfully purged all data.');
    process.exit(0);
  } catch (error) {
    console.error(`❌ [Seeder] Error purging database: ${error.message}`);
    process.exit(1);
  }
};

if (process.argv[2] === '--destroy') {
  destroyData();
} else {
  importData();
}
