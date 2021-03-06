const express = require('express');
const passportUtils = require('../../utils');
const Location = require('./../../models/location/location');

const router = express.Router();

//= auth
router.post(
  '/api/locations/:locationId/specials',
  passportUtils.verifyToken,
  passportUtils.requireRole(['admin']),
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
  passportUtils.requireRole(['admin']),
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
  passportUtils.requireRole(['admin']),
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

module.exports = router;
