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
    scientificName: p.scientificName || p.botanicalName || '',
    category: p.category,
    biome: bInfo.biome,
    biomeLabel: bInfo.label,
    image: primaryImg,
    images: imageArray,
    tags,
    taxonomyTags: p.taxonomyTags || [p.category, (p.scientificName || p.botanicalName || '').split(' ')[0], 'Plantae'].filter(Boolean),
    traits: [
      p.careLevel ? p.careLevel.toUpperCase() + ' Maintenance' : 'Adaptive',
      'Filtered Sunlight',
      p.guide?.growthHabit ? p.guide.growthHabit.split('.')[0] : 'Perennial'
    ],
    shortDesc: p.shortDesc || p.description,
    description: p.description,
    origin: p.origin || 'Tropical and Subtropical Regions',
    purpose: p.purpose || 'Air-purifying botanical specimen for modern biophilic interiors.',
    water: p.watering || p.guide?.watering || 'Water thoroughly when the topsoil dries.',
    light: p.light || 'Abundant filtered indirect sunlight.',
    soil: p.soil || p.guide?.soil || 'Well-draining, nutrient-rich aerated substrate.',
    humidity: p.humidity || '55% – 75%',
    temp: p.temp || '18°C – 28°C',
    growth: p.growth || 'Moderate Growth',
    careLevel: p.careLevel || p.difficulty || 'Moderate',
    toxicity: toxicityText,
    waterDaily: p.telemetry?.waterDaily || waterDailyMap[p.water] || '350 ml / 7 Days',
    waterStatus: p.telemetry?.waterStatus || 'Balanced',
    notifMsg: p.name + ' is maintaining optimal hydration and metabolic vitality.',
    waterVal: p.telemetry?.waterVal || '350 ml',
    waterBar: p.telemetry?.waterBar || '80%',
    waterSub: p.telemetry?.waterSub || 'Balanced root zone hydration.',
    waterVol: p.telemetry?.waterVal || '350 ml',
    waterFreq: p.telemetry?.waterFreq || 'Every 7-10 days',
    humidityVal: p.telemetry?.humidityVal || '65% RH',
    humidityBar: p.telemetry?.humidityBar || '80%',
    humiditySub: p.telemetry?.humiditySub || 'Leaf transpiration is maintaining a natural equilibrium.',
    humidityTarget: p.telemetry?.humidityTarget || '55% – 80% RH',
    mistCadence: p.telemetry?.mistCadence || 'Mist foliage every 3-4 days',
    envVal: p.telemetry?.envVal || '1,500 FC',
    envBar: p.telemetry?.envBar || '85%',
    envSub: p.telemetry?.envSub || 'Calibrated lighting spectrum.',
    tempRange: p.telemetry?.tempRange || '18°C minimum night / 28°C maximum day',
    soilVal: p.telemetry?.soilVal || 'Airy Aroid Blend',
    soilBar: p.telemetry?.soilBar || '85%',
    soilSub: p.telemetry?.soilSub || 'Container with adequate drainage.',
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
transformed['specimen-peace-lily'] = transformed['peace-lily-spathiphyllum'] || transformed['monstera-deliciosa'];
transformed['specimen-boston-fern'] = transformed['boston-fern'] || transformed['monstera-deliciosa'];
transformed['specimen-spider-plant'] = transformed['spider-plant-variegated'] || transformed['monstera-deliciosa'];
transformed['specimen-zz-plant'] = transformed['zz-plant-zamioculcas'] || transformed['monstera-deliciosa'];
transformed['specimen-pothos'] = transformed['golden-pothos'] || transformed['monstera-deliciosa'];
transformed['specimen-rubber-tree'] = transformed['rubber-tree-burgundy'] || transformed['monstera-deliciosa'];
transformed['specimen-calathea'] = transformed['calathea-orbifolia'] || transformed['monstera-deliciosa'];
transformed['specimen-alocasia-amazonica'] = transformed['alocasia-amazonica'] || transformed['monstera-deliciosa'];
transformed['specimen-anthurium'] = transformed['anthurium-clarinervium'] || transformed['monstera-deliciosa'];
transformed['specimen-bird-of-paradise'] = transformed['bird-of-paradise-strelitzia'] || transformed['monstera-deliciosa'];
transformed['specimen-jade-plant'] = transformed['jade-plant-crassula-ovata'] || transformed['monstera-deliciosa'];
transformed['specimen-echeveria'] = transformed['echeveria-elegans'] || transformed['monstera-deliciosa'];

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
