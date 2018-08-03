const mongoose = require('mongoose');

const {
  Schema,
} = mongoose;

const LocationSuggestion = new Schema({
  name: {
    type: String,
    required: true,
  },
  city: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'City',
    required: true,
  },
  website: String,
  googleMapLink: String,
  source: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
});

module.exports = mongoose.model('LocationSuggestion', LocationSuggestion);
