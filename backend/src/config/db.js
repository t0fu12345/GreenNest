const dns = require('dns');
const mongoose = require('mongoose');

// Route DNS queries through Google/Cloudflare DNS to prevent querySrv ECONNREFUSED on Windows/ISP networks
try {
  dns.setServers(['8.8.8.8', '8.8.4.4', '1.1.1.1']);
} catch (e) {
  // Ignore if environment does not allow DNS override
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
      console.log(`🍃 [MongoDB Atlas] Connected successfully to Cloud Cluster: ${host}/${dbName}`);
    } else {
      console.log(`🌿 [MongoDB Local] Connected successfully to local database: ${host}/${dbName}`);
    }
  } catch (error) {
    console.error(`❌ [MongoDB] Connection error: ${error.message}`);
    if (isAtlas) {
      console.warn('⚠️ [MongoDB Atlas] Cloud connection failed. Falling back to local MongoDB at mongodb://localhost:27017/greennest ...');
      try {
        const localConn = await mongoose.connect('mongodb://localhost:27017/greennest', options);
        console.log(`🌿 [MongoDB Local] Connected successfully to fallback local database: ${localConn.connection.host}/${localConn.connection.name}`);
        return;
      } catch (localErr) {
        console.error(`❌ [MongoDB Local] Local fallback failed: ${localErr.message}`);
      }
      if (error.message.includes('whitelist') || error.message.includes('timed out') || error.message.includes('buffering')) {
        console.error('💡 [Atlas Tip]: Please verify "Network Access" in MongoDB Atlas and ensure your IP is allowed (or Allow from anywhere: 0.0.0.0/0).');
      }
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
