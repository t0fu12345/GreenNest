const express = require('express');
const router = express.Router();
const authController = require('./auth.controller');
const { protect } = require('../../middlewares/auth.middleware');

router.post('/register', (req, res, next) => authController.register(req, res, next));
router.post('/login', (req, res, next) => authController.login(req, res, next));
router.get('/me', protect, (req, res, next) => authController.getMe(req, res, next));
router.put('/change-password', protect, (req, res, next) => authController.changePassword(req, res, next));

module.exports = router;
