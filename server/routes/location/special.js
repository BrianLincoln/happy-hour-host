const express = require('express');
const passportUtils = require('../../utils');
const City = require('./../../models/city/city');
const Location = require('./../../models/location/location');

const router = express.Router();

//= auth
router.post(
  '/api/locations/:locationId/specials',
  passportUtils.verifyToken,
  (req, res) => {
    const query = {
      _id: req.params.locationId,
    };

    Location.update(query, {
      $push: {
        specials: req.body.special,
      },
    }).then((err) => {
      if (err) {
        res.status(500).send(err);
      }
      res.json({
        success: true,
      });
    });
  }
);

//= auth
router.put(
  '/api/locations/:locationId/specials/:specialId',
  passportUtils.verifyToken,
  (req, res) => {
    const query = {
      _id: req.params.locationId,
      'specials._id': req.params.specialId,
    };

    Location.findOneAndUpdate(query, {
      $set: {
        'specials.$': req.body.special,
      },
    })
      .then((result) => {
        res.json({
          newId: result._id,
          success: true,
        });
      })
      .catch((err) => {
        res.status(500).send(err);
      });
  }
);

//= auth
router.delete(
  '/api/locations/:locationId/specials/:specialId',
  passportUtils.verifyToken,
  (req, res) => {
    const query = {
      _id: req.params.locationId,
      'specials._id': req.params.specialId,
    };

    Location.findOneAndUpdate(query, {
      $pull: {
        specials: {
          _id: req.params.specialId,
        },
      },
    })
      .then((result) => {
        res.json({
          newId: result._id,
          success: true,
        });
      })
      .catch((err) => {
        res.status(500).send(err);
      });
  }
);

// UNTESTED
// NEEDS A CHECK TO SEE IF IP HAS ALREADY RATED
router.post('/api/locations/:locationId/specials/:specialId/rating',
  (req, res) => {
    const rating = {
      isAccurate: req.body.isAccurate,
      userIP: req.ip,
      dateAdded: Date.now(),
    };

    const query = {
      _id: req.params.locationId,
      'specials._id': req.params.specialId,
    };

    Location.update(query, {
      $push: {
        ratings: rating,
      },
    }).then((err) => {
      if (err) {
        res.status(500).send(err);
      }
      res.json({
        success: true,
      });
    });
  });

module.exports = router;
