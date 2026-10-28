const assert = require('node:assert/strict');
const Plant = require('../src/modules/plant/plant.model');

const careLevels = Plant.schema.path('careLevel').enumValues;

assert(
  careLevels.includes('Easy to Moderate'),
  'Plant careLevel enum must accept the supported API value'
);

console.log('Plant schema accepts the supported care-level values');
