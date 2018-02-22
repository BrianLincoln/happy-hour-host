var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Position = new Schema({
  latitude: {
    type: String,
    required: true
  },
  longitude: {
    type: String,
    required: true
  }
});

var Neighborhood = new Schema({
    name: {
        type: String,
        required: true
    },
    mapCenter: {
      type: Position
    },
    mapZoomLevel: {
      type: Number
    },
    mapPoly: {
      type: Array
    }
});

Neighborhood.pre('validate', function(next) {
  next();
});

Neighborhood.pre('save', function(next) {
  next();
});


var City = new Schema({
    name: {
        type: String,
        required: true
    },
    neighborhoods: [Neighborhood]
});


City.pre('validate', function(next) {
  next();
});

City.pre('save', function(next) {
  next();
});


var Model = mongoose.model('City', City);
module.exports = Model;