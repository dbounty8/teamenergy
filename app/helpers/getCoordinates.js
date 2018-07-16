const Axios = require('axios');
const googleKey = process.env.GOOGLE_KEY;

function getCoordinates(postcode){
  return Axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${postcode}&key=${googleKey}`)
    .then((response) => {
      return response.data.results[0].geometry.location;
    })
    .catch((error) => {
      // console.error(error);
      throw new Error(error);
    })
}

module.exports = getCoordinates;