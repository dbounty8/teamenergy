module.exports = (app) => {
    const notes = require('../controllers/note.controller.js');
    const cities = require('../controllers/cities.controller.js');
    const irradiation = require('../controllers/irradiation.controller.js');

    // Create a new Note
    app.post('/notes', notes.create);
    
    // Create a new City
    app.post("/cities", cities.createCity);

    // Create a new Irridation
    app.post("/irradiation", irradiation.createIrradiation);


    // Retrieve all Notes
    app.get('/notes', notes.findAll);

    // Retrieve a single Note with noteId
    app.get('/notes/:noteId', notes.findOne);

    // Update a Note with noteId
    app.put('/notes/:noteId', notes.update);

    // Delete a Note with noteId
    app.delete('/notes/:noteId', notes.delete);
}