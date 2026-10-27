const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const connectDB = require('./config/db');
const { notFound, errorHandler } = require('./middlewares/errorHandler.middleware');

// Initialize Express App
const app = express();

// Core Middleware Configuration
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// System Health Check Route
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'UP',
    service: 'GreenNest RESTful API',
    architecture: 'Modular MCS (Model - Controller - Service)',
    environment: process.env.NODE_ENV || 'development',
    timestamp: new Date().toISOString()
  });
});

// Mount Modular API Routes
app.use('/api/auth', require('./modules/auth/auth.routes'));
app.use('/api/plants', require('./modules/plant/plant.routes'));
app.use('/api/garden', require('./modules/user/garden.routes'));
app.use('/api/gardeners', require('./modules/gardener/gardener.routes'));
app.use('/api/collections', require('./modules/collection/collection.routes'));
app.use('/api/gallery', require('./modules/gallery/gallery.routes'));
app.use('/api/contact', require('./modules/contact/contact.routes'));
app.use('/api/admin', require('./modules/admin/admin.routes'));
app.use('/api/metadata', require('./modules/metadata/metadata.routes'));

// Centralized Error Handling Middlewares
app.use(notFound);
app.use(errorHandler);

// Start server if executed directly
const PORT = process.env.PORT || 5000;
let server;

const startServer = async (port = PORT) => {
  await connectDB();

  return new Promise((resolve, reject) => {
    const listeningServer = app.listen(port, () => {
      console.log(`🌿 GreenNest Modular Backend Server is running in ${process.env.NODE_ENV || 'development'} mode on http://localhost:${port}`);
      resolve(listeningServer);
    });

    listeningServer.once('error', reject);
  });
};

if (require.main === module) {
  startServer()
    .then((listeningServer) => {
      server = listeningServer;
    })
    .catch((error) => {
      console.error(`❌ Failed to start backend server: ${error.message}`);
      process.exit(1);
    });

  // Handle Unhandled Rejections safely
  process.on('unhandledRejection', (err) => {
    console.error(`❌ Unhandled Rejection: ${err.message}`);
    if (server) server.close(() => process.exit(1));
  });
}

module.exports = app;
module.exports.startServer = startServer;
