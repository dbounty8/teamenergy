const mongoose = require('mongoose');
// DB Setup
// 1. Instal mongo: Brew install mongo
// log in to mongo from terminal: mongo ds263640.mlab.com:63640/teamenergy -u teamenergy -p ******
// Add index: db.cities.createIndex({location:"2dsphere"});

const CitiesSchema = mongoose.Schema({
    cityID: Number,
    city: String,
    location: {
        // It's important to define type within type field, because
        // mongoose use "type" to identify field's object type.
        type: {type: String, default: 'Point'},
        // Default value is needed. Mongoose pass an empty array to
        // array type by default, but it will fail MongoDB's pre-save
        // validation.
        coordinates: {type: [Number], default: [0, 0]}
    },
    optimal_inclination: Number
}, {
    timestamps: true
});

module.exports = mongoose.model('Cities', CitiesSchema);
