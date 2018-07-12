const express = require('express');

const router = express.Router();
const City = require('./../../models/city');

// get locations for a city
router.get('/city/:cityId/locations', (req, res) => {
  City.findById(req.params.cityId, (err, city) => {
    if (city) {
      res.json({
        success: true,
        locations: city.locations,
      });
    } else {
      res.json({
        success: false,
      });
    }
  });
});

// get a location by id
router.get('/city/:cityId/location/:locationId', (req, res) => {
  City.findById(req.params.cityId, (err, city) => {
    const location = city.locations.find(location => location._id.toString() === req.params.locationId);

    res.json({
      success: true,
      location,
    });
  });
});

// get a location by city & location names
router.get('/city-name/:cityName/location-name/:locationName', (req, res) => {
  const cityName = decodeURIComponent(req.params.cityName.replace('+', ' '));
  const locationName = decodeURIComponent(req.params.locationName.replace('+', ' '));

  City.findOne({
    name: cityName,
  },
  (err, city) => {
    const location = city.locations.find(location => location.name === locationName);

    res.json({
      success: true,
      location,
    });
  });
});

// post new location
router.post('/city/:cityId/location', (req, res) => {
  const location = {
    name: req.body.name,
    position: {
      latitude: req.body.position.latitude,
      longitude: req.body.position.longitude,
    },
    website: req.body.website,
    googleMapLink: req.body.googleMapLink,
  };

  City.findById(req.params.cityId, (err, city) => {
    const locations = city.locations ? city.locations : [];
    locations.push(location);

    city.locations = locations;

    // Using a promise rather than a callback
    city
      .save()
      .then((savedCity) => {
        res.json({
          success: true,
        });
      })
      .catch((err) => {
        res.status(500).send(err);
      });
  });
});

// update existing location
router.put('/city/:cityId/location/:locationId', (req, res) => {
  City.findOneAndUpdate(
    {
      _id: req.params.cityId,
      'locations._id': req.params.locationId,
    },
    {
      $set: {
        'locations.$': req.body,
      },
    },
    (err, doc) => {
      res.json({
        success: true,
      });
    }
  );
});

// delete location
router.delete('/city/:cityId/location/:locationId', (req, res) => {
  City.findById(req.params.cityId, (err, city) => {
    let locations = city.locations ? city.locations : [];

    locations = locations.filter((location) => {
      if (location._id.toString() !== req.params.locationId) {
        return true;
      }
    });

    city.locations = locations;

    // Using a promise rather than a callback
    city
      .save()
      .then((savedCity) => {
        res.json({
          success: true,
        });
      })
      .catch((err) => {
        res.status(500).send(err);
      });
  });
});

router.post('/city/:cityId/location/:locationId/special', (req, res) => {
  City.findOneAndUpdate(
    {
      _id: req.params.cityId,
      'locations._id': req.params.locationId,
    },
    {
      $push: {
        'locations.$.specials': req.body,
      },
    },
    (err, doc) => {
      res.json({
        success: true,
      });
    }
  );
});

// update existing special
router.put('/city/:cityId/location/:locationId/special/:specialId', (req, res) => {
  City.findById(req.params.cityId, (err, city) => {
    city.locations.id(req.params.locationId).specials = city.locations
      .id(req.params.locationId)
      .specials.map((special) => {
        console.log(special);
        if (special._id.toString() === req.params.specialId) {
          return req.body.special;
        }

        return special;
      });

    city.save();
    res.json({
      success: true,
    });
  });
});

router.delete('/city/:cityId/location/:locationId/special/:specialId', (req, res) => {
  console.log('delete special');
  City.findById(req.params.cityId, (err, city) => {
    city.locations
      .id(req.params.locationId)
      .specials.id(req.params.specialId)
      .remove();

    city.save();
    res.json({
      success: true,
    });
  });
});

router.post('/city/:cityId/location/:locationId/special/:specialId/rating', (req, res) => {
  console.log('rating: ', req.body);
  console.log('ip: ', req.ip);
  console.log('date: ', Date.now());
  console.log('params: ', req.params);

  const rating = {
    isAccurate: req.body.isAccurate,
    userIP: req.ip,
    dateAdded: Date.now(),
  };

  City.findById(req.params.cityId, (err, city) => {
    city.locations
      .id(req.params.locationId)
      .specials.id(req.params.specialId)
      .ratings.push(rating);

    city.save();
    res.json({
      success: true,
    });
  });
});

module.exports = router;
