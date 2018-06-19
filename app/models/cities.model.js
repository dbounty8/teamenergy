const mongoose = require('mongoose');

const CitiesSchema = mongoose.Schema({
    city: String,
    lattitude: String,
    longitude: String,
    optimal_inclination: Number
}, {
    timestamps: true
});

module.exports = mongoose.model('Cities', CitiesSchema);