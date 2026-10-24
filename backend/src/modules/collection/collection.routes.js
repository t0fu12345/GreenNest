const express = require('express');
const router = express.Router();
const collectionController = require('./collection.controller');
const { protect, optionalAuth } = require('../../middlewares/auth.middleware');
const { authorize } = require('../../middlewares/role.middleware');

router.route('/')
  .get(optionalAuth, (req, res, next) => collectionController.getCollections(req, res, next))
  .post(protect, authorize('admin'), (req, res, next) => collectionController.createCollection(req, res, next));

router.route('/:id')
  .get(optionalAuth, (req, res, next) => collectionController.getCollectionById(req, res, next))
  .put(protect, authorize('admin'), (req, res, next) => collectionController.updateCollection(req, res, next))
  .delete(protect, authorize('admin'), (req, res, next) => collectionController.deleteCollection(req, res, next));

module.exports = router;
