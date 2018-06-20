const calculate = (req, res) => {
  const propertyType = req.params.propertyType;
  const longitude = req.params.longitude;
  const latitude = req.params.latitude;
  // Savings algorithm goes here

  // Test response
  res.json({
    "propertyType": propertyType,
    "longitude": longitude,
    "latitude": latitude,
  });
};
module.exports = calculate;
