const express = require('express');
const router = express.Router();
const path = require('path');
const _ = require('lodash');
var bCrypt = require('bcrypt-nodejs');
var jwt    = require('jsonwebtoken');
const passportUtils = require('../utils');
const app = require('../app.js');
const cityRoutes = require('./city');

//these should be removed
const User = require('./../models/user.js');

var isValidPassword = function(user, password){
	return bCrypt.compareSync(password, user.password);
}
module.exports = function(passport) {

	router.use(cityRoutes);
	
	router.get('/users', function(req, res) {
		User.find({}, function(err, users) {
			res.json(users);
		});
	});   

	router.post('/verfiy-token', passportUtils.verifyToken, function(req, res, done) {
		res.json({
			success: true
		});
	});
	
	router.post('/authenticate', function(req, res, done) {
		User.findOne({ 'username' :  req.body.username }, function(err, user) {
			// In case of any error, return using the done method
			if (err)
				return done(err);
			// Username does not exist, log the error and redirect back
			if (!user){
				console.log('User Not Found with username ' + req.body.username);
				return done(null, false, req.flash('message', 'User Not found.'));                 
			}
			// User exists but wrong password, log the error 
			if (!isValidPassword(user, req.body.password)){
				console.log('Invalid Password');
				return done(null, false, req.flash('message', 'Invalid Password')); // redirect back to login page
			}
			// if user is found and password is right
			// create a token

			var token = jwt.sign({}, app.get('secretCode'));

		  	// return the information including token as JSON
		  	res.json({
				success: true,
				message: 'Enjoy your token!',
				token: token
			});
		});
		});	
		
	/* Handle Registration POST */
	router.post('/signup', passport.authenticate('signup', {
		successRedirect: '/admin',
		failureRedirect: '/signup',
		failureFlash : true  
	}));		


	// Always return the main index.html, so react-router render the route in the client
	router.get('*', (req, res) => {
	  res.sendFile(path.resolve(__dirname, '..', '../build', 'index.html'));
	});

	return router;
}