const express = require('express');
const router = express.Router();
const path = require('path');
const _ = require('lodash');

//these should be removed
const City = require('./../models/city.js');
const Location = require('./../models/location.js');

var isAuthenticated = function (req, res, next) {
	// if user is authenticated in the session, call the next() to call the next request handler 
	// Passport adds this method to request object. A middleware is allowed to add properties to
	// request and response objects
	console.log("isAuthenticated: ", req.isAuthenticated(), next);
	if (req.isAuthenticated())
		return next();
	// if the user is not authenticated then redirect him to the login page
	res.json({isLoggedIn: false});
}

module.exports = function(passport){


	/* Handle Login POST */
	router.post('/loginxxx', passport.authenticate('login', {
		failureRedirect: '/login',
		failureFlash : true 
	}),	function(req, res) {
		// Explicitly save the session before redirecting!
		req.session.save(() => {
			console.log("manually saving session");
			res.redirect('/admin');
		})
	});

	router.post('/login', function(req, res, next) {
		passport.authenticate('login', function(err, user, info) {
		  if (err) {
			return next(err); // will generate a 500 error
		  }
		  // Generate a JSON response reflecting authentication status
		  if (! user) {
			return res.send({ success : false, message : 'authentication failed' });
		  }
		  // ***********************************************************************
		  // "Note that when using a custom callback, it becomes the application's
		  // responsibility to establish a session (by calling req.login()) and send
		  // a response."
		  // Source: http://passportjs.org/docs
		  // ***********************************************************************
		  req.login(user, loginErr => {
			if (loginErr) {
			  return next(loginErr);
			}
			return res.send({ success : true, message : 'authentication succeeded' });
		  });      
		})(req, res, next);
	  });
	
	/* Handle Registration POST */
	router.post('/signup', passport.authenticate('signup', {
		successRedirect: '/admin',
		failureRedirect: '/signup',
		failureFlash : true  
	}));

	/* Handle Logout */
	router.get('/signout', function(req, res) {
		req.logout();
		res.redirect('/');
	});

	router.get('/cities', isAuthenticated, (req, res) => {
		console.log("/citites");
		City.find({}, function(err, cities) {
		console.log("cities: ", cities);
		  res.json(cities);
		}); 
	});
	
	router.post('/city', (req, res) => {
	  let city = new City();
	  city.name = req.body.name;
	
	  city.save(function(err) {
		if (err)
		  res.send(err);
	
		res.json({ message: 'City added to DB', data: city });
	  });  
	});
	
	router.delete('/city', (req, res) => {
	  let city = new City();
	  city._id = req.body._id;
	
	  city.remove(function(err) {
		if (err)
		  res.send(err);
	
		res.json({ message: 'City deleted from DB', data: city });
	  });  
	});
	
	router.post('/city/:cityId/neighborhood', (req, res) => {
	
	  City.findById(req.params.cityId, function(err, city) {
		let neighborhoods = city.neighborhoods ? city.neighborhoods : [];
		neighborhoods.push({"name": req.body.name});
		city.neighborhoods = neighborhoods;
	
		// Using a promise rather than a callback
		city.save().then(function(savedCity) {
		  res.send(savedCity);
		}).catch(function(err) {
		  res.status(500).send(err);
		});
	  });
	});
	
	router.get('/city/:cityId/locations', (req, res) => {
	  Location.find({"cityId": req.params.cityId}, function(err, locations) {
		  res.json(locations);
		});  
	});
	
	router.post('/location', (req, res) => {
	  let location = new Location();
	  location.name = req.body.name;
	  location.cityId = req.body.cityId;
	  location.position = {
		latitude: req.body.position.latitude,
		longitude: req.body.position.longitude
	  };
	  location.address = {
		streetAddress: req.body.address.streetAddress,
		city: req.body.address.city,
		state: req.body.address.state,
		zip: req.body.address.zip
	  }
	
	  location.save(function(err) {
		if (err) {
		  console.log(err);
		}
		res.json({ message: 'location added to DB', data: location });
	  });  
	});
	
	router.post('/location/:locationId/special', (req, res) => {
	  Location.findById(req.params.locationId, function(err, location) {
		const specials = location.specials ? location.specials : [];
		specials.push(req.body.special);
		location.specials = specials;
		// Using a promise rather than a callback
		location.save().then(function(savedLocation) {
		  res.send(savedLocation);
		}).catch(function(err) {
		  console.log(err);
		  res.status(500).send(err);
		});
	  });
	});
	
	router.post('/location/:locationId/special/:specialId', (req, res) => {
	  Location.findById(req.params.locationId, function(err, location) {
		const special = location.specials.id(req.params.specialId);
		special.set(req.body.special);
		
		// Using a promise rather than a callback
		location.save().then(function(savedLocation) {
		  res.send(savedLocation);
		}).catch(function(err) {
		  console.log(err);
		  res.status(500).send(err);
		});
	  });
	});
	
	router.delete('/location/:locationId/special/:specialId', (req, res) => {
	  Location.findById(req.params.locationId, function(err, location) {
		let specials = location.specials ? location.specials : [];
		specials = _.remove(specials, function(special) {
			return special._id === req.params.specialId;
		});
	
		location.specials = specials;
		// Using a promise rather than a callback
		location.save().then(function(savedLocation) {
		  res.send(savedLocation);
		}).catch(function(err) {
		  console.log(err);
		  res.status(500).send(err);
		});
	  });
	});
	
	// Always return the main index.html, so react-router render the route in the client
	router.get('*', (req, res) => {
	  res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'));
	});

	return router;
}