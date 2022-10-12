const Hunt = require('../models/hunt');
const Offer = require('../models/offer');

module.exports = {
    create,
    getOffers,
    editOffer,
    deleteOffer
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

    let id = req.params.id
    let hunt = await Hunt.findById(id)
    hunt = await hunt.populate('offer')

    console.log(hunt.offer)

    res.json(hunt.offer)
    
}

async function editOffer(req, res) {

    console.log(req.body)

    try {
        let edit = await Offer.findById(req.body.id)
        edit.PayPerYear = req.body.PayPerYear
        edit.starDate = req.body.starDate
        edit = await edit.save()
        console.log(edit)
        res.status(200).json("all good")
    }
    catch (err) {
        console.log(err)
        res.status(400).json(err)
    }
    
}

async function deleteOffer(req, res) {
    
    try {
        let hunt = await Hunt.findById(req.body.huntId)

        for (let i = 0; i < hunt.offer.length; i++){
            if (hunt.offer[i]._id.toString() === req.body.id) {
                hunt.offer.splice(i, 1)
            }
        }
        
        await hunt.save()

        await Offer.findByIdAndDelete(req.body.id)
        res.status(200).json("all good")

    } catch (err) {
        res.status(400).json(err)

    }
    

}