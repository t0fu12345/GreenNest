const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');

// Nạp cấu hình biến môi trường
dotenv.config();

const connectDB = require('./config/db');
const { notFound, errorHandler } = require('./middlewares/errorHandler.middleware');

// Khởi tạo Express App
const app = express();

// Kết nối cơ sở dữ liệu MongoDB
connectDB();

// Thiết lập Middlewares nền tảng
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Tuyến đường kiểm tra sức khỏe server (Health Check)
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'UP',
    service: 'GreenNest RESTful API',
    architecture: 'Modular MCS (Model - Controller - Service)',
    environment: process.env.NODE_ENV || 'development',
    timestamp: new Date().toISOString()
  });
});

// Gắn kết (Mount) các API Modules theo kiến trúc Modular
app.use('/api/auth', require('./modules/auth/auth.routes'));
app.use('/api/plants', require('./modules/plant/plant.routes'));
app.use('/api/garden', require('./modules/user/garden.routes'));
app.use('/api/gardeners', require('./modules/gardener/gardener.routes'));
app.use('/api/collections', require('./modules/collection/collection.routes'));
app.use('/api/gallery', require('./modules/gallery/gallery.routes'));
app.use('/api/contact', require('./modules/contact/contact.routes'));
app.use('/api/admin', require('./modules/admin/admin.routes'));

// Middlewares xử lý lỗi tập trung
app.use(notFound);
app.use(errorHandler);

// Khởi chạy server
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  console.log(`🌿 GreenNest Modular Backend Server is running in ${process.env.NODE_ENV || 'development'} mode on http://localhost:${PORT}`);
});

// Xử lý các Unhandled Rejections an toàn
process.on('unhandledRejection', (err) => {
  console.error(`❌ Unhandled Rejection: ${err.message}`);
  server.close(() => process.exit(1));
});

module.exports = app;
