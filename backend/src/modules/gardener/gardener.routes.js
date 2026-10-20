const express = require('express');
const router = express.Router();
const gardenerController = require('./gardener.controller');
const { protect } = require('../../middlewares/auth.middleware');
const { authorize } = require('../../middlewares/role.middleware');

router.route('/')
  .get((req, res, next) => gardenerController.getGardeners(req, res, next))
  .post(protect, authorize('admin'), (req, res, next) => gardenerController.createGardener(req, res, next));

router.route('/:id')
  .get((req, res, next) => gardenerController.getGardenerById(req, res, next))
  .put(protect, authorize('admin'), (req, res, next) => gardenerController.updateGardener(req, res, next))
  .delete(protect, authorize('admin'), (req, res, next) => gardenerController.deleteGardener(req, res, next));

module.exports = router;
