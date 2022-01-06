const express = require('express');
const authCtrl = require('../controllers/AuthCtrl');
const router = express.Router();

/**
 * @route POST api/auth/register
 * @dec Register user
 * @access Public
 */
router.post('/register', authCtrl.register);

/**
 * @route POST api/auth/login
 * @dec Login user
 * @access Public
 */
router.post('/login', authCtrl.login);

module.exports = router;
