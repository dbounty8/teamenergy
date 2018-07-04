const getCoordinates = require('../helpers/getCoordinates');
const findNearestCity = require('../helpers/findNearestCity');
const getTotalIrradiation = require('../helpers/getTotalIrradiation')
const calculateSavings = require('../helpers/calculateSavings')


const calculate = (req, res) => {
  const buildingType = req.params.buildingType;
  const postcode = req.params.postcode;
  getCoordinates(postcode)
    .then(coordinates => findNearestCity(coordinates.lng, coordinates.lat))
    .then(city => getTotalIrradiation(city[0].city))
    .then(totalIrradiation => calculateSavings(totalIrradiation, buildingType))
    .then(result => {
      res.json({
        "savings": result,
      });
    })
    .catch((error) => {
      res.json({"error": error.message});
    });
};

module.exports = calculate;
