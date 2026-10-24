const express = require('express');
const router = express.Router();
const plantController = require('./plant.controller');
const { protect, optionalAuth } = require('../../middlewares/auth.middleware');
const { authorize } = require('../../middlewares/role.middleware');
const { validatePlant } = require('../../middlewares/validator.middleware');

router.route('/')
  .get(optionalAuth, (req, res, next) => plantController.getPlants(req, res, next))
  .post(protect, authorize('admin'), validatePlant, (req, res, next) => plantController.createPlant(req, res, next));

router.route('/:id')
  .get(optionalAuth, (req, res, next) => plantController.getPlantById(req, res, next))
  .put(protect, authorize('admin'), (req, res, next) => plantController.updatePlant(req, res, next))
  .delete(protect, authorize('admin'), (req, res, next) => plantController.deletePlant(req, res, next));

router.get('/:id/related', optionalAuth, (req, res, next) => plantController.getRelatedPlants(req, res, next));

module.exports = router;
