const assert = require('node:assert/strict');
const test = require('node:test');

const mongoose = require('mongoose');
const connectDB = require('../src/config/db');
const { startServer } = require('../src/server');

const LOCAL_URI = 'mongodb://127.0.0.1:27017/GreenNest';
const AUTHENTICATED_LOCAL_URI = 'mongodb://localuser:safe-password@127.0.0.1:27017/GreenNest?authSource=admin';
const ATLAS_URI = 'mongodb+srv://user:password@cluster0.example.mongodb.net/GreenNest';

const withConnectionEnvironment = async (t, mongoUri, run, nodeEnv = process.env.NODE_ENV) => {
  const originalConnect = mongoose.connect;
  const originalUri = process.env.MONGO_URI;
  const originalNodeEnv = process.env.NODE_ENV;
  const originalLog = console.log;
  const originalError = console.error;

  t.after(() => {
    mongoose.connect = originalConnect;
    console.log = originalLog;
    console.error = originalError;
    if (originalUri === undefined) delete process.env.MONGO_URI;
    else process.env.MONGO_URI = originalUri;
    if (originalNodeEnv === undefined) delete process.env.NODE_ENV;
    else process.env.NODE_ENV = originalNodeEnv;
  });

  if (mongoUri === undefined) delete process.env.MONGO_URI;
  else process.env.MONGO_URI = mongoUri;
  if (nodeEnv === undefined) delete process.env.NODE_ENV;
  else process.env.NODE_ENV = nodeEnv;
  console.log = () => {};
  console.error = () => {};
  await run();
};

test('connectDB requires an explicit MONGO_URI', async (t) => {
  await withConnectionEnvironment(t, undefined, async () => {
    mongoose.connect = async () => ({ connection: { host: '127.0.0.1', name: 'GreenNest' } });
    await assert.rejects(connectDB(), /MONGO_URI is required/);
  });
});

test('connectDB passes the configured local URI unchanged', async (t) => {
  await withConnectionEnvironment(t, LOCAL_URI, async () => {
    let receivedUri;
    mongoose.connect = async (uri) => {
      receivedUri = uri;
      return { connection: { host: '127.0.0.1', name: 'GreenNest' } };
    };

    await connectDB();
    assert.equal(receivedUri, LOCAL_URI);
  });
});

test('connectDB rejects Atlas and remote MongoDB hosts', async (t) => {
  await withConnectionEnvironment(t, ATLAS_URI, async () => {
    mongoose.connect = async () => { throw new Error('validation did not reject Atlas'); };
    await assert.rejects(connectDB(), /local MongoDB URI/);
  });

  await withConnectionEnvironment(t, 'mongodb://192.168.1.50:27017/GreenNest', async () => {
    mongoose.connect = async () => { throw new Error('validation did not reject remote host'); };
    await assert.rejects(connectDB(), /loopback host/);
  });
});

test('connectDB rejects local URIs that do not target GreenNest', async (t) => {
  await withConnectionEnvironment(t, 'mongodb://127.0.0.1:27017/GreenNestTest', async () => {
    await assert.rejects(connectDB(), /GreenNest database/);
  });
});

test('connectDB accepts GreenNestTest only in the test environment', async (t) => {
  const testUri = 'mongodb://127.0.0.1:27017/GreenNestTest';
  await withConnectionEnvironment(t, testUri, async () => {
    let receivedUri;
    mongoose.connect = async (uri) => {
      receivedUri = uri;
      return { connection: { host: '127.0.0.1', name: 'GreenNestTest' } };
    };

    await connectDB();
    assert.equal(receivedUri, testUri);
  }, 'test');
});

test('connectDB surfaces a local failure and attempts only once', async (t) => {
  await withConnectionEnvironment(t, LOCAL_URI, async () => {
    let attempts = 0;
    mongoose.connect = async () => {
      attempts += 1;
      throw new Error('connect ECONNREFUSED 127.0.0.1:27017');
    };

    await assert.rejects(connectDB(), /ECONNREFUSED/);
    assert.equal(attempts, 1);
  });
});

test('connectDB removes local credentials from surfaced connection errors', async (t) => {
  await withConnectionEnvironment(t, AUTHENTICATED_LOCAL_URI, async () => {
    mongoose.connect = async () => {
      throw new Error(`Connection failed for ${AUTHENTICATED_LOCAL_URI}`);
    };

    await assert.rejects(
      connectDB(),
      (error) => !error.message.includes('safe-password') && error.message.includes('[REDACTED]')
    );
  });
});

test('startServer does not open an HTTP listener when local MongoDB fails', async () => {
  const localFailure = new Error('Local MongoDB unavailable');
  await assert.rejects(
    startServer(0, async () => { throw localFailure; }),
    (error) => error === localFailure
  );
});
