const mongoose = require('mongoose');

const IrradiationSchema = mongoose.Schema({
    irridationID: Number,
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

module.exports = mongoose.model('irradiations', IrradiationSchema);