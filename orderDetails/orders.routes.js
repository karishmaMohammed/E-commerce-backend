const express = require('express');
const orderCtrl = require('./orders.controllers');

const { authenticateToken } = require('../middlewares/authenticator');

const router = express.Router();

router.route('/wish-list').post(authenticateToken, orderCtrl.addWishListItems);

module.exports = router; 