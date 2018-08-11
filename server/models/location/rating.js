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
  dateAdded: {
    type: Date,
    required: true,
  },
});

module.exports = Rating;
