const Interested = require('../models/interested');

module.exports = {
    create
};
  
async function create(req, res) {
    console.log(req.body)
    try {
        await Interested.create({ JobTitle: req.body.JobTitle, JobDescription: req.body.JobDescription, userId: req.body.userId })
        
        res.status(200).json("all good")
    } catch (err){
        res.status(400).json(err)
    }
}