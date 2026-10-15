const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Nạp biến môi trường
dotenv.config({ path: path.join(__dirname, '../.env') });

// Nạp Models theo kiến trúc Modular
const User = require('../src/modules/auth/user.model');
const Plant = require('../src/modules/plant/plant.model');
const Gardener = require('../src/modules/gardener/gardener.model');
const Collection = require('../src/modules/collection/collection.model');
const Gallery = require('../src/modules/gallery/gallery.model');
const ContactMessage = require('../src/modules/contact/contact.model');

const connectDB = require('../src/config/db');

// Đọc dữ liệu từ database/seedData/
const seedDataPath = path.join(__dirname, '../../database/seedData');

const usersData = JSON.parse(fs.readFileSync(path.join(seedDataPath, 'users.json'), 'utf-8'));
const gardenersData = JSON.parse(fs.readFileSync(path.join(seedDataPath, 'gardeners.json'), 'utf-8'));
const plantsData = JSON.parse(fs.readFileSync(path.join(seedDataPath, 'plants.json'), 'utf-8'));
const collectionsData = JSON.parse(fs.readFileSync(path.join(seedDataPath, 'plantCollections.json'), 'utf-8'));
const galleryData = JSON.parse(fs.readFileSync(path.join(seedDataPath, 'gallery.json'), 'utf-8'));

// Hàm nạp dữ liệu mẫu
const importData = async () => {
  try {
    await connectDB();

    console.log('🧹 Đang làm sạch cơ sở dữ liệu cũ...');
    await User.deleteMany();
    await Plant.deleteMany();
    await Gardener.deleteMany();
    await Collection.deleteMany();
    await Gallery.deleteMany();
    await ContactMessage.deleteMany();

    console.log('👤 Đang nạp tài khoản người dùng (tự động hash mật khẩu bằng bcrypt)...');
    const createdUsers = [];
    for (const u of usersData) {
      const userDoc = new User(u);
      await userDoc.save(); // Kích hoạt pre-save hook băm mật khẩu
      createdUsers.push(userDoc);
    }
    console.log(`   -> Đã nạp ${createdUsers.length} người dùng (gồm tài khoản Admin: admin@greennest.vn / Admin@123456)`);

    console.log('🧑‍🌾 Đang nạp hồ sơ chuyên gia thực vật...');
    const createdGardeners = await Gardener.insertMany(gardenersData);
    console.log(`   -> Đã nạp ${createdGardeners.length} chuyên gia`);

    console.log('🌿 Đang nạp danh mục 20 cây trồng mẫu & vi khí hậu telemetry...');
    // Gán ngẫu nhiên chuyên gia bảo trợ cho từng cây
    const plantsToInsert = plantsData.map((plant, index) => {
      const gardener = createdGardeners[index % createdGardeners.length];
      return {
        ...plant,
        gardener: gardener._id
      };
    });
    const createdPlants = await Plant.insertMany(plantsToInsert);
    console.log(`   -> Đã nạp ${createdPlants.length} cây trồng`);

    // Cập nhật mảng associatedPlants cho các chuyên gia
    for (const gardener of createdGardeners) {
      const associated = createdPlants.filter(p => p.gardener.toString() === gardener._id.toString());
      gardener.associatedPlants = associated.map(p => p._id);
      await gardener.save();
    }

    console.log('📚 Đang nạp các bộ sưu tập thực vật theo mùa...');
    for (const col of collectionsData) {
      // Map từ plantSpecimenIds sang ObjectIds của plants đã tạo
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
    console.log(`   -> Đã nạp ${collectionsData.length} bộ sưu tập theo mùa`);

    console.log('🖼️ Đang nạp Thư viện ảnh tương tác Lightbox (Pinterest verified)...');
    const galleryToInsert = galleryData.map((item, index) => {
      const linkedPlant = createdPlants[index % createdPlants.length];
      return {
        ...item,
        plant: linkedPlant ? linkedPlant._id : null
      };
    });
    const createdGalleries = await Gallery.insertMany(galleryToInsert);
    console.log(`   -> Đã nạp ${createdGalleries.length} ảnh thư viện`);

    console.log('💌 Đang nạp tin nhắn liên hệ mẫu...');
    await ContactMessage.create([
      {
        fullName: 'Trần Minh Quân',
        email: 'quan.tran@gmail.com',
        subject: 'Tư vấn cây cho văn phòng thiếu sáng',
        message: 'Chào GreenNest, tôi muốn xin tư vấn một số loài cây lọc không khí tốt đặt trong phòng kín ít ánh sáng tự nhiên.',
        status: 'pending'
      },
      {
        fullName: 'Nguyễn Thị Thu Hằng',
        email: 'hang.nguyen@company.vn',
        subject: 'Hợp tác thiết kế giếng trời sinh học',
        message: 'Chúng tôi muốn liên hệ với Dr. Elena Vance để thảo luận về việc tư vấn hệ sinh thái vòm kính cho dự án tòa nhà mới.',
        status: 'resolved'
      }
    ]);
    console.log('   -> Đã nạp 2 tin nhắn liên hệ mẫu');

    // Nạp thêm dữ liệu Vườn cá nhân mẫu cho user thường (Lê Hoàng Nam)
    const normalUser = createdUsers.find(u => u.role === 'user');
    if (normalUser && createdPlants.length >= 2) {
      normalUser.savedPlants = [createdPlants[0]._id, createdPlants[1]._id];
      normalUser.garden = [
        {
          plant: createdPlants[0]._id,
          customNickname: 'Monstera phòng khách',
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
          customNickname: 'Hồng nhung ban công',
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
      console.log('🪴 Đã khởi tạo dữ liệu Vườn & Care Checklist mẫu cho thành viên Lê Hoàng Nam');
    }

    console.log('\n🎉 NẠP DỮ LIỆU SEED VÀO MONGODB HOÀN TẤT THÀNH CÔNG RỰC RỠ!');
    process.exit(0);
  } catch (error) {
    console.error(`❌ [Seeder] Lỗi khi nạp dữ liệu: ${error.message}`);
    console.error(error);
    process.exit(1);
  }
};

// Hàm xóa sạch dữ liệu
const destroyData = async () => {
  try {
    await connectDB();
    console.log('🧹 Đang xóa sạch toàn bộ dữ liệu khỏi MongoDB...');
    await User.deleteMany();
    await Plant.deleteMany();
    await Gardener.deleteMany();
    await Collection.deleteMany();
    await Gallery.deleteMany();
    await ContactMessage.deleteMany();
    console.log('✅ Đã xóa sạch dữ liệu thành công.');
    process.exit(0);
  } catch (error) {
    console.error(`❌ [Seeder] Lỗi khi xóa dữ liệu: ${error.message}`);
    process.exit(1);
  }
};

if (process.argv[2] === '--destroy') {
  destroyData();
} else {
  importData();
}
