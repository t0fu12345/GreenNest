const fs = require('fs');
const path = require('path');

const plantsPath = path.join(__dirname, 'database', 'seedData', 'plants.json');
const colsPath = path.join(__dirname, 'database', 'seedData', 'plantCollections.json');
const usersPath = path.join(__dirname, 'database', 'seedData', 'users.json');
const destPath = path.join(__dirname, 'frontend', 'src', 'data', 'botanicalSpecimens.js');

const plants = JSON.parse(fs.readFileSync(plantsPath, 'utf8'));
const cols = JSON.parse(fs.readFileSync(colsPath, 'utf8'));
const users = JSON.parse(fs.readFileSync(usersPath, 'utf8'));

const biomeMap = {
  'foliage': { biome: 'tropical', label: 'Tropical Biome' },
  'tree': { biome: 'tropical', label: 'Tropical Rainforest' },
  'succulent': { biome: 'arid', label: 'Arid & Desert' },
  'herb': { biome: 'subtropical', label: 'Subtropical Highlands' },
  'flower': { biome: 'subtropical', label: 'Subtropical Highlands' }
};

const transformed = {};

plants.forEach((p, idx) => {
  const num = String(idx + 1).padStart(3, '0');
  const catalogCode = 'CANOPY-' + num;
  const bInfo = biomeMap[p.category] || { biome: 'tropical', label: 'Tropical Biome' };
  
  let toxicityText = 'Non-Toxic (Pet Safe)';
  if (p.guide?.toxicityCaution?.pets === 'toxic') {
    toxicityText = 'Pet Caution (' + (p.guide.toxicityCaution.humans === 'irritant' ? 'Toxic to Pets / Irritant' : 'Toxic to Pets') + ')';
  } else if (p.guide?.toxicityCaution?.pets === 'caution') {
    toxicityText = 'Mild Caution';
  }

  let primaryImg = '';
  let imageArray = [];
  if (Array.isArray(p.images)) {
    primaryImg = p.images.find(img => img.isPrimary)?.url || p.images[0]?.url || '';
    imageArray = p.images;
  } else if (p.images && typeof p.images === 'object') {
    primaryImg = p.images.hero || p.images.gallery?.[0] || '';
    imageArray = [
      { url: p.images.hero, alt: p.name, isPrimary: true },
      ...(p.images.gallery || []).map((url, i) => ({ url, alt: `${p.name} view ${i+1}`, isPrimary: false }))
    ].filter(img => img.url);
  }
  if (!primaryImg && p.image) primaryImg = p.image;

  const tags = (p.tags || []).map(t => t.startsWith('#') ? t : '#' + t.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(''));
  if (p.category && !tags.includes('#' + p.category)) {
    tags.push('#' + p.category.charAt(0).toUpperCase() + p.category.slice(1));
  }

  const waterDailyMap = {
    'low': '150 ml / 14 Days',
    'moderate': '350 ml / 7 Days',
    'high': '500 ml / 3 Days'
  };

  const item = {
    id: p.slug,
    slug: p.slug,
    catalogCode,
    name: p.name,
    scientificName: p.scientificName || p.botanicalName,
    category: p.category,
    biome: bInfo.biome,
    biomeLabel: bInfo.label,
    image: primaryImg,
    images: imageArray,
    tags,
    taxonomyTags: [p.category, p.botanicalName.split(' ')[0], 'Plantae'],
    traits: [
      p.difficulty ? p.difficulty.toUpperCase() + ' Maintenance' : 'Adaptive',
      p.light ? p.light.replace('-', ' ').toUpperCase() : 'Indirect Sun',
      p.guide?.growthHabit ? p.guide.growthHabit.split('.')[0] : 'Perennial'
    ].slice(0, 4),
    shortDesc: p.description,
    origin: p.regions ? 'Growth Regions: ' + p.regions.map(r => r.charAt(0).toUpperCase() + r.slice(1)).join(', ') : 'Tropical & Subtropical Biomes',
    purpose: p.guide?.growthHabit || 'Air-purifying botanical specimen for modern biophilic interiors.',
    water: p.guide?.watering || 'Water moderately when upper soil layer is dry.',
    light: 'Light: ' + p.light + '. ' + (p.light === 'bright-indirect' ? 'Thrives in abundant bright indirect sunlight.' : p.light === 'low' ? 'Tolerates low light and shaded indoor spaces.' : 'Requires direct or high-intensity sunlight.'),
    soil: p.guide?.soil || 'Well-draining, nutrient-rich aerated substrate.',
    humidity: p.water === 'high' ? '70% – 90%' : p.water === 'moderate' ? '50% – 70%' : '30% – 50%',
    temp: '18°C – 28°C',
    growth: p.difficulty === 'easy' ? 'Vigorous / Easy Care' : (p.difficulty === 'hard' ? 'Demanding Care' : 'Moderate Care'),
    toxicity: toxicityText,
    waterDaily: waterDailyMap[p.water] || '350 ml / 7 Days',
    waterStatus: p.water === 'low' ? 'Drought-tolerant' : 'Optimal Hydration',
    notifMsg: p.name + ' is actively transpiring with stable metabolic balance.',
    waterVal: p.water === 'low' ? '150 ml' : p.water === 'high' ? '500 ml' : '350 ml',
    waterBar: p.water === 'low' ? '45%' : p.water === 'high' ? '92%' : '75%',
    waterSub: p.guide?.watering || 'Root zone moisture well balanced.',
    waterVol: p.water === 'low' ? '150 ml' : '350 ml',
    waterFreq: p.guide?.watering || 'Every 7-10 days',
    humidityVal: p.water === 'high' ? '78% RH' : '62% RH',
    humidityBar: p.water === 'high' ? '85%' : '68%',
    humiditySub: 'Steady foliar transpiration rate.',
    humidityTarget: '55% – 80% RH',
    mistCadence: p.category === 'succulent' ? 'No misting needed' : 'Mist foliage every 3-4 days',
    envVal: p.light === 'full-sun' ? '3,000 FC' : p.light === 'bright-indirect' ? '1,500 FC' : '800 FC',
    envBar: p.light === 'full-sun' ? '95%' : '80%',
    envSub: 'Standard spectrum intensity for ' + p.light,
    tempRange: '18°C minimum night / 28°C maximum day',
    soilVal: p.guide?.soil ? p.guide.soil.split(',')[0].slice(0, 24) : 'Rich organic loam',
    soilBar: '85%',
    soilSub: p.guide?.container || 'Container with excellent drainage.',
    guide: p.guide,
    seasons: p.seasons || [],
    lightRequirement: p.light,
    wateringFrequency: p.water,
    difficulty: p.difficulty,
    regions: p.regions || [],
    similarPlantSlugs: p.similarPlantSlugs || [],
    status: p.status || 'published'
  };

  transformed[p.slug] = item;
});

