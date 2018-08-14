const express = require('express');
const passportUtils = require('../../utils');
const Rating = require('./../../models/rating/rating');

const router = express.Router();

//= auth
router.post(
  '/api/ratings', passportUtils.verifyToken, (req, res) => {
    const { userId } = req.decoded;
    const { specialId } = req.body;

    const newRating = new Rating({
      isAccurate: req.body.isAccurate,
      user: userId,
      special: specialId,
      type: 'special',
      date: Date.now(),
    });

    // Check for existing rating by this user
    Rating.findOne({
      user: userId,
      special: specialId,
    }).then((existingRating) => {
    // no existing rating -- save new rating
      if (!existingRating) {
        newRating.save((err) => {
          if (err) {
            res
              .status(500)
              .json({
                success: false,
              })
              .send(err);
          }

          res.json({
            message: 'Rating added to DB',
            data: newRating,
            success: true,
          });
        });
      } else {
      // found existing rating -- update it
        Rating.findOneAndUpdate({
          user: userId,
          special: specialId,
        },
        {
          isAccurate: newRating.isAccurate,
          date: newRating.date,
        })
          .then((doc) => {
            res.json({
              message: 'Updated Rating',
              data: doc,
              success: true,
            });
          })
          .catch((err) => {
            res
              .status(500)
              .json({
                success: false,
              })
              .send(err);
          });
      }
    });
  }
);

module.exports = router;
