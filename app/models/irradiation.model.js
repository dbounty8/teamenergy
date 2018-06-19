const mongoose = require('mongoose');

const IrradiationSchema = mongoose.Schema({
    city: String,
    month: String,
    hh: Number,
    hopt: Number,
    h90: Number,
    iopt: Number,
    t24h: Number
}, {
    timestamps: true
});

module.exports = mongoose.model('Irradiation', IrradiationSchema);