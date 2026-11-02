const assert = require('node:assert/strict');
const test = require('node:test');
const path = require('node:path');
const loadEnvironment = require('../src/config/env');

const envPath = path.join(__dirname, 'fixtures/development.env.fixture');

test('development uses the local Gemini key even when the shell contains a stale key', () => {
  const environment = {
    NODE_ENV: 'development',
    GEMINI_API_KEY: 'stale-shell-key',
    MONGO_URI: 'mongodb://127.0.0.1:27017/OtherDatabase'
  };

  loadEnvironment({ envPath, environment });

  assert.equal(environment.GEMINI_API_KEY, 'local-development-test-key');
  assert.equal(environment.MONGO_URI, 'mongodb://127.0.0.1:27017/OtherDatabase');
});

test('production keeps its deployed Gemini key instead of replacing it from a file', () => {
  const environment = { NODE_ENV: 'production', GEMINI_API_KEY: 'deployed-key' };

  loadEnvironment({ envPath, environment });

  assert.equal(environment.GEMINI_API_KEY, 'deployed-key');
  assert.equal(environment.NODE_ENV, 'production');
});

test('an absent local env file leaves the supplied Gemini key intact', () => {
  const environment = { NODE_ENV: 'development', GEMINI_API_KEY: 'shell-key' };

  loadEnvironment({ envPath: path.join(__dirname, 'fixtures/missing.env'), environment });

  assert.equal(environment.GEMINI_API_KEY, 'shell-key');
});
