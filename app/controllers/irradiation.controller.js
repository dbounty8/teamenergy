const Irradiation = require('../models/irradiation.model.js');

    // Create and Save a new Note
exports.createIrradiation = (req, res) => {
    // Validate request
    if(!req.body.city) {
        return res.status(400).send({
            message: "City content can not be empty"
        });
    }

    // Create a Irradiation
    const irradiation = new Irradiation({
        city: req.body.city,
        month: req.body.month,
        hh: req.body.hh,
        hopt: req.body.hopt,
        h90: req.body.h90,
        iopt: req.body.iopt,
        t24h: req.body.t24h
    });

    // Save City in the database
    irradiation.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Irradiation."
        });
    });
};