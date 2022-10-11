const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const appliedSchema = new Schema({
    JobTitle: { type: String, required: true },
    JobDescription: { type: String, required: true },
    DateApplied: { type: String, required: true },
    userId: { type: String }

}, {
    timestamps: true,
})

module.exports = mongoose.model("Applied", appliedSchema)