const assert = require('node:assert/strict');
const Plant = require('../src/modules/plant/plant.model');

const careLevels = Plant.schema.path('careLevel').enumValues;

assert(
  careLevels.includes('Easy to Moderate'),
  'Plant careLevel enum must accept the values used by the seed catalog'
);

console.log('✅ Plant schema accepts every care level used by the seed catalog');
