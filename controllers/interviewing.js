const Hunt = require('../models/hunt');
const Interviewing = require('../models/interviewing');

module.exports = {
    create,
    getInterviews
};

async function create(req, res) {
    console.log(req.body)
    try {

        let newInterview = new Interviewing()
        newInterview.Company = req.body.Company
        newInterview.JobTitle = req.body.JobTitle
        newInterview.RoundOfInterview = req.body.RoundOfInterview
        newInterview.InterviewDate = req.body.InterviewDate
        newInterview.userId = req.body.userId
        newInterview = await newInterview.save()
        
        let hunt = await Hunt.findById(req.body.id)
        hunt.interviewing.push(newInterview._id)
        hunt = await hunt.save()

        res.status(200).json("all good")
    } catch (err){
        res.status(400).json(err)
    }

}


async function getInterviews(req, res) {

    let id = req.params.id
    let hunt = await Hunt.findById(id)
    hunt = await hunt.populate('interviewing')

    console.log(hunt.interviewing)

    res.json(hunt.interviewing)
    
}