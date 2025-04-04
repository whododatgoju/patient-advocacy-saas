const express = require('express');
const userController = require('../controllers/user.controller');
const authController = require('../controllers/auth.controller');

const router = express.Router();

// Protect all routes after this middleware
router.use(authController.protect);

// Current user routes
router.get('/me', userController.getMe);
router.patch('/updateMe', userController.updateMe);

// Get all providers
router.get('/providers', userController.getProviders);

// Get all advocates
router.get('/advocates', userController.getAdvocates);

// Get single provider or advocate by ID
router.get('/:id', userController.getUserById);

module.exports = router;
