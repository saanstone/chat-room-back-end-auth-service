'use strict';
const express = require('express');

const router = express.Router();


/**
 * This is common router which will navigate the api request as per the 
 * routes provided in the request url
 */
router.route('/login').post(require('../auth/login').login);
router.route('/token/verify').get(require('../auth/login').verifyAccessToken);

module.exports = { router };