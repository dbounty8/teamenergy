const Irradiations = require('../models/irradiation.model');
//const mongoose = require('mongoose');

const getTotalIrradiation = (city) => {
  return Irradiations.aggregate([
    { $match: { city: city } },
    {
      $group: {
        _id: null,
        count: { $sum: "$hh" }
      }
    }
  ]);
}

module.exports = getTotalIrradiation;
