// Lightweight client-side JWT implementation adhering to RFC 7519 standard
// Generates standard header.payload.signature tokens with base64url encoding and expiration checking

const DEFAULT_SECRET = 'green_nest_botanical_jwt_secret_2026';

// Base64Url encoding/decoding
export const base64UrlEncode = (str) => {
  const base64 = btoa(unescape(encodeURIComponent(typeof str === 'object' ? JSON.stringify(str) : str)));
  return base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
};

export const base64UrlDecode = (str) => {
  let base64 = str.replace(/-/g, '+').replace(/_/g, '/');
  while (base64.length % 4) {
    base64 += '=';
  }
  try {
    const jsonStr = decodeURIComponent(escape(atob(base64)));
    try {
      return JSON.parse(jsonStr);
    } catch {
      return jsonStr;
    }
  } catch (err) {
    return null;
  }
};

// Simple pseudo-HMAC signature for client-side demo
const generateSignature = (headerB64, payloadB64, secret) => {
  const input = `${headerB64}.${payloadB64}.${secret}`;
  let hash = 0;
  for (let i = 0; i < input.length; i++) {
    const char = input.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash |= 0; // Convert to 32bit integer
  }
  return base64UrlEncode(`sig_gn_${Math.abs(hash).toString(16)}_${secret.slice(0, 8)}`);
};

/**
 * Generate a JWT token
 * @param {Object} payload 
 * @param {number} expiresInSec - Default 7 days
 * @param {string} secret 
 * @returns {string} token
 */
export const signJwt = (payload, expiresInSec = 7 * 86400, secret = DEFAULT_SECRET) => {
  const header = {
    alg: 'HS256',
    typ: 'JWT'
  };

  const now = Math.floor(Date.now() / 1000);
  const fullPayload = {
    ...payload,
    iat: now,
    exp: now + expiresInSec,
    iss: 'greennest-auth-authority',
    aud: 'greennest-web-app'
  };

  const headerB64 = base64UrlEncode(header);
  const payloadB64 = base64UrlEncode(fullPayload);
  const signatureB64 = generateSignature(headerB64, payloadB64, secret);

  return `${headerB64}.${payloadB64}.${signatureB64}`;
};

/**
 * Verify and decode a JWT token
 * @param {string} token 
 * @param {string} secret 
 * @returns {Object} { valid: boolean, payload: Object|null, error: string|null }
 */
export const verifyJwt = (token, secret = DEFAULT_SECRET) => {
  if (!token || typeof token !== 'string') {
    return { valid: false, payload: null, error: 'No token provided' };
  }

  const parts = token.split('.');
  if (parts.length !== 3) {
    return { valid: false, payload: null, error: 'Invalid JWT format' };
  }

  const [headerB64, payloadB64, signatureB64] = parts;
  const expectedSig = generateSignature(headerB64, payloadB64, secret);

  if (signatureB64 !== expectedSig) {
    return { valid: false, payload: null, error: 'Signature verification failed' };
  }

  const payload = base64UrlDecode(payloadB64);
  if (!payload) {
    return { valid: false, payload: null, error: 'Malformed payload' };
  }

  // Check expiration
  const now = Math.floor(Date.now() / 1000);
  if (payload.exp && payload.exp < now) {
    return { valid: false, payload, error: 'Token has expired' };
  }

  return { valid: true, payload, error: null };
};

/**
 * Decode JWT without verifying signature (equivalent to jwt-decode)
 * @param {string} token 
 * @returns {Object|null}
 */
export const decodeJwt = (token) => {
  if (!token || typeof token !== 'string') return null;
  const parts = token.split('.');
  if (parts.length !== 3) return null;
  return {
    header: base64UrlDecode(parts[0]),
    payload: base64UrlDecode(parts[1]),
    rawSignature: parts[2]
  };
};
