const express = require('express');

const router = express.Router();
const path = require('path');
const bCrypt = require('bcrypt-nodejs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const passportUtils = require('../utils');
const secretConfig = require('./../secret-config');
const app = require('../app.js');
const cityRoutes = require('./city/city');
const locationRoutes = require('./location/location');

// these should be removed
const User = require('./../models/user.js');

const isValidPassword = (user, password) =>
  bCrypt.compareSync(password, user.password);

const createHash = password =>
  bCrypt.hashSync(
    password, bCrypt.genSaltSync(10), null
  );

module.exports = (passport) => {
  router.use(cityRoutes);
  router.use(locationRoutes);

  router.get('/api/users', (req, res) => {
    User.find({}, (err, users) => {
      res.json(users);
    });
  });

  router.post(
    '/api/verfiy-token', passportUtils.verifyToken, (req, res) => {
      res.json({
        success: true,
      });
    }
  );

  router.post('/api/authenticate', (
    req, res, next
  ) => {
    User.findOne({
      email: req.body.email,
    },
    (err, user) => {
      if (err) return next(err);
      if (!user) {
        res.json({
          success: false,
          message: 'Authentication failed. User not found.',
        });
      } else if (user) {
        // check if password matches
        if (!isValidPassword(user, req.body.password)) {
          res.json({
            success: false,
            message: 'Authentication failed. Wrong password.',
          });
        } else {
          // valid email & password
          const token = jwt.sign({
            role: user.role,
          },
          app.get('secretCode'));

            // return the information including token as JSON
          res.json({
            success: true,
            message: 'Enjoy your token!',
            token,
          });
        }
      }
    });
  });

  /* Handle Registration POST */
  router.post('/api/signup',
    passport.authenticate('signup', {
      successRedirect: '/profile',
      failureRedirect: '/signup',
      failureFlash: true,
    }));

  // TODO: make a "user" controller or folder structure and put this in it:

  function generateResetPasswordToken() {
    return (
      Math.random()
        .toString(36)
        .substring(2, 10) +
      Math.random()
        .toString(36)
        .substring(2, 10)
    );
  }

  function sendForgotPasswordEmail(emailAddress, resetPasswordLink) {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: secretConfig.smtpAuth,
    });

    const mailOptions = {
      from: secretConfig.smtpAuth.user,
      to: emailAddress,
      subject: 'Password Recovery - Happy Hour Host',
      html: `<p>You are receiving this because you (or someone else) have requested to reset the password for your account.</p>
        <p>Please click on the following link, or paste this into your browser to complete the process:</p>
        <div>${resetPasswordLink}</div>
        <p>If you did not request this, please ignore this email and your password will remain unchanged.</p>`,
    };

    return new Promise((resolve, reject) => {
      transporter.sendMail(mailOptions, (err) => {
        if (err) {
          reject(Error('Failed to send email'));
        } else {
          resolve();
        }
      });
    });
  }
  router.post('/api/forgot-password', (req, res) => {
    const token = generateResetPasswordToken();

    User.findOneAndUpdate(
      {
        email: req.body.email,
      },
      {
        resetPasswordToken: token,
        resetPasswordExpires: Date.now() + 3600000, // 1 hour
      },
      (err, user) => {
        if (err) {
          res.status(500).send(err);
        } else if (!user) {
          // returning 200 even if no user is found
          res.json({
            success: true,
          });
        } else {
          const tokenizedURL = `${req.headers.origin}/reset-password/${token}`;

          sendForgotPasswordEmail(req.body.email, tokenizedURL).then(() => {
            res.json({
              success: true,
            });
          },
          (error) => {
            res.json({
              success: false,
              message: error.message,
            });
          });
        }
      }
    );
  });
  function sendResetPasswordEmail(emailAddress) {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: secretConfig.smtpAuth,
    });

    const mailOptions = {
      from: secretConfig.smtpAuth.user,
      to: emailAddress,
      subject: 'Your password has been changed - Happy Hour Host',
      html: `<h1>Hello</h1>
        <p>This is a confirmation that the password for your account ${emailAddress} has changed.`,
    };

    return new Promise((resolve, reject) => {
      transporter.sendMail(mailOptions, (err) => {
        if (err) {
          reject(Error('Failed to send email'));
        } else {
          resolve();
        }
      });
    });
  }
  router.post('/api/reset-password/:token', (req, res) => {
    User.findOne({
      email: req.body.email,
      resetPasswordToken: req.params.token,
      resetPasswordExpires: {
        $gt: Date.now(),
      },
    },
    (err, user) => {
      if (!user) {
        res.json({
          success: false,
          message: 'Password reset token is invalid or has expired.',
        });
      } else {
        const updatedUser = user;

        updatedUser.password = createHash(req.body.password);
        updatedUser.resetPasswordToken = undefined;
        updatedUser.resetPasswordExpires = undefined;

        user.save((err) => {
          sendResetPasswordEmail(updatedUser.email);
          res.json({
            success: true,
          });
        });
      }
    });
  });

  // Always return the main index.html, so react-router render the route in the client
  router.get('*', (req, res) => {
    res.sendFile(path.resolve(
      __dirname, '..', '../build', 'index.html'
    ));
  });

  return router;
};
