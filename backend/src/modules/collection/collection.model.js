const mongoose = require('mongoose');

const CollectionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Collection title is required'],
    trim: true
  },
  slug: {
    type: String,
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Collection description is required']
  },
  coverImage: {
    type: String,
    required: [true, 'Collection cover image URL is required']
  },
  season: {
    type: String,
    enum: ['all', 'spring', 'summer', 'autumn', 'winter'],
    default: 'all'
  },
  isFeatured: {
    type: Boolean,
    default: false
  },
  plants: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Plant'
  }]
}, {
  timestamps: true
});

module.exports = mongoose.model('Collection', CollectionSchema);
