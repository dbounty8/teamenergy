const calculate = require('../controllers/calculate');

module.exports = (app) => {
  app.get('/calculate/:propertyType/:longitude/:latitude', calculate);
};
