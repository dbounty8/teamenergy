const Irradiations = require('../models/irradiation.model');

const getTotalIrradiation = (city) => {
  return Irradiations.aggregate([
    { $match: { city: city } },
    {
      $group: {
        _id: null,
        count: { $sum: "$hh" }
      }
    }
  ]).then((sumOfMonthlyAverages) => {
    return sumOfMonthlyAverages[0].count * 0.001 / 12 * 365;
  });
}

module.exports = getTotalIrradiation;
