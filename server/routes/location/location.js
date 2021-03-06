const express = require('express');
const passportUtils = require('../../utils');
const Location = require('./../../models/location/location');
const specialRoutes = require('./special');

const router = express.Router();
router.use(specialRoutes);

router.get('/api/locations', (req, res) => {
  // filter by city
  if (req.query.cityId) {
    Location.find({
      city: req.query.cityId,
    })
      .populate('city')
      .exec((err, locations) => {
        if (err) {
          res.status(500).send(err);
        }
        res.json({
          success: true,
          locations,
        });
      });
  } else {
    Location.find({})
      .populate('city')
      .exec((err, locations) => {
        if (err) {
          res.status(500).send(err);
        }
        res.json({
          success: true,
          locations,
        });
      });
  }
});

router.get('/api/locations/:locationId', (req, res) => {
  Location.findById(req.params.locationId)
    .populate('city')
    .exec((err, location) => {
      if (err) {
        res.status(500).send(err);
      }
      if (location) {
        res.json({
          success: true,
          location,
        });
      } else {
        res.json({
          success: false,
          message: `No location found with ID : ${req.params.locationId}`,
        });
      }
    });
});

//= auth
// TODO -- add cityID -- this is probably broken
router.post(
  '/api/locations',
  passportUtils.verifyToken,
  passportUtils.requireRole(['admin']),
  (req, res) => {
    const location = new Location(req.body.location);

    location.save((err) => {
      if (err) {
        res.status(500).send(err);
      }

      res.json({
        message: 'Location added to DB',
        data: location,
      });
    });
  }
);

//= auth
router.put(
  '/api/locations/:locationId',
  passportUtils.verifyToken,
  passportUtils.requireRole(['admin']),
  (req, res) => {
    Location.findByIdAndUpdate(
      req.params.locationId,
      req.body.location,
      (err) => {
        if (err) {
          res.status(500).send(err);
        }
        res.json({
          success: true,
        });
      }
    );
  }
);

//= auth
router.delete(
  '/api/locations/:locationId',
  passportUtils.verifyToken,
  passportUtils.requireRole(['admin']),
  (req, res) => {
    const location = new Location();
    location._id = req.params.locationId;

    location.remove((err) => {
      if (err) {
        res.status(500).send(err);
      }

      res.json({
        message: 'Location deleted from DB',
        data: location,
      });
    });
  }
);

module.exports = router;
