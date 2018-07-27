const mongoose = require('mongoose');

const {
  Schema,
} = mongoose;

const Neighborhood = new Schema({
  name: {
    type: String,
    required: true,
  },
  mapCenter: {
    latitude: {
      type: Number,
      required: true,
    },
    longitude: {
      type: Number,
      required: true,
    },
  },
  mapZoomLevel: {
    type: Number,
  },
  mapPoly: {
    type: Array,
  },
});

module.exports = Neighborhood;
