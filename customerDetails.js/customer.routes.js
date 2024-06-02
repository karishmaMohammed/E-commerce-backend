const express = require('express');
const customerCtrl = require('./customer.controllers');
const { tokenAuthentication } = require('../middlewares/authenticator');

const router = express.Router();

router.route('/create-details').post(tokenAuthentication,
    customerCtrl.customerDetails);

module.exports = router;    