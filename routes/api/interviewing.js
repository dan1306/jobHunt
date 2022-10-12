const express = require('express');
const router = express.Router();
const interviewingtCtrl = require('../../controllers/interviewing');

router.post('/create', interviewingtCtrl.create);

router.get('/getInterviews/:id', interviewingtCtrl.getInterviews);

router.put('/edit', interviewingtCtrl.editInterview)

module.exports = router;