const express = require('express');
const router = express.Router();
const offertCtrl = require('../../controllers/offer');

router.post('/create', offertCtrl.create);

router.get('/getOffers/:id', offertCtrl.getOffers);

module.exports = router;