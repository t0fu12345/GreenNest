const express = require('express');
const router = express.Router();
const galleryController = require('./gallery.controller');
const { protect } = require('../../middlewares/auth.middleware');
const { authorize } = require('../../middlewares/role.middleware');

router.route('/')
  .get((req, res, next) => galleryController.getGallery(req, res, next))
  .post(protect, authorize('admin'), (req, res, next) => galleryController.createImage(req, res, next));

router.post('/:id/like', (req, res, next) => galleryController.likeImage(req, res, next));

router.route('/:id')
  .put(protect, authorize('admin'), (req, res, next) => galleryController.updateImage(req, res, next))
  .delete(protect, authorize('admin'), (req, res, next) => galleryController.deleteImage(req, res, next));

module.exports = router;
