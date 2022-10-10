const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const offerSchema = new Schema({
    JobTitle: { type: String, required: true },
    PayPerYear: { type: String, required: true },
    starDate: { type: String, required: true },
    userId: { type: String }
}, {
    timestamps: true,
})

module.exports = mongoose.model("Offer", offerSchema)