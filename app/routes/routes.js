const calculate = require('../controllers/calculate');
const cities = require('../controllers/cities.controller.js');
const irradiation = require('../controllers/irradiation.controller.js');
const google = require('../controllers/google.controller.js');
const property = require('../controllers/property.controller.js');
const queries = require('../controllers/queries.controller.js');

module.exports = (app) => {

  // Create a new City
  app.post("/cities", cities.createCity);

  // Retrieve all cities
  app.get('/cities', cities.findAllCities);

  // Delete city
  app.delete('/cities/:city', cities.deleteCity);

  // Retrieve all cities
  app.get('/findNearestCity/:lng/:lat', cities.findNearestCity);

  // Create a new Irridation
  app.post("/irradiation", irradiation.createIrradiation);

  // Retrieve all irradiation data
  app.get('/irradiation', irradiation.findAllIrradiation);

  // Calculate savings
  app.get('/calculate/:buildingType/:postcode', calculate);

  // Get coordinates
  app.get('/getCoordinates/:postcode', google.getCoordinates);

  // Create a new Property Type
  app.post("/property", property.createProperty);

  // Retrieve all properties
  app.get('/property', property.findAllProperty);

  // Retrieve all properties
  app.get('/property/:propertyTypeId', property.findOneProperty);

  // Stores a new query submission
  app.post("/queries", queries.createQuery);

  // Update property data
  app.put('/property/:propertyTypeId', property.updateProperty);

  // Retrieve one property from ID
  app.get('/property/:propertyTypeId', property.findOneProperty);

  // Retrieve all queries
  app.get('/queries', queries.findAllQueries);
};
