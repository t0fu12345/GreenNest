const express = require('express');
const router = express.Router();
const contactController = require('./contact.controller');
const { protect } = require('../../middlewares/auth.middleware');
const { authorize } = require('../../middlewares/role.middleware');
const { validateContact } = require('../../middlewares/validator.middleware');

router.route('/')
  .post(validateContact, (req, res, next) => contactController.sendMessage(req, res, next))
  .get(protect, authorize('admin'), (req, res, next) => contactController.getMessages(req, res, next));

router.patch('/:id/status', protect, authorize('admin'), (req, res, next) => contactController.updateMessageStatus(req, res, next));
router.delete('/:id', protect, authorize('admin'), (req, res, next) => contactController.deleteMessage(req, res, next));

module.exports = router;
