const mongoose = require('mongoose');

const {
  Schema,
} = mongoose;

const Rating = new Schema({
  isAccurate: {
    type: Boolean,
    required: true,
  },
  userIP: {
    type: String,
    required: true,
  },
  dateAdded: {
    type: Date,
    required: true,
  },
});

module.exports = Rating;
