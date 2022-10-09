const express = require('express');
const router = express.Router();
const interestCtrl = require('../../controllers/interested');

router.post('/create', interestCtrl.create);

router.get('/getInterests', interestCtrl.getInterest);

router.delete('/deleteInterest', interestCtrl.deleteInterest )


module.exports = router;