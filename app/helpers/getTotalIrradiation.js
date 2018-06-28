const Irradiations = require('../models/irradiation.model');
//const mongoose = require('mongoose');

const getTotalIrradiation = (city) => {
  console.log("in getTotalIrradiation");
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
