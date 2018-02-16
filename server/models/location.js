var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Time = new Schema({
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
      type: [Time]
    }
});

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

var Location = new Schema({
    name: {
      type: String,
      required: true
    },
    cityId: Schema.Types.ObjectId,
    specials: [Special],
    position: {
      type: Position,
      required: true
    },
    website: String,
    googleMapLink: String
});



var Model = mongoose.model('Location', Location);
module.exports = Model;