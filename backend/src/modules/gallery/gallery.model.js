const mongoose = require('mongoose');

const GallerySchema = new mongoose.Schema({
  imageUrl: {
    type: String,
    required: [true, 'Image URL is required'],
    trim: true
  },
  alt: {
    type: String,
    required: [true, 'Alternative text (Alt) is required'],
    trim: true
  },
  caption: {
    type: String,
    required: [true, 'Caption is required'],
    trim: true
  },
  credit: {
    type: String,
    default: 'Pinterest',
    trim: true
  },
  aspectRatio: {
    type: String,
    enum: ['tall', 'wide', 'square', 'large'],
    default: 'tall'
  },
  plant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Plant'
  },
  likesCount: {
    type: Number,
    default: 0
  },
  likedBy: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }]
}, {
  timestamps: true
});

module.exports = mongoose.model('Gallery', GallerySchema);
