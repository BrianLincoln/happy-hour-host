const express = require('express');
const passportUtils = require('../../utils');

const router = express.Router();
const City = require('./../../models/city');
const locationRoutes = require('./location');
const neighborhoodRoutes = require('./neighborhood');

//= auth (basically downloads everything)
router.get('/cities', (req, res) => {
  City.find({}, (err, cities) => {
    res.json({
      success: true,
      cities,
    });
  });
});

router.get('/city/:cityId', (req, res) => {
  City.findById(req.params.cityId, (err, city) => {
    if (city) {
      res.json({
        success: true,
        city,
      });
    } else {
      res.json({
        success: false,
      });
    }
  });
});

//= auth
router.post(
  '/city', passportUtils.verifyToken, (req, res) => {
    const city = new City();
    city.name = req.body.name;

    city.save((err) => {
      if (err) {
        res.send(err);
      }

      res.json({
        message: 'City added to DB',
        data: city,
      });
    });
  }
);

//= auth
router.delete('/city', (req, res) => {
  const city = new City();
  city._id = req.body._id;

  city.remove((err) => {
    if (err) {
      res.send(err);
    }

    res.json({
      message: 'City deleted from DB',
      data: city,
    });
  });
});

router.use(locationRoutes);
router.use(neighborhoodRoutes);

module.exports = router;
