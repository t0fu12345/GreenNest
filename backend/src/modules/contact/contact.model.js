const mongoose = require('mongoose');

const ContactMessageSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: [true, 'Họ và tên là bắt buộc'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email là bắt buộc'],
    trim: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, 'Email không đúng định dạng']
  },
  subject: {
    type: String,
    required: [true, 'Chủ đề liên hệ là bắt buộc'],
    trim: true
  },
  message: {
    type: String,
    required: [true, 'Nội dung tin nhắn là bắt buộc'],
    trim: true
  },
  status: {
    type: String,
    enum: ['pending', 'resolved'],
    default: 'pending'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('ContactMessage', ContactMessageSchema);
