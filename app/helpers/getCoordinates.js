const Axios = require('axios');

function getCoordinates(postcode){
  return Axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${postcode}&key=AIzaSyAKlc9PNJR0EoHDL7zwtqZznYnoD7RPTnw`)
    .then((response) => {
      return response.data.results[0].geometry.location;
    })
    .catch((error) => {
      // console.error(error);
      throw new Error(error);
    })
}

module.exports = getCoordinates;