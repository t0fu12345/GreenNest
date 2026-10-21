const fs = require('fs');
const path = require('path');

const plantsPath = path.join(__dirname, 'database', 'seedData', 'plants.json');
const colsPath = path.join(__dirname, 'database', 'seedData', 'plantCollections.json');
const destPath = path.join(__dirname, 'frontend', 'src', 'data', 'botanicalSpecimens.js');

const plants = JSON.parse(fs.readFileSync(plantsPath, 'utf8'));
const cols = JSON.parse(fs.readFileSync(colsPath, 'utf8'));

const biomeMap = {
  'Aroid': { biome: 'tropical', label: 'Tropical Rainforest' },
  'Rose': { biome: 'temperate', label: 'Temperate Garden' },
  'Bromeliad': { biome: 'tropical', label: 'Tropical Canopy' },
  'Fern': { biome: 'subtropical', label: 'Humid Understory' },
  'Sansevieria': { biome: 'arid', label: 'Arid & Desert' },
  'Succulent': { biome: 'arid', label: 'Arid & Desert' },
  'Ficus': { biome: 'tropical', label: 'Tropical Forest' },
  'Spathiphyllum': { biome: 'tropical', label: 'Understory Rainforest' },
  'Epipremnum': { biome: 'tropical', label: 'Tropical Rainforest' },
  'Calathea': { biome: 'tropical', label: 'Tropical Floor' },
  'Alocasia': { biome: 'tropical', label: 'Tropical Rainforest' },
  'Chlorophytum': { biome: 'subtropical', label: 'Subtropical Grassland' },
  'Strelitzia': { biome: 'tropical', label: 'Subtropical Coast' },
  'Anthurium': { biome: 'tropical', label: 'Tropical Lithophyte' },
  'Philodendron': { biome: 'tropical', label: 'Tropical Rainforest' },
  'Crassula': { biome: 'arid', label: 'Arid Karoo' },
  'Hedera': { biome: 'temperate', label: 'Temperate Woodland' },
  'Echeveria': { biome: 'arid', label: 'Arid Semi-Desert' }
};

const transformed = {};

