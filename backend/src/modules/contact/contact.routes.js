const express = require('express');
const router = express.Router();
const contactController = require('./contact.controller');
const { protect } = require('../../middlewares/auth.middleware');
const { authorize } = require('../../middlewares/role.middleware');

router.route('/')
  .post((req, res, next) => contactController.sendMessage(req, res, next))
  .get(protect, authorize('admin'), (req, res, next) => contactController.getMessages(req, res, next));

router.patch('/:id/status', protect, authorize('admin'), (req, res, next) => contactController.updateMessageStatus(req, res, next));

module.exports = router;
