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
    required: [true, 'Tên cây là bắt buộc'],
    trim: true
  },
  scientificName: {
    type: String,
    required: [true, 'Tên khoa học là bắt buộc'],
    trim: true
  },
  slug: {
    type: String,
    trim: true
  },
  category: {
    type: String,
    required: [true, 'Nhóm phân loại là bắt buộc'],
    trim: true
  },
  biome: {
    type: String,
    enum: ['tropical', 'subtropical', 'arid', 'temperate'],
    required: [true, 'Môi trường sinh trưởng (Biome) là bắt buộc']
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
    required: [true, 'Yêu cầu ánh sáng là bắt buộc']
  },
  watering: {
    type: String,
    required: [true, 'Yêu cầu tưới nước là bắt buộc']
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
    enum: ['Easy', 'Moderate', 'Challenging'],
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
  // Nhóm chỉ số đo lường vi khí hậu hiển thị trên Telemetry Dashboard
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

// Full-text search index trên tên phổ thông, tên khoa học và mô tả
PlantSchema.index({ name: 'text', scientificName: 'text', description: 'text' });

module.exports = mongoose.model('Plant', PlantSchema);
