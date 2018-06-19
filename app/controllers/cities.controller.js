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
        lattitude: req.body.lattitude,
        longitude: req.body.longitude,
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