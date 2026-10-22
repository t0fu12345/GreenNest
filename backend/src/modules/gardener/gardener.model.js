const mongoose = require('mongoose');

const GardenerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Botanist name is required'],
    trim: true
  },
  avatar: {
    type: String,
    default: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80'
  },
  bio: {
    type: String,
    trim: true
  },
  specialization: {
    type: String,
    required: [true, 'Field of specialization is required'],
    trim: true
  },
  experienceYears: {
    type: Number,
    default: 5
  },
  contactEmail: {
    type: String,
    trim: true,
    lowercase: true
  },
  associatedPlants: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Plant'
  }]
}, {
  timestamps: true
});

module.exports = mongoose.model('Gardener', GardenerSchema);
