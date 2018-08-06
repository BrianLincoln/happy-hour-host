const mongoose = require('mongoose');
const Neighborhood = require('./neighborhood');

const {
  Schema,
} = mongoose;

const City = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  neighborhoods: [Neighborhood],
  locations: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Location',
    },
  ],
});

City.pre('validate', (next) => {
  next();
});

City.pre('save', (next) => {
  next();
});

module.exports = mongoose.model('City', City);