// Legacy aliases for backward compatibility with old mock IDs
transformed['specimen-monstera'] = transformed['monstera-deliciosa'];
transformed['specimen-red-rose'] = transformed['monstera-deliciosa'];
transformed['specimen-snake-plant'] = transformed['sansevieria-trifasciata'];
transformed['specimen-fiddle-leaf'] = transformed['ficus-lyrata'];

const fileContent = `// Comprehensive Botanical Specimens Seed Data from MongoDB Dataset
// Contains all 20 standardized botanical specimens + 4 seasonal curated collections + DB seed users

export const PLANT_COLLECTIONS = ${JSON.stringify(cols, null, 2)};

export const BOTANICAL_SPECIMENS = ${JSON.stringify(transformed, null, 2)};

export const DATABASE_USERS = ${JSON.stringify(users, null, 2)};

// List of canonical 20 plant slugs (excluding legacy aliases)
export const CANONICAL_PLANT_SLUGS = ${JSON.stringify(plants.map(p => p.slug), null, 2)};

// Primary specimen keys for navigation and pagination (20 unique specimens)
export const SPECIMEN_KEYS = CANONICAL_PLANT_SLUGS;

export const STARRED_STORAGE_KEY = 'livingCanopyStarredPlants';
export const GARDEN_STORAGE_KEY = 'livingCanopyGardenPlants';

export function getStarredPlantIds() {
  if (typeof window === 'undefined') return ['monstera-deliciosa'];
  const stored = localStorage.getItem(STARRED_STORAGE_KEY);
  if (stored === null) {
    const initial = ['monstera-deliciosa', 'sansevieria-trifasciata'];
    localStorage.setItem(STARRED_STORAGE_KEY, JSON.stringify(initial));
    return initial;
  }
  try {
    const parsed = JSON.parse(stored);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : ['monstera-deliciosa'];
  } catch (e) {
    return ['monstera-deliciosa'];
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
  if (typeof window === 'undefined') return ['monstera-deliciosa', 'ficus-lyrata'];
  const stored = localStorage.getItem(GARDEN_STORAGE_KEY);
  if (stored === null) {
    const initial = ['monstera-deliciosa', 'ficus-lyrata'];
    localStorage.setItem(GARDEN_STORAGE_KEY, JSON.stringify(initial));
    return initial;
  }
  try {
    const parsed = JSON.parse(stored);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : ['monstera-deliciosa', 'ficus-lyrata'];
  } catch (e) {
    return ['monstera-deliciosa', 'ficus-lyrata'];
  }
}

export function setGardenPlantIds(ids) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(GARDEN_STORAGE_KEY, JSON.stringify(ids));
}
`;

fs.writeFileSync(destPath, fileContent, 'utf8');
console.log('Synchronized ' + plants.length + ' plants, ' + cols.length + ' collections, and ' + users.length + ' DB users to ' + destPath);
