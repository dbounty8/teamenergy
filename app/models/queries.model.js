const mongoose = require('mongoose');
// DB Setup
// 1. Instal mongo: Brew install mongo
// log in to mongo from terminal: mongo ds263640.mlab.com:63640/teamenergy -u teamenergy -p ******
// Add index: db.cities.createIndex({location:"2dsphere"});

const QueriesSchema = mongoose.Schema({
    queryID: Number,
    name: String,
    email: String,
    phone: Number,
    postcode: String,
    city: String,
    propertyType: String,
}, {
    timestamps: true
});

module.exports = mongoose.model('Queries', QueriesSchema);