plants.forEach((p, idx) => {
  const num = String(idx + 1).padStart(3, '0');
  const catalogCode = p.catalogCode || ('CANOPY-' + num);
  const bInfo = biomeMap[p.category] || { biome: p.biome || 'tropical', label: p.biomeLabel || 'Tropical Biome' };
  
  let toxicityText = 'Non-Toxic (Pet Safe)';
  if (p.toxicity) {
    if (typeof p.toxicity === 'string') {
      toxicityText = p.toxicity;
    } else if (p.toxicity.isToxicToPets) {
      toxicityText = 'Pet Caution (' + (p.toxicity.details || 'Contains oxalates') + ')';
    }
  }

  const primaryImg = p.images?.hero || (Array.isArray(p.images) ? p.images.find(img => img.isPrimary)?.url || p.images[0]?.url : '') || '';
  const galleryImgs = Array.isArray(p.images?.gallery) ? p.images.gallery : (Array.isArray(p.images) ? p.images.map(img => typeof img === 'string' ? img : img.url) : []);

  const tags = (p.tags || []).map(t => t.startsWith('#') ? t : '#' + t.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(''));
  if (p.category && !tags.includes('#' + p.category)) {
    tags.push('#' + p.category.charAt(0).toUpperCase() + p.category.slice(1));
  }

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
    images: galleryImgs.length > 0 ? galleryImgs : [primaryImg],
    tags,
    taxonomyTags: p.taxonomyTags || [p.category, (p.scientificName || '').split(' ')[0], 'Plantae'],
    traits: p.traits || [
      p.careLevel ? p.careLevel.toUpperCase() + ' Maintenance' : 'Adaptive',
      'Filtered Sunlight',
      'Evergreen Perennial'
    ],
    shortDesc: p.shortDesc || p.description,
    description: p.description,
    origin: p.origin || 'Tropical and Subtropical Regions',
    purpose: p.purpose || 'Purifies indoor air and anchors modern biophilic interiors.',
    water: p.watering || 'Water thoroughly when topsoil dries.',
    light: p.light || 'Abundant filtered indirect sunlight.',
    soil: p.soil || 'Well-draining, nutrient-rich aerated substrate.',
    humidity: p.humidity || '55% – 75%',
    temp: p.temp || '18°C – 28°C',
    growth: p.growth || 'Moderate Growth',
    careLevel: p.careLevel || 'Moderate',
    toxicity: toxicityText,
    waterDaily: p.telemetry?.waterDaily || '350 ml / 7 Days',
    waterStatus: p.telemetry?.waterStatus || 'Balanced',
    notifMsg: p.name + ' is maintaining optimal hydration and metabolic vitality.',
    waterVal: p.telemetry?.waterVal || '350 ml',
    waterBar: p.telemetry?.waterBar || '80%',
    waterSub: p.telemetry?.waterSub || 'Balanced root zone hydration.',
    waterVol: p.telemetry?.waterVal || '350 ml',
    waterFreq: p.telemetry?.waterFreq || 'Every 7-10 days',
    humidityVal: p.telemetry?.humidityVal || '65% RH',
    humidityBar: p.telemetry?.humidityBar || '80%',
    humiditySub: p.telemetry?.humiditySub || 'Leaf transpiration rate maintaining natural equilibrium.',
    humidityTarget: p.telemetry?.humidityTarget || '60% – 80% RH',
    mistCadence: p.telemetry?.mistCadence || 'Foliage misting every 3-4 days',
    envVal: p.telemetry?.envVal || '1,500 FC',
    envBar: p.telemetry?.envBar || '85%',
    envSub: p.telemetry?.envSub || 'Calibrated lighting spectrum.',
    tempRange: p.telemetry?.tempRange || '18°C min night / 28°C max day',
    soilVal: p.telemetry?.soilVal || 'Airy Aroid Blend',
    soilBar: p.telemetry?.soilBar || '85%',
    soilSub: p.telemetry?.soilSub || 'Pot equipped with adequate drainage hole.',
    status: p.status || 'published'
  };

  transformed[p.slug] = item;
});

// Backward-compatibility legacy aliases
transformed['specimen-monstera'] = transformed['monstera-deliciosa'];
transformed['specimen-red-rose'] = transformed['red-heritage-rose'] || transformed['monstera-deliciosa'];
transformed['specimen-snake-plant'] = transformed['snake-plant-laurentii'] || transformed['monstera-deliciosa'];
transformed['specimen-fiddle-leaf'] = transformed['fiddle-leaf-fig'] || transformed['monstera-deliciosa'];
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
// Contains all 20 standardized botanical specimens + 4 curated living collections

export const PLANT_COLLECTIONS = ${JSON.stringify(cols, null, 2)};

export const BOTANICAL_SPECIMENS = ${JSON.stringify(transformed, null, 2)};

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
    const initial = ['monstera-deliciosa', 'snake-plant-laurentii'];
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
  if (typeof window === 'undefined') return ['monstera-deliciosa', 'fiddle-leaf-fig'];
  const stored = localStorage.getItem(GARDEN_STORAGE_KEY);
  if (stored === null) {
    const initial = ['monstera-deliciosa', 'fiddle-leaf-fig'];
    localStorage.setItem(GARDEN_STORAGE_KEY, JSON.stringify(initial));
    return initial;
  }
  try {
    const parsed = JSON.parse(stored);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : ['monstera-deliciosa', 'fiddle-leaf-fig'];
  } catch (e) {
    return ['monstera-deliciosa', 'fiddle-leaf-fig'];
  }
}

export function setGardenPlantIds(ids) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(GARDEN_STORAGE_KEY, JSON.stringify(ids));
}
`;

fs.writeFileSync(destPath, fileContent, 'utf8');
console.log('Synchronized ' + plants.length + ' plants and ' + cols.length + ' collections to ' + destPath);
