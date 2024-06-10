const express = require('express');
const customerCtrl = require('./customer.controllers');
const { authenticateToken } = require('../middlewares/authenticator');

const router = express.Router();

router.route('/register').post(customerCtrl.register);
router.route('/login').post(customerCtrl.login);
router.route('/verify-member').post(authenticateToken, customerCtrl.verifyMember);
router.route('/edit-details').post(authenticateToken, customerCtrl.editProfileDetails);    
router.route('/change-password').post(authenticateToken, customerCtrl.changePassword);

module.exports = router;    