/**
 * GreenNest Collection Service
 * 
 * Manages:
 * 1. Gallery Likes (key: greenNest_gallery_likes)
 * 2. User Collections (key: greenNest_user_collections)
 * 
 * Pure vanilla JavaScript with localStorage and graceful edge-case handling.
 */

import { CANONICAL_PLANT_SLUGS } from '../data/botanicalSpecimens.js';

export const STORAGE_KEYS = {
  GALLERY_LIKES: 'greenNest_gallery_likes',
  USER_COLLECTIONS: 'greenNest_user_collections'
};

const DEFAULT_SLUGS = Array.isArray(CANONICAL_PLANT_SLUGS) && CANONICAL_PLANT_SLUGS.length > 0
  ? CANONICAL_PLANT_SLUGS
  : [
      'monstera-deliciosa',
      'sansevieria-trifasciata',
      'ficus-lyrata',
      'calathea-orbifolia',
      'lavandula-angustifolia',
      'epipremnum-aureum',
      'zamioculcas-zamiifolia',
      'spathiphyllum',
      'chlorophytum-comosum',
      'ficus-elastica',
      'philodendron-birkin',
      'alocasia-amazonica',
      'crassula-ovata',
      'strelitzia-reginae',
      'nephrolepis-exaltata',
      'senecio-rowleyanus',
      'hedera-helix',
      'aspidistra-elatior',
      'anthurium-andraeanum',
      'aloe-vera'
    ];

// Helper: Safe localStorage reader
const safeGetItem = (key) => {
  try {
    if (typeof window === 'undefined' || !window.localStorage) return null;
    return window.localStorage.getItem(key);
  } catch (err) {
    console.warn(`[collectionService] Unable to read "${key}" from localStorage:`, err);
    return null;
  }
};

// Helper: Safe localStorage writer
const safeSetItem = (key, value) => {
  try {
    if (typeof window === 'undefined' || !window.localStorage) return false;
    window.localStorage.setItem(key, value);
    return true;
  } catch (err) {
    console.warn(`[collectionService] Unable to write "${key}" to localStorage:`, err);
    return false;
  }
};

// Helper: Normalize user email with 'guest' fallback
const getNormalizedEmail = (userEmail) => {
  if (!userEmail || typeof userEmail !== 'string') return 'guest';
  const trimmed = userEmail.trim();
  return trimmed.length > 0 ? trimmed.toLowerCase() : 'guest';
};

// Helper: Generate random integer between min and max (inclusive)
const getRandomCount = (min = 18, max = 145) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// ==========================================
// 1. GALLERY LIKES
// ==========================================

/**
 * Returns the full gallery likes object from localStorage.
 * Format: { [plantSlug]: { likesCount: number, likedBy: string[] } }
 */
export const getGalleryLikes = () => {
  const raw = safeGetItem(STORAGE_KEYS.GALLERY_LIKES);
  if (!raw) return {};
  try {
    const parsed = JSON.parse(raw);
    if (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) {
      return parsed;
    }
  } catch (err) {
    console.error('[collectionService] Error parsing gallery likes JSON:', err);
  }
  return {};
};

/**
 * Saves gallery likes object to localStorage and notifies listeners.
 */
const saveGalleryLikes = (likesObj) => {
  const success = safeSetItem(STORAGE_KEYS.GALLERY_LIKES, JSON.stringify(likesObj));
  if (success && typeof window !== 'undefined' && typeof window.dispatchEvent === 'function') {
    try {
      window.dispatchEvent(new CustomEvent('greenNest_likes_updated', { detail: likesObj }));
    } catch (_) {}
  }
  return success;
};

/**
 * Initialize likes for all 20 plants with random counts (18-145) if not already initialized.
 * Store as { [slug]: { likesCount: Number, likedBy: [email] } }
 */
export const initGalleryLikes = (canonicalSlugs) => {
  const slugsToInit = Array.isArray(canonicalSlugs) && canonicalSlugs.length > 0
    ? canonicalSlugs
    : DEFAULT_SLUGS;

  const currentLikes = getGalleryLikes();
  let updated = false;

  for (const slug of slugsToInit) {
    if (!slug) continue;
    if (!currentLikes[slug] || typeof currentLikes[slug] !== 'object') {
      currentLikes[slug] = {
        likesCount: getRandomCount(18, 145),
        likedBy: []
      };
      updated = true;
    } else {
      // Validate existing item structure
      if (typeof currentLikes[slug].likesCount !== 'number') {
        currentLikes[slug].likesCount = getRandomCount(18, 145);
        updated = true;
      }
      if (!Array.isArray(currentLikes[slug].likedBy)) {
        currentLikes[slug].likedBy = [];
        updated = true;
      }
    }
  }

  if (updated || !safeGetItem(STORAGE_KEYS.GALLERY_LIKES)) {
    saveGalleryLikes(currentLikes);
  }

  return currentLikes;
};

