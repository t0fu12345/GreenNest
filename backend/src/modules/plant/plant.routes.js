const express = require('express');
const router = express.Router();
const plantController = require('./plant.controller');
const { protect } = require('../../middlewares/auth.middleware');
const { authorize } = require('../../middlewares/role.middleware');

router.route('/')
  .get((req, res, next) => plantController.getPlants(req, res, next))
  .post(protect, authorize('admin'), (req, res, next) => plantController.createPlant(req, res, next));

router.route('/:id')
  .get((req, res, next) => plantController.getPlantById(req, res, next))
  .put(protect, authorize('admin'), (req, res, next) => plantController.updatePlant(req, res, next))
  .delete(protect, authorize('admin'), (req, res, next) => plantController.deletePlant(req, res, next));

router.get('/:id/related', (req, res, next) => plantController.getRelatedPlants(req, res, next));

module.exports = router;
