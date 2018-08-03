const express = require('express');
const passportUtils = require('../../utils');
const LocationSuggestion = require('./../../models/location/location-suggestion');

const router = express.Router();

router.get('/api/location-suggestions', (req, res) => {
  LocationSuggestion.find({}, (err, suggestions) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({
      success: true,
      suggestions,
    });
  });
});

router.get('/api/location-suggestions/:id', (req, res) => {
  LocationSuggestion.findById(req.params.id, (err, locationSuggestion) => {
    if (locationSuggestion) {
      if (err) {
        res.status(500).send(err);
      }
      res.json({
        success: true,
        locationSuggestion,
      });
    } else {
      res.json({
        success: false,
        message: `No location suggestion found with ID : ${req.params.id}`,
      });
    }
  });
});

//= auth
router.post(
  '/api/location-suggestions',
  passportUtils.verifyToken,
  (req, res) => {
    const suggestion = new LocationSuggestion(req.body.suggestion);
    suggestion.user = req.decoded.userId;
    suggestion.date = Date.now();

    suggestion.save((err) => {
      console.log(err);
      if (err) {
        res.status(500).send(err);
      }

      res.json({
        success: true,
        message: 'LocationSuggestion added to DB',
        data: suggestion,
      });
    });
  }
);

//= auth
router.put(
  '/api/location-suggestions/:id',
  passportUtils.verifyToken,
  (req, res) => {
    LocationSuggestion.findByIdAndUpdate(
      req.params.id,
      req.body.suggestion,
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
  '/api/location-suggestions/:id',
  passportUtils.verifyToken,
  passportUtils.requireRole(['admin']),
  (req, res) => {
    const suggestion = new LocationSuggestion();
    suggestion._id = req.params.id;

    suggestion.remove((err) => {
      if (err) {
        res.status(500).send(err);
      }

      res.json({
        message: 'LocationSuggestion deleted from DB',
        data: suggestion,
      });
    });
  }
);

module.exports = router;
