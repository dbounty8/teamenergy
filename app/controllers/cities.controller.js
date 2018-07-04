const Cities = require('../models/cities.model.js');
const findNearestCity = require('../helpers/findNearestCity');

    // Create and Save a new Note
exports.createCity = (req, res) => {
    // Validate request
    if(!req.body.city) {
        return res.status(400).send({
            message: "City content can not be empty"
        });
    }

    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
      }
      const now = Date.now();
      const random = getRandomInt(1, 999);
      const randomID = now+random;
    // Create a City
    const cities = new Cities({
        cityID: randomID,
        city: req.body.city,
        location: req.body.location,
        optimal_inclination: req.body.optimal_inclination
    });

    // Save City in the database
    cities.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the City."
        });
    });
};


exports.deleteCity = (req, res) => {
    // Validate request
    if(!req.body.city) {
        return res.status(400).send({
            message: "City content can not be empty"
        });
    }

    //Delete City
    const cities = new Cities({
        city: req.body.city,
        coordinates: req.body.coordinates,
        optimal_inclination: req.body.optimal_inclination
    });

    // Save City in the database
    cities.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the City."
        });
    });
};

// Retrieve and return all cities from the database.
exports.findAllCities = (req, res) => {
    Cities.find()
    .then(cities => {
        res.send(cities);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving cities."
        });
    });
};

exports.findNearestCity = (req, res) => {
    findNearestCity(req.params.lng, req.params.lat)
        .then((city) => {
            res.send(city);
        })
        .catch((error) => {
            res.json({"error": error.message});
        })
};
