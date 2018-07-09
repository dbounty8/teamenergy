const Properties = require('../models/property.model.js');

function calculateSavings(totalIrradiation, buildingType){
  // return totalIrradiation;
  return Properties.find({
        "property_type": buildingType
    })
    .then((property) => {
      const roofArea = property[0].roof_area;
      const electrictyPrice =property[0].electricity_price;
      const panelEfficiency = 0.15;
      const unitSaving = totalIrradiation * panelEfficiency * electrictyPrice;
      const totalSavings = {
        quarterCoverage: unitSaving * roofArea * 0.25,
        halfCoverage: unitSaving * roofArea * 0.5,
        fullCoverage: unitSaving * roofArea * 1,
      }
      return totalSavings;
    });
}

module.exports = calculateSavings;
