
function calculateSavings(totalIrradiation, buildingType){
  // return totalIrradiation;
  const roofArea = 10; // Call to properties DB here
  const electrictyPrice = 0.15; // Call to properties DB
  const panelEfficiency = 0.15;
  const unitSaving = totalIrradiation * panelEfficiency * electrictyPrice;
  const totalSavings = {
    quarterCoverage: unitSaving * roofArea * 0.25,
    halfCoverage: unitSaving * roofArea * 0.5,
    fullCoverage: unitSaving * roofArea * 1,
  }
  return totalSavings;
}

module.exports = calculateSavings;
