import galleryData from './gallery.json';

// Build botanical specimens dictionary directly from gallery.json as single source of truth
export const BOTANICAL_SPECIMENS = galleryData.reduce((acc, item, idx) => {
  const id = `specimen_${idx}`;
  acc[id] = {
    id,
    index: idx,
    name: item.alt ? item.alt.split(' in ')[0].split(' with ')[0].trim() : `Botanical Specimen ${idx + 1}`,
    scientificName: item.caption || item.alt || 'Rare Botanical Cultivar',
    image: item.imageUrl,
    imageUrl: item.imageUrl,
    caption: item.caption,
    alt: item.alt,
    credit: item.credit || 'Pinterest',
    tags: ['#specimen', '#botany', '#herbarium']
  };
  return acc;
}, {});

export const SPECIMEN_KEYS = Object.keys(BOTANICAL_SPECIMENS);

export const STARRED_STORAGE_PREFIX = 'livingCanopyStarred_';
export const GARDEN_STORAGE_PREFIX = 'livingCanopyGarden_';

// Helper to get active logged-in user (excludes admin, since admin cannot have personal garden/gallery)
export function getActiveUser() {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem('livingCanopyUser');
    if (raw) {
      const u = JSON.parse(raw);
      if (u && u.role !== 'admin') {
        return u;
      }
    }
  } catch {}
  return null;
}

export function getAccountStarredKey(userId) {
  const uid = userId || getActiveUser()?.id;
  return uid ? `${STARRED_STORAGE_PREFIX}${uid}` : null;
}

export function getAccountGardenKey(userId) {
  const uid = userId || getActiveUser()?.id;
  return uid ? `${GARDEN_STORAGE_PREFIX}${uid}` : null;
}

export function getStarredPlantIds(userId) {
  if (typeof window === 'undefined') return [];
  const key = getAccountStarredKey(userId);
  if (!key) return []; // Strictly tied to user accounts
  const stored = localStorage.getItem(key);
  if (!stored) return [];
  try {
    const parsed = JSON.parse(stored);
    return Array.isArray(parsed) ? parsed : [];
  } catch (e) {
    return [];
  }
}

export function setStarredPlantIds(userIdOrIds, maybeIds) {
  if (typeof window === 'undefined') return;
  let uid = null;
  let ids = [];
  if (Array.isArray(userIdOrIds)) {
    ids = userIdOrIds;
    uid = getActiveUser()?.id;
  } else {
    uid = userIdOrIds;
    ids = maybeIds || [];
  }
  const key = getAccountStarredKey(uid);
  if (!key) return;
  localStorage.setItem(key, JSON.stringify(ids));
}

export function toggleStarredPlant(userIdOrPlantId, maybePlantId) {
  let uid = null;
  let plantId = null;
  if (maybePlantId !== undefined) {
    uid = userIdOrPlantId;
    plantId = maybePlantId;
  } else {
    uid = getActiveUser()?.id;
    plantId = userIdOrPlantId;
  }
  if (!uid || !plantId) return [];

  const current = getStarredPlantIds(uid);
  let updated;
  if (current.includes(plantId)) {
    updated = current.filter(id => id !== plantId);
  } else {
    updated = [...current, plantId];
  }
  setStarredPlantIds(uid, updated);
  return updated;
}

export function getGardenPlantIds(userId) {
  if (typeof window === 'undefined') return [];
  const key = getAccountGardenKey(userId);
  if (!key) return []; // Strictly tied to user accounts
  const stored = localStorage.getItem(key);
  if (!stored) return [];
  try {
    const parsed = JSON.parse(stored);
    return Array.isArray(parsed) ? parsed : [];
  } catch (e) {
    return [];
  }
}

export function setGardenPlantIds(userIdOrIds, maybeIds) {
  if (typeof window === 'undefined') return;
  let uid = null;
  let ids = [];
  if (Array.isArray(userIdOrIds)) {
    ids = userIdOrIds;
    uid = getActiveUser()?.id;
  } else {
    uid = userIdOrIds;
    ids = maybeIds || [];
  }
  const key = getAccountGardenKey(uid);
  if (!key) return;
  localStorage.setItem(key, JSON.stringify(ids));
}

export function toggleGardenPlant(userIdOrPlantId, maybePlantId) {
  let uid = null;
  let plantId = null;
  if (maybePlantId !== undefined) {
    uid = userIdOrPlantId;
    plantId = maybePlantId;
  } else {
    uid = getActiveUser()?.id;
    plantId = userIdOrPlantId;
  }
  if (!uid || !plantId) return [];

  const current = getGardenPlantIds(uid);
  let updated;
  if (current.includes(plantId)) {
    updated = current.filter(id => id !== plantId);
  } else {
    updated = [...current, plantId];
  }
  setGardenPlantIds(uid, updated);
  return updated;
}
