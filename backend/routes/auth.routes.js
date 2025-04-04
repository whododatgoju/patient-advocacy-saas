const express = require('express');
const authController = require('../controllers/auth.controller');

const router = express.Router();

// Authentication routes
router.post('/signup', authController.signup);
router.post('/login', authController.login);

module.exports = router;
