const express = require('express');
const router = express.Router();
const path = require('path');
const _ = require('lodash');
var bCrypt = require('bcrypt-nodejs');
var jwt    = require('jsonwebtoken');
var app = require('../app.js');

//these should be removed
const City = require('./../models/city.js');
const Location = require('./../models/location.js');
const User = require('./../models/user.js');

var verifyToken = function (req, res, done) {
	// check header or url parameters or post parameters for token
	var token = req.body.token || req.query.token || req.headers['x-access-token'];
	// decode token
	if (token) {
		// verifies secret and checks exp
		jwt.verify(token, app.get('secretCode'), function(err, decoded) {      
			if (err) {
				return res.json({ success: false, message: 'Failed to authenticate token.' });    
			} else {
				// if everything is good, save to request for use in other routes
				req.decoded = decoded;    
				done();
			}
		});
  	} else {
		// if there is no token
		// return an error
		return res.status(403).send({ 
			success: false, 
			message: 'No token provided.' 
		});
  }
}



var isValidPassword = function(user, password){
	return bCrypt.compareSync(password, user.password);
}
module.exports = function(passport) {

	router.get('/cities', (req, res) => {
		City.find({}, function(err, cities) {
		  res.json({
			success: true,
			cities: cities
		  });
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
	
	router.get('/city/:cityId/neighborhoods', (req, res) => {		
		console.log(req.params);
	  City.findById(req.params.cityId, function(err, city) {
		  res.json({
				success: true,
				neighborhoods: city.neighborhoods
				});
	  });
	});

	router.post('/city/:cityId/neighborhood', (req, res) => {
	  City.findById(req.params.cityId, function(err, city) {
			let neighborhoods = city.neighborhoods ? city.neighborhoods : [];			
			neighborhoods.push(req.body.neighborhood);			
			city.neighborhoods = neighborhoods;
		
			// Using a promise rather than a callback
			city.save().then(function(savedCity) {
				res.send(savedCity);
			}).catch(function(err) {
				res.status(500).send(err);
			});
	  });
	});

	router.get('/city/:cityId/neighborhood/:neighborhoodId', (req, res) => {		
	  City.findById(req.params.cityId, function(err, city) {

			let neighborhood = city.neighborhoods.filter((neighborhood) => {
				return neighborhood._id.toString() === req.params.neighborhoodId;
			});

		  res.json({
				success: true,
				neighborhood: neighborhood[0]
				});
	  });
	});

	router.get('/city-name/:cityName/neighborhood-name/:neighborhoodName', (req, res) => {
		City.findOne({ 'name': req.params.cityName }, function (err, city) {
			
			let neighborhood = city.neighborhoods.filter((neighborhood) => {
				return neighborhood.name === req.params.neighborhoodName;
			});

		  res.json({
				success: true,
				neighborhood: neighborhood[0]
			});
		});
	});	

	router.put('/city/:cityId/neighborhood/:neighborhoodId', (req, res) => {
	  City.findById(req.params.cityId, function(err, city) {
			let neighborhoods = city.neighborhoods ? city.neighborhoods : [];
			neighborhoods = neighborhoods.map((neighborhood) => {
				if (neighborhood._id.toString() === req.params.neighborhoodId) {
					
	  			neighborhood.name = req.body.neighborhood.name;
	  			neighborhood.mapCenter = req.body.neighborhood.mapCenter;
	  			neighborhood.mapZoomLevel = req.body.neighborhood.mapZoomLevel;
	  			neighborhood.mapPoly = req.body.neighborhood.mapPoly;
				}

				return neighborhood;
			});

			city.neighborhoods = neighborhoods;
		
			// Using a promise rather than a callback
			city.save().then(function(savedCity) {
				res.json({
					success: true
					});
			}).catch(function(err) {
				res.status(500).send(err);
			});
	  });
	});

	router.delete('/city/:cityId/neighborhood/:neighborhoodId', (req, res) => {
	  City.findById(req.params.cityId, function(err, city) {
			let neighborhoods = city.neighborhoods ? city.neighborhoods : [];
			neighborhoods = neighborhoods.filter((neighborhood) => {
				if (neighborhood._id.toString() !== req.params.neighborhoodId) {
					return true;
				}
			});

			city.neighborhoods = neighborhoods;
		
			// Using a promise rather than a callback
			city.save().then(function(savedCity) {
				res.json({
					success: true
					});
			}).catch(function(err) {
				res.status(500).send(err);
			});
	  });
	});
	
	router.get('/city/:city/locations', (req, res) => {
		Location.find({"city": req.params.city})
    	.populate('city')
    	.exec(function(err, locations) {
		  	res.json(locations);
		});
	});
	
	router.get('/location/:locationId', (req, res) => {
		Location.findOne({"_id": req.params.locationId}, function(err, location) {
		  res.json({
			success: true,
			location: location
		  });
		}); 
	});

	router.post('/location', (req, res) => {
	  let location = new Location();
	  location.name = req.body.name;
	  location.city = req.body.city;
	  location.position = {
			latitude: req.body.position.latitude,
			longitude: req.body.position.longitude
	  };
		location.website = req.body.website;
		location.googleMapLink = req.body.googleMapLink
	
	  location.save(function(err) {
		if (err) {
		  console.log(err);
		}
		res.json({ message: 'location added to DB', data: location });
	  });  
	});

	router.put('/location/:locationId', (req, res) => {
		Location.update({_id: req.params.locationId}, req.body, function(err, location) {			
			if (err) {
				res.send(err);
			}
			res.json({ success: true, message: "Updated Location: " + req.body.name });	
		});
	});

	router.delete('/location/:locationId', (req, res) => {
		Location.findByIdAndRemove(req.params.locationId, function (err, location) {
			if (err)
					throw err;
			
			res.json({ success: true, message: "Deleted" });			
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

			location.specials = location.specials.filter((special) => {
				return special._id.toString() !== req.params.specialId;
			});

			// Using a promise rather than a callback
			location.save().then(function(savedLocation) {
				res.send(savedLocation);
			}).catch(function(err) {
				console.log(err);
				res.status(500).send(err);
			});
	  });
	});
	
	router.get('/users', function(req, res) {
		User.find({}, function(err, users) {
			res.json(users);
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