/**
 * Toggle like/unlike for a plant.
 * Returns updated { likesCount, isLiked }
 */
export const toggleLikePlant = (userEmail, plantSlug) => {
  if (!plantSlug) {
    return { likesCount: 0, isLiked: false };
  }

  const email = getNormalizedEmail(userEmail);
  const slug = String(plantSlug).trim();
  const likesMap = getGalleryLikes();

  if (!likesMap[slug] || typeof likesMap[slug] !== 'object') {
    likesMap[slug] = {
      likesCount: 0,
      likedBy: []
    };
  } else {
    if (typeof likesMap[slug].likesCount !== 'number') {
      likesMap[slug].likesCount = 0;
    }
    if (!Array.isArray(likesMap[slug].likedBy)) {
      likesMap[slug].likedBy = [];
    }
  }

  const likedBy = likesMap[slug].likedBy;
  const index = likedBy.indexOf(email);
  let isLiked = false;

  if (index > -1) {
    likedBy.splice(index, 1);
    likesMap[slug].likesCount = Math.max(0, likesMap[slug].likesCount - 1);
    isLiked = false;
  } else {
    likedBy.push(email);
    likesMap[slug].likesCount = likesMap[slug].likesCount + 1;
    isLiked = true;
  }

  saveGalleryLikes(likesMap);

  return {
    likesCount: likesMap[slug].likesCount,
    isLiked
  };
};

/**
 * Check if a plant is liked by the user.
 * Returns boolean.
 */
export const isPlantLiked = (userEmail, plantSlug) => {
  if (!plantSlug) return false;
  const email = getNormalizedEmail(userEmail);
  const slug = String(plantSlug).trim();
  const likesMap = getGalleryLikes();
  const item = likesMap[slug];

  if (!item || !Array.isArray(item.likedBy)) {
    return false;
  }

  return item.likedBy.includes(email);
};

/**
 * Return current likes count for a plant.
 * Returns number.
 */
export const getLikesCount = (plantSlug) => {
  if (!plantSlug) return 0;
  const slug = String(plantSlug).trim();
  const likesMap = getGalleryLikes();
  const item = likesMap[slug];

  if (!item || typeof item.likesCount !== 'number') {
    return 0;
  }

  return item.likesCount;
};


// ==========================================
// 2. USER COLLECTIONS
// ==========================================

/**
 * Read the full collections dictionary from localStorage.
 * Format: { [userEmail]: Array<Collection> }
 */
const getAllCollectionsMap = () => {
  const raw = safeGetItem(STORAGE_KEYS.USER_COLLECTIONS);
  if (!raw) return {};
  try {
    const parsed = JSON.parse(raw);
    if (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) {
      return parsed;
    }
    if (Array.isArray(parsed)) {
      const map = {};
      parsed.forEach((col) => {
        const u = getNormalizedEmail(col?.userEmail || 'guest');
        if (!map[u]) map[u] = [];
        map[u].push(col);
      });
      return map;
    }
  } catch (err) {
    console.error('[collectionService] Error parsing user collections JSON:', err);
  }
  return {};
};

/**
 * Save the collections map back to localStorage and notify listeners.
 */
const saveAllCollectionsMap = (map) => {
  const success = safeSetItem(STORAGE_KEYS.USER_COLLECTIONS, JSON.stringify(map));
  if (success && typeof window !== 'undefined' && typeof window.dispatchEvent === 'function') {
    try {
      window.dispatchEvent(new CustomEvent('greenNest_collections_updated', { detail: map }));
    } catch (_) {}
  }
  return success;
};

/**
 * Get all collections for a user.
 * If none exist, create a default collection named 'My Living Sanctuary'
 * with description 'Default curated botanical collection' and empty plantSlugs.
 */
export const getUserCollections = (userEmail) => {
  const email = getNormalizedEmail(userEmail);
  const map = getAllCollectionsMap();
  const userList = map[email];

  if (Array.isArray(userList) && userList.length > 0) {
    return userList.map((col) => ({
      ...col,
      plantSlugs: Array.isArray(col.plantSlugs) ? col.plantSlugs : []
    }));
  }

  // Create default collection if none exist
  const now = new Date().toISOString();
  const defaultCol = {
    id: `ucol_${Date.now()}`,
    name: 'My Living Sanctuary',
    description: 'Default curated botanical collection',
    plantSlugs: [],
    createdAt: now,
    updatedAt: now,
    userEmail: email
  };

  map[email] = [defaultCol];
  saveAllCollectionsMap(map);

  return [defaultCol];
};

