const dns = require('dns');
const mongoose = require('mongoose');

// Route DNS queries through Google/Cloudflare DNS to prevent querySrv ECONNREFUSED on Windows/ISP networks
try {
  dns.setServers(['8.8.8.8', '8.8.4.4', '1.1.1.1']);
} catch (e) {
  // Ignore if environment does not allow DNS override
}

const connectDB = async () => {
  let uri = process.env.MONGO_URI || 'mongodb://localhost:27017/GreenNest';
  // Safeguard: normalize database casing if 'greennest' is provided instead of 'GreenNest'
  if (uri.includes('/greennest')) {
    uri = uri.replace('/greennest', '/GreenNest');
  }
  const isAtlas = uri.startsWith('mongodb+srv://');
  const fallbackUri = process.env.MONGO_FALLBACK_URI || 'mongodb://127.0.0.1:27017/GreenNest';
  const allowDevelopmentFallback = process.env.NODE_ENV !== 'production' && uri !== fallbackUri;

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
      console.log(`🍃 [MongoDB Atlas] Connected successfully to Cloud Cluster: ${host}/${dbName}`);
    } else {
      console.log(`🌿 [MongoDB Local] Connected successfully to local database: ${host}/${dbName}`);
    }
  } catch (error) {
    console.error(`❌ [MongoDB] Connection error: ${error.message}`);
    if (allowDevelopmentFallback) {
      console.warn(`⚠️ [MongoDB] Development connection failed. Falling back to ${fallbackUri.replace(/:\/\/[^@]+@/, '://***@')} ...`);
      try {
        const fallbackConnection = await mongoose.connect(fallbackUri, options);
        console.log(`🌿 [MongoDB Local] Connected to development fallback: ${fallbackConnection.connection.host}/${fallbackConnection.connection.name}`);
        return;
      } catch (fallbackError) {
        console.error(`❌ [MongoDB] Development fallback failed: ${fallbackError.message}`);
      }
    }
    if (isAtlas && (error.message.includes('whitelist') || error.message.includes('timed out') || error.message.includes('buffering') || error.message.includes('bad auth'))) {
      console.error('💡 [Atlas Tip]: Verify the database username/password and Atlas Network Access settings.');
    }
    process.exit(1);
  }
};

// Register Mongoose connection event listeners
mongoose.connection.on('disconnected', () => {
  console.warn('⚠️ [MongoDB] Database connection lost. Attempting to reconnect...');
});

mongoose.connection.on('error', (err) => {
  console.error(`❌ [MongoDB Error]: ${err.message}`);
});

// Graceful Shutdown handling
const handleGracefulShutdown = async (signal) => {
  try {
    await mongoose.connection.close();
    console.log(`🛑 [MongoDB] Connection closed gracefully after signal ${signal}`);
  } catch (err) {
    console.error(`Error closing MongoDB connection: ${err.message}`);
  }
};

process.on('SIGINT', () => handleGracefulShutdown('SIGINT'));
process.on('SIGTERM', () => handleGracefulShutdown('SIGTERM'));

module.exports = connectDB;
