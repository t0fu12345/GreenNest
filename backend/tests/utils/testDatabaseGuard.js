const LOOPBACK_HOSTS = new Set(['127.0.0.1', 'localhost', '[::1]']);

const parseLocalUri = (uri, variableName) => {
  if (!uri?.trim()) throw new Error(`${variableName} is required`);
  let parsed;
  try {
    parsed = new URL(uri);
  } catch {
    throw new Error(`${variableName} must be a valid local MongoDB URI`);
  }
  if (parsed.protocol !== 'mongodb:') {
    throw new Error(`${variableName} must point to local MongoDB`);
  }
  if (!LOOPBACK_HOSTS.has(parsed.hostname.toLowerCase())) {
    throw new Error(`${variableName} must use a loopback host`);
  }
  return parsed;
};

const validateTestDatabaseUri = (primaryUri, testUri) => {
  const parsedPrimaryUri = parseLocalUri(primaryUri, 'MONGO_URI');
  const parsedTestUri = parseLocalUri(testUri, 'MONGO_TEST_URI');
  if (testUri === primaryUri) throw new Error('MONGO_TEST_URI must not match MONGO_URI');
  if (parsedPrimaryUri.pathname !== '/GreenNest') {
    throw new Error('MONGO_URI must use the GreenNest database');
  }
  if (parsedTestUri.pathname !== '/GreenNestTest') {
    throw new Error('MONGO_TEST_URI must use the GreenNestTest database');
  }
  return testUri;
};

module.exports = { validateTestDatabaseUri };
