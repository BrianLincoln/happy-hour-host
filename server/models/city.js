const mongoose = require('mongoose');
const Location = require('./location');
const Neighborhood = require('./neighborhood');

const {
  Schema,
} = mongoose;

const City = new Schema({
  name: {
    type: String,
    required: true,
  },
  Neighborhood: [Neighborhood],
  locations: [Location],
});

City.pre('validate', (next) => {
  next();
});

City.pre('save', (next) => {
  next();
});

module.exports = mongoose.model('City', City);
