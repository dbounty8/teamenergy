// Routes have been moved to routes.js file



module.exports = (app) => {
    const notes = require('../controllers/note.controller.js');

    // Create a new Note
    app.post('/notes', notes.create);

    // Retrieve all Notes
    app.get('/notes', notes.findAll);

    // Retrieve a single Note with noteId
    app.get('/notes/:noteId', notes.findOne);

    // Update a Note with noteId
    app.put('/notes/:noteId', notes.update);

    // Delete a Note with noteId
    app.delete('/notes/:noteId', notes.delete);

}

const calculate = require('../controllers/calculate');
const cities = require('../controllers/cities.controller.js');
const irradiation = require('../controllers/irradiation.controller.js');

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
};
