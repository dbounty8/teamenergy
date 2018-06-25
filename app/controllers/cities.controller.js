const Cities = require('../models/cities.model.js');

    // Create and Save a new Note
exports.createCity = (req, res) => {
    // Validate request
    if(!req.body.city) {
        return res.status(400).send({
            message: "City content can not be empty"
        });
    }

    // Create a City
    const cities = new Cities({
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
    console.log(req.params.longitude, req.params.latitude);
    Cities.find(
        { location:
            { $nearSphere:
                { $geometry:
                    {
                        type: "Point",
                        coordinates: [ req.params.longitude, req.params.latitude ]
                    },
                    // $maxDistance: <distance in meters>,
                    // $minDistance: <distance in meters>
                }
            }
        }
    ).limit(1)
    .then(city =>{
        res.send(city);
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving city."
        });
    })
};
