const express = require('express');
const advocateController = require('../controllers/advocate.controller');
const authController = require('../controllers/auth.controller');

const router = express.Router();

// Public routes
router.get('/', advocateController.getAdvocates);
router.get('/specialties', advocateController.getSpecialties);
router.get('/certifications', advocateController.getCertifications);
router.get('/:id', advocateController.getAdvocate);

// Protected routes
router.use(authController.protect);

// Match with advocates based on quiz
router.post('/match', advocateController.matchWithAdvocates);

module.exports = router;
