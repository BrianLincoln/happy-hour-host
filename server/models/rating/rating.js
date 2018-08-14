const mongoose = require('mongoose');

const { Schema } = mongoose;

const Rating = new Schema({
  isAccurate: {
    type: Boolean,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  special: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Special',
  },
  type: {
    type: String,
    enum: ['special', 'location'],
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
});

module.exports = mongoose.model('Rating', Rating);
