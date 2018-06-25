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
    property.find()
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
    property.findById(req.params.propertyTypeId)
    .then(property => {
        if(!property) {
            return res.status(404).send({
                message: "propertyType not found with id " + req.params.propertyTypeId
            });            
        }
        res.send(property);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
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
    if(!req.body.content) {
        return res.status(400).send({
            message: "propertyType content can not be empty"
        });
    }

    // Find propertyType and update it with the request body
    property.findByIdAndUpdate(req.params.propertyTypeId, {
        title: req.body.title || "Untitled propertyType",
        content: req.body.content
    }, {new: true})
    .then(property => {
        if(!property) {
            return res.status(404).send({
                message: "propertyType not found with id " + req.params.propertyTypeId
            });
        }
        res.send(property);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
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
    property.findByIdAndRemove(req.params.propertyTypeId)
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
