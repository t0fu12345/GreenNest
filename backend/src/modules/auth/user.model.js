const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const CareTaskSchema = new mongoose.Schema({
  taskName: {
    type: String,
    enum: ['water', 'mist', 'fertilize', 'prune', 'repot'],
    required: true
  },
  completed: {
    type: Boolean,
    default: false
  },
  lastCompletedAt: {
    type: Date,
    default: null
  }
});

const GardenItemSchema = new mongoose.Schema({
  plant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Plant',
    required: true
  },
  customNickname: {
    type: String,
    trim: true
  },
  addedAt: {
    type: Date,
    default: Date.now
  },
  checklist: [CareTaskSchema]
});

const UserSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: [true, 'Full name is required'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, 'Invalid email address format']
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters'],
    select: false
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },
  avatarUrl: {
    type: String,
    default: ''
  },
  savedPlants: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Plant'
  }],
  garden: [GardenItemSchema]
}, {
  timestamps: true
});

// Pre-save Hook: Hash password using bcryptjs before saving
UserSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Instance Method: Compare input password with stored hash
UserSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', UserSchema);
