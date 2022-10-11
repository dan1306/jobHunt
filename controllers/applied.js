const Hunt = require('../models/hunt');
const Applied = require('../models/applied');

module.exports = {
    create,
    getAppliedJobs
};

async function create(req, res) {
    console.log(req.body)
    try {

        let newApplication = new Applied()
        newApplication.JobTitle = req.body.JobTitle
        newApplication.DateApplied = req.body.DateApplied
        newApplication.JobDescription = req.body.JobDescription
        newApplication.userId = req.body.userId
        newApplication = await newApplication.save()
        
        let hunt = await Hunt.findById(req.body.id)
        hunt.applied.push(newApplication._id)
        hunt = await hunt.save()

        res.status(200).json("all good")
    } catch (err){
        res.status(400).json(err)
    }

}

async function getAppliedJobs(req, res) {



    // if (req.user) {
    //     console.log(req.user)
    //     res.status(200).json('all good')
    // } else {
    //     console.log('user MIA')
    //     res.status(400).json('NOT all good')

    // }


    console.log(req.params)

    let id = req.params.id

    let hunt = await Hunt.findById(id)
    hunt = await hunt.populate('applied')

    res.json(hunt.applied)

    
}