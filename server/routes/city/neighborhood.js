const express = require('express');
const router = express.Router();
const City = require('./../../models/city');

router.get('/city/:cityId/neighborhoods', (req, res) => {

  City.findById(req.params.cityId, function(err, city) {
	  res.json({
			success: true,
			neighborhoods: city.neighborhoods
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

module.exports = router;
