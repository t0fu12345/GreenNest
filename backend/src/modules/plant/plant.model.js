const mongoose = require('mongoose');

const PlantSchema = new mongoose.Schema({
  specimenId: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  catalogCode: {
    type: String,
    trim: true
  },
  name: {
    type: String,
    required: [true, 'Plant common name is required'],
    trim: true
  },
  scientificName: {
    type: String,
    required: [true, 'Scientific botanical name is required'],
    trim: true
  },
  slug: {
    type: String,
    trim: true
  },
  category: {
    type: String,
    required: [true, 'Botanical category is required'],
    trim: true
  },
  biome: {
    type: String,
    enum: ['tropical', 'subtropical', 'arid', 'temperate'],
    required: [true, 'Growth biome environment is required']
  },
  biomeLabel: {
    type: String
  },
  shortDesc: {
    type: String
  },
  description: {
    type: String
  },
  origin: {
    type: String
  },
  purpose: {
    type: String
  },
  light: {
    type: String,
    required: [true, 'Light requirement is required']
  },
  watering: {
    type: String,
    required: [true, 'Watering requirement is required']
  },
  soil: {
    type: String
  },
  temp: {
    type: String
  },
  humidity: {
    type: String
  },
  growth: {
    type: String
  },
  careLevel: {
    type: String,
    enum: ['Easy', 'Easy to Moderate', 'Moderate', 'Challenging'],
    default: 'Easy'
  },
  toxicity: {
    isToxicToPets: {
      type: Boolean,
      default: false
    },
    details: {
      type: String
    }
  },
  // Telemetry metric indicators for live climate and sensor dashboard
  telemetry: {
    waterDaily: String,
    waterBar: String,
    waterVal: String,
    waterStatus: String,
    waterSub: String,
    waterFreq: String,
    humidityVal: String,
    humidityBar: String,
    humiditySub: String,
    humidityTarget: String,
    mistCadence: String,
    envVal: String,
    envBar: String,
    envSub: String,
    tempRange: String,
    soilVal: String,
    soilBar: String,
    soilSub: String
  },
  traits: [{
    type: String
  }],
  tags: [{
    type: String
  }],
  taxonomyTags: [{
    type: String
  }],
  images: {
    hero: {
      type: String,
      required: true
    },
    gallery: [{
      type: String
    }]
  },
  gardener: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Gardener'
  },
  status: {
    type: String,
    enum: ['published', 'draft'],
    default: 'published'
  }
}, {
  timestamps: true
});

// Full-text search index on common name, scientific name, and description
PlantSchema.index({ name: 'text', scientificName: 'text', description: 'text' });

module.exports = mongoose.model('Plant', PlantSchema);
