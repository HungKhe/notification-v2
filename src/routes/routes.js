const express = require('express');
const router = express.Router();
const userCtrl = require('../ctrl/user.ctrl')

router.route('/register')
    .post(userCtrl.initRegisterMember);

// router.route('/promotion')
//     .get(promotion.initGetPromotion)
//     .post(promotion.initAddPromotion)

module.exports = router;