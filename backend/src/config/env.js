const path = require('node:path');
const dotenv = require('dotenv');

const loadEnvironment = ({
  envPath = path.join(__dirname, '../../.env'),
  environment = process.env
} = {}) => {
  const result = dotenv.config({ path: envPath, processEnv: environment });
  const isDevelopment = !environment.NODE_ENV || environment.NODE_ENV === 'development';
  const localGeminiKey = result.parsed?.GEMINI_API_KEY?.trim();

  // Local development should use the project's key rather than a stale shell key.
  // Keep deployed environment variables authoritative outside development.
  if (isDevelopment && localGeminiKey) {
    environment.GEMINI_API_KEY = localGeminiKey;
  }

  return result;
};

module.exports = loadEnvironment;
