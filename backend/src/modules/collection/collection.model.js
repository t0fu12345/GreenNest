const mongoose = require('mongoose');

const CollectionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Tiêu đề bộ sưu tập là bắt buộc'],
    trim: true
  },
  slug: {
    type: String,
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Mô tả bộ sưu tập là bắt buộc']
  },
  coverImage: {
    type: String,
    required: [true, 'Ảnh bìa bộ sưu tập là bắt buộc']
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
