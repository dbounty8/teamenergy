const getCoordinates = require('../helpers/getCoordinates');
const findNearestCity = require('../helpers/findNearestCity');
const getTotalIrradiation = require('../helpers/getTotalIrradiation')

const calculate = (req, res) => {
  const buildingType = req.params.buildingType;
  const postcode = req.params.postcode;

  getCoordinates(postcode)
    .then(coordinates => findNearestCity(coordinates.lng, coordinates.lat))
    .then(city => getTotalIrradiation(city[0].city))
    .then((result) => {
      console.log('HERE');
      console.log(result);
      res.json({
        "totalIrradiation": result
      });
    })
    .catch((error) => {
      res.json({"error": error.message});
    });
};

module.exports = calculate;

