const Axios = require('axios');

exports.getCoordinates = (req, res) => {
  const postcode = req.params.postcode;
  console.log(postcode);
  Axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${postcode}&key=AIzaSyAKlc9PNJR0EoHDL7zwtqZznYnoD7RPTnw`)
    .then((response) => {
      res.send(response.data);
    })
    .catch((error) => {
      res.status(500).send({
        message: error.message || "Could not get coordinates for postcode."
      });
    });
}
