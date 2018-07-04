const Query = require('../models/queries.model.js');

// Create and Save a new query
exports.createQuery = (req, res) => {
    // Validate request
    if(!req.body.postcode) {
        return res.status(400).send({
            postcode: "Postcode can not be empty"
        });
    }

    // Create a query
    function getRandomInt(min, max) {
      return Math.floor(Math.random() * (max - min + 1) + min);
    }
    const now = Date.now();
    const random = getRandomInt(1, 999);
    const randomID = now+random;
    const query = new Query({
        queryID: randomID,
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        postcode: req.body.postcode,
        city: req.body.city,
        propertyType: req.body.propertyType,
    });    

    // Save Query in the database
    query.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Query."
        });
    });
};