const dns = require('dns');
const mongoose = require('mongoose');

// Tự động định tuyến DNS qua Google/Cloudflare DNS để giải quyết lỗi querySrv ECONNREFUSED trên mạng Windows/ISP
try {
  dns.setServers(['8.8.8.8', '8.8.4.4', '1.1.1.1']);
} catch (e) {
  // Bỏ qua nếu môi trường không cho phép override DNS
}

const connectDB = async () => {
  const uri = process.env.MONGO_URI || 'mongodb://localhost:27017/greennest';
  const isAtlas = uri.startsWith('mongodb+srv://');

  const options = {
    serverSelectionTimeoutMS: 8000,
    maxPoolSize: 10,
    socketTimeoutMS: 45000,
  };

  try {
    const conn = await mongoose.connect(uri, options);
    const host = conn.connection.host;
    const dbName = conn.connection.name;

    if (isAtlas) {
      console.log(`🍃 [MongoDB Atlas] Kết nối Cloud thành công: ${host}/${dbName}`);
    } else {
      console.log(`🌿 [MongoDB Local] Kết nối cục bộ thành công: ${host}/${dbName}`);
    }
  } catch (error) {
    console.error(`❌ [MongoDB] Lỗi kết nối: ${error.message}`);
    if (isAtlas && (error.message.includes('whitelist') || error.message.includes('timed out') || error.message.includes('buffering'))) {
      console.error('💡 [Gợi ý Atlas]: Vui lòng kiểm tra mục "Network Access" trên MongoDB Atlas và chắc chắn IP của bạn đã được thêm (hoặc Allow from anywhere: 0.0.0.0/0).');
    }
    process.exit(1);
  }
};

// Đăng ký các sự kiện kết nối Mongoose
mongoose.connection.on('disconnected', () => {
  console.warn('⚠️ [MongoDB] Mất kết nối database. Đang cố gắng kết nối lại...');
});

mongoose.connection.on('error', (err) => {
  console.error(`❌ [MongoDB Error]: ${err.message}`);
});

// Xử lý đóng kết nối an toàn (Graceful Shutdown)
const handleGracefulShutdown = async (signal) => {
  try {
    await mongoose.connection.close();
    console.log(`🛑 [MongoDB] Đã đóng kết nối an toàn sau tín hiệu ${signal}`);
  } catch (err) {
    console.error(`Lỗi khi đóng kết nối MongoDB: ${err.message}`);
  }
};

process.on('SIGINT', () => handleGracefulShutdown('SIGINT'));
process.on('SIGTERM', () => handleGracefulShutdown('SIGTERM'));

module.exports = connectDB;
