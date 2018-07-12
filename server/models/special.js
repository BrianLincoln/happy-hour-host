const mongoose = require('mongoose');
const Rating = require('./rating');

const {
  Schema,
} = mongoose;

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

module.exports = Special;
