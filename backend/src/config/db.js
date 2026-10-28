const mongoose = require('mongoose');

const LOOPBACK_HOSTS = new Set(['127.0.0.1', 'localhost', '[::1]']);

const getLocalUri = () => {
  const uri = process.env.MONGO_URI?.trim();
  if (!uri) {
    throw new Error('MONGO_URI is required and must point to local MongoDB');
  }

  let parsed;
  try {
    parsed = new URL(uri);
  } catch {
    throw new Error('MONGO_URI must be a valid local MongoDB URI');
  }

  if (parsed.protocol !== 'mongodb:') {
    throw new Error('MONGO_URI must be a local MongoDB URI using mongodb://');
  }
  if (!LOOPBACK_HOSTS.has(parsed.hostname.toLowerCase())) {
    throw new Error('MONGO_URI must use a loopback host');
  }
  const expectedDatabase = process.env.NODE_ENV === 'test' ? '/GreenNestTest' : '/GreenNest';
  if (parsed.pathname !== expectedDatabase) {
    const databaseName = expectedDatabase.slice(1);
    throw new Error(`MONGO_URI must target the ${databaseName} database`);
  }

  return uri;
};

const sanitizeConnectionError = (error, uri) => {
  const redactedUri = uri.replace(/\/\/[^@/]+@/, '//[REDACTED]@');
  const safeMessage = String(error?.message || 'Local MongoDB connection failed')
    .split(uri).join(redactedUri)
    .replace(/mongodb(?:\+srv)?:\/\/[^\s@/]+@/gi, 'mongodb://[REDACTED]@');
  const safeError = new Error(safeMessage);
  safeError.name = error?.name || 'MongoDBConnectionError';
  if (error?.code !== undefined) safeError.code = error.code;
  return safeError;
};

const connectDB = async () => {
  const uri = getLocalUri();
  const options = {
    serverSelectionTimeoutMS: 8000,
    maxPoolSize: 10,
    socketTimeoutMS: 45000,
  };

  try {
    const connection = await mongoose.connect(uri, options);
    console.log(`[MongoDB Local] Connected successfully: ${connection.connection.host}/${connection.connection.name}`);
    return connection;
  } catch (error) {
    const safeError = sanitizeConnectionError(error, uri);
    console.error(`[MongoDB Local] Connection failed: ${safeError.message}`);
    throw safeError;
  }
};

mongoose.connection.on('disconnected', () => {
  console.warn('[MongoDB Local] Database connection lost. Mongoose will attempt to reconnect.');
});

mongoose.connection.on('error', (error) => {
  console.error(`[MongoDB Local] Connection error: ${error.message}`);
});

const handleGracefulShutdown = async (signal) => {
  try {
    await mongoose.connection.close();
    console.log(`[MongoDB Local] Connection closed after ${signal}`);
  } catch (error) {
    console.error(`[MongoDB Local] Failed to close connection: ${error.message}`);
  }
};

process.on('SIGINT', () => handleGracefulShutdown('SIGINT'));
process.on('SIGTERM', () => handleGracefulShutdown('SIGTERM'));

module.exports = connectDB;
