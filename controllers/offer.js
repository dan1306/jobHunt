const Hunt = require('../models/hunt');
const Offer = require('../models/offer');

module.exports = {
    create,
    getOffers
};

async function create(req, res) {
    console.log(req.body)
    try {

        let newOffer = new Offer()
        newOffer.JobTitle = req.body.JobTitle
        newOffer.PayPerYear = req.body.PayPerYear
        newOffer.starDate = req.body.starDate
        newOffer.userId = req.body.userId
        newOffer = await newOffer.save()
        
        let hunt = await Hunt.findById(req.body.id)
        hunt.offer.push(newOffer._id)
        hunt = await hunt.save()

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