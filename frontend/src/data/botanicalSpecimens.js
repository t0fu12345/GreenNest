export const BOTANICAL_SPECIMENS = {};

export const SPECIMEN_KEYS = Object.keys(BOTANICAL_SPECIMENS);

export const STARRED_STORAGE_KEY = 'livingCanopyStarredPlants';
export const GARDEN_STORAGE_KEY = 'livingCanopyGardenPlants';

export function getStarredPlantIds() {
  if (typeof window === 'undefined') return [];
  const stored = localStorage.getItem(STARRED_STORAGE_KEY);
  if (stored === null) {
    const initial = [];
    localStorage.setItem(STARRED_STORAGE_KEY, JSON.stringify(initial));
    return initial;
  }
  try {
    const parsed = JSON.parse(stored);
    return Array.isArray(parsed) ? parsed : [];
  } catch (e) {
    return [];
  }
}

export function setStarredPlantIds(ids) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STARRED_STORAGE_KEY, JSON.stringify(ids));
}

export function toggleStarredPlant(plantId) {
  const current = getStarredPlantIds();
  let updated;
  if (current.includes(plantId)) {
    updated = current.filter(id => id !== plantId);
  } else {
    updated = [...current, plantId];
  }
  setStarredPlantIds(updated);
  return updated;
}

export function getGardenPlantIds() {
  if (typeof window === 'undefined') return [];
  const stored = localStorage.getItem(GARDEN_STORAGE_KEY);
  if (stored === null) {
    const initial = [];
    localStorage.setItem(GARDEN_STORAGE_KEY, JSON.stringify(initial));
    return initial;
  }
  try {
    const parsed = JSON.parse(stored);
    return Array.isArray(parsed) ? parsed : [];
  } catch (e) {
    return [];
  }
}

export function setGardenPlantIds(ids) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(GARDEN_STORAGE_KEY, JSON.stringify(ids));
}
