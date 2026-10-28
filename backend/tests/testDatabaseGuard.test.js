const assert = require('node:assert/strict');
const test = require('node:test');

const { validateTestDatabaseUri } = require('./utils/testDatabaseGuard');

const PRIMARY_URI = 'mongodb://127.0.0.1:27017/GreenNest';
const TEST_URI = 'mongodb://127.0.0.1:27017/GreenNestTest';

test('test database guard accepts only a distinct local GreenNestTest URI', () => {
  assert.equal(validateTestDatabaseUri(PRIMARY_URI, TEST_URI), TEST_URI);
  assert.equal(
    validateTestDatabaseUri('mongodb://localhost:27017/GreenNest', 'mongodb://localhost:27017/GreenNestTest'),
    'mongodb://localhost:27017/GreenNestTest'
  );
});

test('test database guard rejects missing and Atlas URIs', () => {
  assert.throws(() => validateTestDatabaseUri(PRIMARY_URI, ''), /MONGO_TEST_URI is required/);
  assert.throws(
    () => validateTestDatabaseUri(PRIMARY_URI, 'mongodb+srv://user:pass@cluster0.example.mongodb.net/GreenNestTest'),
    /local MongoDB/
  );
});

test('test database guard rejects remote MongoDB hosts', () => {
  assert.throws(
    () => validateTestDatabaseUri(PRIMARY_URI, 'mongodb://192.168.1.50:27017/GreenNestTest'),
    /loopback host/
  );
});

test('test database guard rejects production and wrongly named test databases', () => {
  assert.throws(
    () => validateTestDatabaseUri(PRIMARY_URI, 'mongodb://localhost:27017/GreenNest'),
    /GreenNestTest/
  );
  assert.throws(
    () => validateTestDatabaseUri(PRIMARY_URI, 'mongodb://localhost:27017/OtherTest'),
    /GreenNestTest/
  );
});

test('test database guard rejects a test URI identical to the runtime URI', () => {
  assert.throws(() => validateTestDatabaseUri(PRIMARY_URI, PRIMARY_URI), /must not match MONGO_URI/);
});
