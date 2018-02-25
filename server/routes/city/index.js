const express = require('express');
const router = express.Router();
const City = require('./../../models/city');
const locationRoutes = require('./location');
const neighborhoodRoutes = require('./neighborhood');

//=auth (basically downloads everything)
router.get('/cities', (req, res) => {
	City.find({}, function(err, cities) {
		res.json({
		success: true,
		cities: cities
		});
	}); 
});

router.get('/city/:cityId', (req, res) => {
	City.findById(req.params.cityId, function(err, city) {
		if (city) {
			res.json({
				success: true,
				city: city
			});
		} else {
			res.json({
				success: false
			})
		}
	}); 
});

//=auth
router.post('/city', (req, res) => {
	let city = new City();
	city.name = req.body.name;

	city.save(function(err) {
		if (err) {
			res.send(err);
		}
		
		res.json({ message: 'City added to DB', data: city });
	});  
});

//=auth
router.delete('/city', (req, res) => {
	let city = new City();
	city._id = req.body._id;

	city.remove(function(err) {
		if (err) {
			res.send(err);
		}

		res.json({ message: 'City deleted from DB', data: city });
	});  
});

router.use(locationRoutes);
router.use(neighborhoodRoutes);

module.exports = router;
