const Interested = require('../models/interested');

module.exports = {
    create,
    getInterest,
    deleteInterest
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


async function getInterest(req, res) {

    Interested.find({}, (err, interests) => {
        if (err) {
           
            res.status(500).json(err)
        } else {
            console.log(interests)
            res.json(interests)
        }
    } )
    
}

async function deleteInterest(req, res) {
    // console.log(req.body)
    // res.status(200).json("all good")
    
    try {
        await Interested.findByIdAndDelete(req.body.id)
        res.status(200).json("all good")
    }
    catch (err) {
        res.status(400).json(err)
}
    
}