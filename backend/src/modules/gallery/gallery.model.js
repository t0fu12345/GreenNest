const mongoose = require('mongoose');

const GallerySchema = new mongoose.Schema({
  imageUrl: {
    type: String,
    required: [true, 'URL hình ảnh là bắt buộc'],
    trim: true
  },
  alt: {
    type: String,
    required: [true, 'Văn bản thay thế (Alt text) là bắt buộc'],
    trim: true
  },
  caption: {
    type: String,
    required: [true, 'Chú thích ảnh (Caption) là bắt buộc'],
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
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Gallery', GallerySchema);
