const Hunt = require('../models/hunt');


module.exports = {
    create,
    getHunt
};


async function create(req, res) {
    console.log(req.body)
    try {
        await Hunt.create({ HuntName: req.body.HuntName, userId: req.body.userId })
        
        res.status(200).json("all good")
    } catch (err){
        res.status(400).json(err)
    }
}

async function getHunt(req, res) {



    // if (req.user) {
    //     console.log(req.user)
    //     res.status(200).json('all good')
    // } else {
    //     console.log('user MIA')
    //     res.status(400).json('NOT all good')

    // }


    Hunt.find({userId: req.user._id}, (err, hunts) => {
        if (err) {
           
            res.status(500).json(err)
        } else {
            console.log(hunts)
            res.json(hunts)
        }
    } )
    
}