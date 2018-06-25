const mongoose = require('mongoose');

const propertySchema = mongoose.Schema({
    propertyTypeID: Number,
    property_type: String,
    roof_area: Number,
    electricity_price: Number
}, {
    timestamps: true
});

module.exports = mongoose.model('property', propertySchema);