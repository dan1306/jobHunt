const express = require('express');
const router = express.Router();
const usersCtrl = require('../../controllers/user');

router.post('/interested', usersCtrl.create);


module.exports = router;