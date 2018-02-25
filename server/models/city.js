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

var TimeWindow = new Schema({
  start: {
        type: String,
        required: true
    },
  end: {
        type: String,
        required: true
    }
});

var Special = new Schema({
  headline: {
      type: String,
      required: true
  },     
  details: {
    type: String
  },
  days: {
    type: Array,
    required: true
  }, 
  times: {
    type: [TimeWindow]
  },
  hasDrinkSpecial: Boolean,
  hasFoodSpecial: Boolean
});

var Location = new Schema({
  name: {
    type: String,
    required: true
  },    
  specials: [Special],
  position: {
    latitude: {
      type: String,
      required: true
    },
    longitude: {
      type: String,
      required: true
    }
  },
  website: String,
  googleMapLink: String
});

var City = new Schema({
    name: {
        type: String,
        required: true
    },
    neighborhoods: [Neighborhood],
    locations: [Location]
});

City.pre('validate', function(next) {
  next();
});

City.pre('save', function(next) {
  next();
});


var Model = mongoose.model('City', City);
module.exports = Model;