const calculate = require('../controllers/calculate');
const cities = require('../controllers/cities.controller.js');
const irradiation = require('../controllers/irradiation.controller.js');
const property = require('../controllers/property.controller.js');
const queries = require('../controllers/queries.controller.js');

module.exports = (app) => {

  // Create a new City
  app.post("/cities", cities.createCity);

  // Retrieve all cities
  app.get('/cities', cities.findAllCities);

  // Delete city
  app.delete('/cities/:city', cities.deleteCity);

  // Find Nearest city
  app.get('/findNearestCity/:longitude/:latitude', cities.findNearestCity);

  // Create a new Irridation
  app.post("/irradiation", irradiation.createIrradiation);

  // Retrieve all irradiation data
  app.get('/irradiation', irradiation.findAllIrradiation);

  //Find nearest city from geo coordinates
  app.get('/calculate/:propertyType/:longitude/:latitude', calculate);

  // Create a new Property Type
  app.post("/property", property.createProperty);

  // Retrieve all properties data
  app.get('/property', property.findAllProperty);

  // Create a new Property Type
  app.post("/queries", queries.createQuery);

  // Update property data
  app.put('/property/:propertyTypeId', property.updateProperty);

  // Retrieve one property from ID
  app.get('/property/:propertyTypeId', property.findOneProperty);

  // Retrieve all queries
  app.get('/queries', queries.findAllQueries);
};
