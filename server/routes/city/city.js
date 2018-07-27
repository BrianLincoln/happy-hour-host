const express = require('express');
const passportUtils = require('../../utils');

const router = express.Router();
const City = require('./../../models/city/city');
const neighborhoodRoutes = require('./neighborhood');

router.get('/api/cities', (req, res) => {
  City.find({}, (err, cities) => {
    if (err) {
      res.status(500).send(err);
    }

    res.json({
      success: true,
      cities,
    });
  });
});

router.get('/api/cities/:cityId', (req, res) => {
  City.findById(req.params.cityId, (err, city) => {
    if (err) {
      res.status(500).send(err);
    }

    if (city) {
      res.json({
        success: true,
        city,
      });
    } else {
      res.status(404);
    }
  });
});

//= auth
router.post(
  '/api/cities', passportUtils.verifyToken, (req, res) => {
    const city = new City(req.body);

    city.save((err) => {
      if (err) {
        res.status(500).send(err);
      }

      res.json({
        message: 'City added to DB',
        data: city,
      });
    });
  }
);

//= auth
router.delete(
  '/api/cities/:cityId', passportUtils.verifyToken, (req, res) => {
    const city = new City();
    city._id = req.params.cityId;

    city.remove((err) => {
      if (err) {
        res.status(500).send(err);
      }

      res.json({
        message: 'City deleted from DB',
        data: city,
      });
    });
  }
);

router.use(neighborhoodRoutes);

module.exports = router;
