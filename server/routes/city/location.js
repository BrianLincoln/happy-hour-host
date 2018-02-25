const express = require('express');
const router = express.Router();
const City = require('./../../models/city');

//get locations for a city
router.get('/city/:cityId/locations', (req, res) => {
    City.findById(req.params.cityId, (err, city) => {        
        res.json({
            success: true,
            locations: city.locations
        })
    });
});

//get a location by id
router.get('/city/:cityId/location/:locationId', (req, res) => {
	City.findById(req.params.cityId, function(err, city) {
		let location = city.locations.find((location) => {
			return location._id.toString() === req.params.locationId;
		});
  
		res.json({
			success: true,
			location: location
		});
	});
});

//get a location by city & location names
router.get('/city-name/:cityName/location-name/:locationName', (req, res) => {
  let cityName = decodeURIComponent(req.params.cityName.replace("+", " "));
  let locationName = decodeURIComponent(req.params.locationName.replace("+", " "));

  City.findOne({ 'name': cityName }, function (err, city) {
    
    let location = city.locations.find((location) => {
      return location.name === locationName;
    });

  res.json({
      success: true,
      location: location
    });
  });
});	

//post new location
router.post('/city/:cityId/location', (req, res) => {
  const location = {
    name: req.body.name,
    position: {
      latitude: req.body.position.latitude,
      longitude: req.body.position.longitude
    },
    website: req.body.website,
    googleMapLink: req.body.googleMapLink
  };
  
  City.findById(req.params.cityId, (err, city) => {
      let locations = city.locations ? city.locations : [];
      locations.push(location);

      city.locations = locations;
	
      // Using a promise rather than a callback
      city.save().then(function(savedCity) {
        res.json({
          success: true
          });
      }).catch(function(err) {
        res.status(500).send(err);
      });
  });
});

//update existing location
router.put('/city/:cityId/location/:locationId', (req, res) => {  
  
  City.findOneAndUpdate({ "_id": req.params.cityId, "locations._id": req.params.locationId },
    { 
        "$set": {
            "locations.$": req.body
        }
    },
    function(err, doc) {
      res.json({success: true});
    }
  );

});

//delete location
router.delete('/city/:cityId/location/:locationId', (req, res) => {
  City.findById(req.params.cityId, function(err, city) {
    let locations = city.locations ? city.locations : [];
    
		locations = locations.filter((location) => {
			if (location._id.toString() !== req.params.locationId) {
				return true;
			}
		});

		city.locations = locations;
	
		// Using a promise rather than a callback
		city.save().then(function(savedCity) {
			res.json({
				  success: true
      });
		}).catch(function(err) {
			res.status(500).send(err);
		});
  });
});

router.post('/city/:cityId/location/:locationId/special', (req, res) => {
  City.findOneAndUpdate({"_id": req.params.cityId, "locations._id": req.params.locationId},
    {
      "$push": {
        'locations.$.specials': req.body
      }
    },
    function(err, doc) {
      res.json({success: true});
    }
  );
});

router.post('/location/:locationId/special/:specialId', (req, res) => {		
  Location.findById(req.params.locationId, function(err, location) {
    const special = location.specials.id(req.params.specialId);
    special.set(req.body.special);
    
    // Using a promise rather than a callback
    location.save().then(function(savedLocation) {
      res.send(savedLocation);
    }).catch(function(err) {
      console.log(err);
      res.status(500).send(err);
    });
  });
});

router.delete('/location/:locationId/special/:specialId', (req, res) => {
  Location.findById(req.params.locationId, function(err, location) {

        location.specials = location.specials.filter((special) => {
            return special._id.toString() !== req.params.specialId;
        });

        // Using a promise rather than a callback
        location.save().then(function(savedLocation) {
            res.send(savedLocation);
        }).catch(function(err) {
            console.log(err);
            res.status(500).send(err);
        });
  });
});

module.exports = router;