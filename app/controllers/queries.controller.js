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

// Retrieve and return all Queries from the database.
exports.findAllQueries = (req, res) => {
  query.find()
  .then(data => {
      res.send(data);
  }).catch(err => {
      res.status(500).send({
          message: err.message || "Some error occurred while retrieving Queries."
      });
  });
};

// Find a single Query with a propertyTypeId
exports.findOneQuery = (req, res) => {
  query.findById(req.params.queryID)
  .then(data => {
      if(!data) {
          return res.status(404).send({
              message: "propertyType not found with id " + req.params.queryID
          });            
      }
      res.send(query);
  }).catch(err => {
      if(err.kind === 'ObjectId') {
          return res.status(404).send({
              message: "Query not found with id " + req.params.queryID
          });                
      }
      return res.status(500).send({
          message: "Error retrieving query with id " + req.params.queryID
      });
  });
};

// Update a propertyType identified by the propertyTypeId in the request
exports.updateQuery = (req, res) => {
  // Validate Request
  if(!req.body.content) {
      return res.status(400).send({
          message: "Query content can not be empty"
      });
  }

  // Find propertyType and update it with the request body
  query.findByIdAndUpdate(req.params.queryID, {
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
              message: "Query not found with id " + req.params.queryID
          });
      }
      res.send(query);
  }).catch(err => {
      if(err.kind === 'ObjectId') {
          return res.status(404).send({
              message: "Query not found with id " + req.params.queryID
          });                
      }
      return res.status(500).send({
          message: "Error updating query with id " + req.params.queryID
      });
  });
};

// Delete a propertyType with the specified propertyTypeId in the request
exports.deleteQuery = (req, res) => {
  query.findByIdAndRemove(req.params.queryID)
  .then(data => {
      if(!data) {
          return res.status(404).send({
              message: "Query not found with id " + req.params.queryID
          });
      }
      res.send({message: "Query deleted successfully!"});
  }).catch(err => {
      if(err.kind === 'ObjectId' || err.name === 'NotFound') {
          return res.status(404).send({
              message: "Query not found with id " + req.params.queryID
          });                
      }
      return res.status(500).send({
          message: "Could not delete Query with id " + req.params.queryID
      });
  });
};