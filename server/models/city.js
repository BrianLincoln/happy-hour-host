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

const TimeWindow = new Schema({
  start: {
    type: String,
    required: true,
  },
  end: {
    type: String,
    required: true,
  },
});

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

const Special = new Schema({
  headline: {
    type: String,
    required: true,
  },
  details: {
    type: String,
  },
  days: {
    type: Array,
    required: true,
  },
  times: {
    type: [TimeWindow],
  },
  ratings: {
    type: [Rating],
  },
  hasDrinkSpecial: Boolean,
  hasFoodSpecial: Boolean,
});

const Location = new Schema({
  name: {
    type: String,
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

const City = new Schema({
  name: {
    type: String,
    required: true,
  },
  neighborhoods: [Neighborhood],
  locations: [Location],
});

City.pre('validate', (next) => {
  next();
});

City.pre('save', (next) => {
  next();
});

const Model = mongoose.model('City', City);
module.exports = Model;
