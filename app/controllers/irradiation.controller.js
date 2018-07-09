const Irradiation = require('../models/irradiation.model.js');

    // Create and Save a new Note
exports.createIrradiation = (req, res) => {
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

    // Create a irradiation
    const irradiation = new Irradiation({
        irradiationID: randomID,
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
            message: err.message || "Some error occurred while creating the irradiation."
        });
    });
};

// Retrieve and return all cities from the database.
exports.findAllIrradiation = (req, res) => {
    Irradiation.find()
    .then(irradiations => {
        res.send(irradiations);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving irradiation."
        });
    });
};
  
// Find a single irradiation with a propertyTypeId
exports.findOneIrradiation = (req, res) => {
Irradiation.findById(req.params.irradiationID)
.then(data => {
    if(!data) {
        return res.status(404).send({
            message: "propertyType not found with id " + req.params.irradiationID
        });            
    }
    res.send(irradiation);
}).catch(err => {
    if(err.kind === 'ObjectId') {
        return res.status(404).send({
            message: "irradiation not found with id " + req.params.irradiationID
        });                
    }
    return res.status(500).send({
        message: "Error retrieving irradiation with id " + req.params.irradiationID
    });
});
};

// Update a propertyType identified by the propertyTypeId in the request
exports.updateIrradiation = (req, res) => {
// Validate Request
if(!req.body.content) {
    return res.status(400).send({
        message: "irradiation content can not be empty"
    });
}

// Find propertyType and update it with the request body
Irradiation.findByIdAndUpdate(req.params.irradiationID, {
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    postcode: req.body.postcode,
    city: req.body.city,
    propertyType: req.body.propertyType
}, {new: true})
.then(data => {
    if(!data) {
        return res.status(404).send({
            message: "Irradiation not found with id " + req.params.irradiationID
        });
    }
    res.send(irradiation);
}).catch(err => {
    if(err.kind === 'ObjectId') {
        return res.status(404).send({
            message: "Irradiation not found with id " + req.params.irradiationID
        });                
    }
    return res.status(500).send({
        message: "Error updating Irradiation with id " + req.params.irradiationID
    });
});
};

// Delete a propertyType with the specified propertyTypeId in the request
exports.deleteIrradiation = (req, res) => {
Irradiation.findByIdAndRemove(req.params.irradiationID)
.then(data => {
    if(!data) {
        return res.status(404).send({
            message: "Irradiation not found with id " + req.params.irradiationID
        });
    }
    res.send({message: "Irradiation deleted successfully!"});
}).catch(err => {
    if(err.kind === 'ObjectId' || err.name === 'NotFound') {
        return res.status(404).send({
            message: "Irradiation not found with id " + req.params.irradiationID
        });                
    }
    return res.status(500).send({
        message: "Could not delete Irradiation with id " + req.params.irradiationID
    });
});
};