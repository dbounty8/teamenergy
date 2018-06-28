const Cities = require('../models/cities.model.js');

const findNearestCity = (lng, lat) => {
  return Cities.find(
      { location:
          { $nearSphere:
              { $geometry:
                  {
                      type: "Point",
                      coordinates: [ lng, lat ]
                  },
                  // $maxDistance: <distance in meters>,
                  // $minDistance: <distance in meters>
              }
          }
      }
  ).limit(1)
  .then(city =>{
    return city;
  })
  .catch(error => {
    return error;
  })
};

module.exports = findNearestCity;
