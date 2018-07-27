const express = require('express');
const passportUtils = require('../../utils');

const router = express.Router();
const City = require('./../../models/city/city');

router.get('/api/cities/:cityId/neighborhoods', (req, res) => {
  City.findById(req.params.cityId, (err, city) => {
    if (err) {
      res.status(500).send(err);
    }

    res.json({
      success: true,
      neighborhoods: city.neighborhoods,
    });
  });
});

router.get('/api/cities/:cityId/neighborhoods/:neighborhoodId', (req, res) => {
  City.findById(req.params.cityId, (err, city) => {
    if (err) {
      res.status(500).send(err);
    }
    const neighborhood = city.neighborhoods.find(n => n._id.toString() === req.params.neighborhoodId);

    if (neighborhood) {
      res.json({
        success: true,
        neighborhood,
      });
    } else {
      res.json({
        success: false,
        message: 'neighborhood not found',
      });
    }
  });
});

//= auth
router.post(
  '/api/cities/:cityId/neighborhoods',
  passportUtils.verifyToken,
  (req, res) => {
    const query = {
      _id: req.params.cityId,
    };

    City.update(query, {
      $push: {
        neighborhoods: req.body.neighborhood,
      },
    })
      .then(() => {
        res.json({
          success: true,
        });
      })
      .catch((err) => {
        res.status(500).send(err);
      });
  }
);

//= auth
router.put(
  '/api/cities/:cityId/neighborhoods/:neighborhoodId',
  passportUtils.verifyToken,
  (req, res) => {
    const query = {
      _id: req.params.cityId,
      'neighborhoods._id': req.params.neighborhoodId,
    };

    City.findOneAndUpdate(query, {
      $set: {
        'neighborhoods.$': req.body.neighborhood,
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
  '/api/cities/:cityId/neighborhoods/:neighborhoodId',
  passportUtils.verifyToken,
  (req, res) => {
    const query = {
      _id: req.params.cityId,
      'neighborhoods._id': req.params.neighborhoodId,
    };

    City.findOneAndUpdate(query, {
      $pull: {
        neighborhoods: {
          _id: req.params.neighborhoodId,
        },
      },
    })
      .then(() => {
        res.json({
          success: true,
        });
      })
      .catch((err) => {
        res.status(500).send(err);
      });
  }
);

module.exports = router;
