const express = require('express');
const router = express.Router();
const interestCtrl = require('../../controllers/interested');

router.post('/create', interestCtrl.create);


module.exports = router;