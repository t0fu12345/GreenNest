const express = require('express');
const router = express.Router();
const chatbotController = require('./chatbot.controller');

// POST /api/chatbot/message - Public endpoint for AI botanical consultation & disease diagnosis
router.post('/message', (req, res, next) => chatbotController.handleMessage(req, res, next));

module.exports = router;
