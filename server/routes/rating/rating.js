const express = require('express');
const Rating = require('./../../models/rating/rating');
const passportUtils = require('../../utils');

const router = express.Router();

//= auth
router.post(
  '/api/ratings', passportUtils.verifyToken, (req, res) => {
    const rating = {
      isAccurate: req.body.rating.isAccurate,
      user: req.decoded.userId,
      special: req.body.rating.specialId,
      type: 'special',
      date: Date.now(),
    };

    const query = {
      user: rating.user,
      special: rating.special,
    };

    Rating.update(
      query,
      rating,
      {
        upsert: true,
        setDefaultsOnInsert: true,
      },
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

module.exports = router;
