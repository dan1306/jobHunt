const Offer = require('../models/offer');

module.exports = {
    create,
    getOffers
};

async function create(req, res) {
    console.log(req.body)
    try {
        await Offer.create({ JobTitle: req.body.JobTitle, PayPerYear: req.body.PayPerYear, starDate: req.body.starDate,  userId: req.body.userId })
        
        res.status(200).json("all good")
    } catch (err){
        res.status(400).json(err)
    }

}


async function getOffers(req, res) {

    Offer.find({}, (err, offers) => {
        if (err) {
           
            res.status(500).json(err)
        } else {
            console.log(offers)
            res.json(offers)
        }
    } )
    
}