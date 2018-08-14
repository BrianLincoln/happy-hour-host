const mongoose = require('mongoose');
const Special = require('./special');

const { Schema } = mongoose;

const Location = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  city: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'City',
    required: true,
  },
  specials: [Special],
  position: {
    latitude: {
      type: Number,
      required: true,
    },
    longitude: {
      type: Number,
      required: true,
    },
  },
  website: String,
  googleMapLink: String,
});

module.exports = mongoose.model('Location', Location);
