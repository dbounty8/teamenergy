const Property = require('../models/property.model.js');

// Create and Save a new Property Type
exports.createProperty = (req, res) => {
    // Validate request
    if(!req.body.property_type) {
        return res.status(400).send({
            property_type: "Property type can not be empty"
        });
    }

    // Create a propertyType
    function getRandomInt(min, max) {
      return Math.floor(Math.random() * (max - min + 1) + min);
    }
    const now = Date.now();
    const random = getRandomInt(1, 999);
    const randomID = now+random;
    const property = new Property({
        propertyTypeID: randomID,
        property_type: req.body.property_type,
        roof_area: req.body.roof_area,
        electricity_price: req.body.electrcity_price
    });    

    // Save Property Type in the database
    property.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Property Type."
        });
    });
};

// Retrieve and return all Property Type from the database.
exports.findAllProperty = (req, res) => {
    Property.find()
    .then(propertyTypes => {
        res.send(propertyTypes);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving propertyTypes."
        });
    });
};

// Find a single propertyType with a propertyTypeId
exports.findOneProperty = (req, res) => {
    Property.findById(req.params.propertyTypeId)
    .then(property => {
        if(!property) {
            return res.status(404).send({
                message: "propertyType not found with id " + req.params.propertyTypeId
            });            
        }
        res.send(property);
    }).catch(err => {
        if(err.kind === 'ObjectID') {
            return res.status(404).send({
                message: "propertyType not found with id " + req.params.propertyTypeId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving propertyType with id " + req.params.propertyTypeId
        });
    });
};

// Update a propertyType identified by the propertyTypeId in the request
exports.updateProperty = (req, res) => {
    // Validate Request
    if(!req.body.property_type) {
        return res.status(400).send({
            message: "propertyType content can not be empty"
        });
    }

    // Find propertyType and update it with the request body
    Property.findByIdAndUpdate(req.params.propertyTypeId, {
        property_type: req.body.property_type,
        roof_area: req.body.roof_area,
        electricity_price: req.body.electricity_price
    }, {new: true})
    .then(property => {
        if(!property) {
            return res.status(404).send({
                message: "propertyType not found with id " + req.params.propertyTypeId
            });
        }
        res.send(property);
    }).catch(err => {
        if(err.kind === 'ObjectID') {
            return res.status(404).send({
                message: "propertyType not found with id " + req.params.propertyTypeId
            });                
        }
        return res.status(500).send({
            message: "Error updating propertyType with id " + req.params.propertyTypeId
        });
    });
};

// Delete a propertyType with the specified propertyTypeId in the request
exports.deleteProperty = (req, res) => {
    Property.findByIdAndRemove(req.params.propertyTypeId)
    .then(property => {
        if(!property) {
            return res.status(404).send({
                message: "propertyType not found with id " + req.params.propertyTypeId
            });
        }
        res.send({message: "propertyType deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "propertyType not found with id " + req.params.propertyTypeId
            });                
        }
        return res.status(500).send({
            message: "Could not delete propertyType with id " + req.params.propertyTypeId
        });
    });
};
