const assert = require('node:assert/strict');
const { spawn } = require('node:child_process');
const path = require('node:path');
const test = require('node:test');

const mongoose = require('mongoose');
const connectDB = require('../src/config/db');

test('connectDB normalizes only the database path and preserves Atlas credentials', async (t) => {
  const originalConnect = mongoose.connect;
  const originalUri = process.env.MONGO_URI;
  const originalLog = console.log;
  let receivedUri;

  t.after(() => {
    mongoose.connect = originalConnect;
    console.log = originalLog;
    if (originalUri === undefined) {
      delete process.env.MONGO_URI;
    } else {
      process.env.MONGO_URI = originalUri;
    }
  });

  process.env.MONGO_URI = 'mongodb+srv://greennest_server:safe-password@cluster0.example.mongodb.net/greennest?retryWrites=true&w=majority';
  console.log = () => {};
  mongoose.connect = async (uri) => {
    receivedUri = uri;
    return { connection: { host: 'cluster0.example.mongodb.net', name: 'GreenNest' } };
  };

  await connectDB();

  assert.equal(
    receivedUri,
    'mongodb+srv://greennest_server:safe-password@cluster0.example.mongodb.net/GreenNest?retryWrites=true&w=majority'
  );
});

test('server waits for MongoDB before it starts listening', async () => {
  const backendRoot = path.resolve(__dirname, '..');
  const child = spawn(process.execPath, ['src/server.js'], {
    cwd: backendRoot,
    env: {
      ...process.env,
      MONGO_URI: 'mongodb://127.0.0.1:27017/GreenNestStartupOrderTest',
      PORT: '0',
      NODE_ENV: 'test'
    },
    stdio: ['ignore', 'pipe', 'pipe']
  });

  let output = '';
  const completion = new Promise((resolve, reject) => {
    const timeout = setTimeout(() => reject(new Error(`Timed out waiting for startup output:\n${output}`)), 10000);

    const collect = (chunk) => {
      output += chunk.toString();
      if (output.includes('Connected successfully') && output.includes('Server is running')) {
        clearTimeout(timeout);
        resolve();
      }
    };

    child.stdout.on('data', collect);
    child.stderr.on('data', collect);
    child.once('error', reject);
    child.once('exit', (code) => {
      if (!output.includes('Connected successfully') || !output.includes('Server is running')) {
        clearTimeout(timeout);
        reject(new Error(`Server exited with code ${code}:\n${output}`));
      }
    });
  });

  try {
    await completion;
    assert.ok(
      output.indexOf('Connected successfully') < output.indexOf('Server is running'),
      `Expected database connection before HTTP listener, received:\n${output}`
    );
  } finally {
    child.kill();
  }
});
