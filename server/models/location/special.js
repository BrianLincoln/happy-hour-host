const mongoose = require('mongoose');
const Rating = require('../rating/rating');

const { Schema } = mongoose;

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
  rateCount: Number,
  rateValue: Number,
  hasDrinkSpecial: Boolean,
  hasFoodSpecial: Boolean,
});

module.exports = Special;
