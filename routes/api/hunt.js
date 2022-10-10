const express = require('express');
const router = express.Router();
const huntCtrl = require('../../controllers/hunt');

router.post('/create', huntCtrl.create);
router.get('/getHunt', huntCtrl.getHunt);

module.exports = router;