/**
 * Create a new collection for a user.
 * Generate ID as `ucol_` + timestamp.
 * Set createdAt/updatedAt.
 * If initialPlantSlug provided, add it to plantSlugs.
 */
export const createUserCollection = (userEmail, { name, description, initialPlantSlug } = {}) => {
  const email = getNormalizedEmail(userEmail);
  const currentCollections = getUserCollections(email);

  const now = new Date().toISOString();
  let generatedId = `ucol_${Date.now()}`;
  if (currentCollections.some((c) => c && c.id === generatedId)) {
    generatedId = `ucol_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
  }

  const plantSlugs = [];
  if (initialPlantSlug && typeof initialPlantSlug === 'string' && initialPlantSlug.trim()) {
    plantSlugs.push(initialPlantSlug.trim());
  }

  const newCol = {
    id: generatedId,
    name: (name && typeof name === 'string' && name.trim()) || 'Untitled Collection',
    description: (description && typeof description === 'string' && description.trim()) || '',
    plantSlugs,
    createdAt: now,
    updatedAt: now,
    userEmail: email
  };

  const updatedCollections = [...currentCollections, newCol];
  const map = getAllCollectionsMap();
  map[email] = updatedCollections;
  saveAllCollectionsMap(map);

  return newCol;
};

/**
 * Update name/description of an existing collection.
 * Update updatedAt.
 */
export const updateUserCollection = (userEmail, collectionId, { name, description } = {}) => {
  if (!collectionId) return null;
  const email = getNormalizedEmail(userEmail);
  const currentCollections = getUserCollections(email);

  const targetIndex = currentCollections.findIndex((c) => c && c.id === collectionId);
  if (targetIndex === -1) {
    return null;
  }

  const col = { ...currentCollections[targetIndex] };
  if (name !== undefined && typeof name === 'string') {
    col.name = name.trim();
  }
  if (description !== undefined && typeof description === 'string') {
    col.description = description.trim();
  }
  col.updatedAt = new Date().toISOString();

  currentCollections[targetIndex] = col;
  const map = getAllCollectionsMap();
  map[email] = currentCollections;
  saveAllCollectionsMap(map);

  return col;
};

/**
 * Delete a collection by ID.
 * Returns boolean indicating success.
 */
export const deleteUserCollection = (userEmail, collectionId) => {
  if (!collectionId) return false;
  const email = getNormalizedEmail(userEmail);
  const currentCollections = getUserCollections(email);

  const initialLength = currentCollections.length;
  const remaining = currentCollections.filter((c) => c && c.id !== collectionId);

  if (remaining.length === initialLength) {
    return false;
  }

  const map = getAllCollectionsMap();
  map[email] = remaining;
  saveAllCollectionsMap(map);

  return true;
};

/**
 * Add/remove a plant slug from a collection.
 * Return updated collection (or null if collection not found).
 */
export const togglePlantInCollection = (userEmail, collectionId, plantSlug) => {
  if (!collectionId || !plantSlug) return null;
  const email = getNormalizedEmail(userEmail);
  const currentCollections = getUserCollections(email);

  const targetIndex = currentCollections.findIndex((c) => c && c.id === collectionId);
  if (targetIndex === -1) {
    return null;
  }

  const col = { ...currentCollections[targetIndex] };
  const slug = String(plantSlug).trim();

  const currentSlugs = Array.isArray(col.plantSlugs) ? [...col.plantSlugs] : [];
  const slugIndex = currentSlugs.indexOf(slug);

  if (slugIndex > -1) {
    currentSlugs.splice(slugIndex, 1);
  } else {
    currentSlugs.push(slug);
  }

  col.plantSlugs = currentSlugs;
  col.updatedAt = new Date().toISOString();

  currentCollections[targetIndex] = col;
  const map = getAllCollectionsMap();
  map[email] = currentCollections;
  saveAllCollectionsMap(map);

  return col;
};

/**
 * Return array of collection IDs that contain this plant.
 */
export const getCollectionsContainingPlant = (userEmail, plantSlug) => {
  if (!plantSlug) return [];
  const email = getNormalizedEmail(userEmail);
  const collections = getUserCollections(email);
  const slug = String(plantSlug).trim();

  return collections
    .filter((c) => Array.isArray(c.plantSlugs) && c.plantSlugs.includes(slug))
    .map((c) => c.id);
};

// Default export object containing all service functions
const collectionService = {
  // Constants
  STORAGE_KEYS,

  // Gallery Likes
  initGalleryLikes,
  getGalleryLikes,
  toggleLikePlant,
  isPlantLiked,
  getLikesCount,

  // User Collections
  getUserCollections,
  createUserCollection,
  updateUserCollection,
  deleteUserCollection,
  togglePlantInCollection,
  getCollectionsContainingPlant
};

export default collectionService;
