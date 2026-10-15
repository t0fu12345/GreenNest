const express = require('express');
const router = express.Router();
const gardenController = require('./garden.controller');
const { protect } = require('../../middlewares/auth.middleware');

router.use(protect);

router.route('/')
  .get((req, res, next) => gardenController.getGarden(req, res, next))
  .post((req, res, next) => gardenController.addToGarden(req, res, next));

router.delete('/:gardenItemId', (req, res, next) => gardenController.removeFromGarden(req, res, next));
router.post('/sync', (req, res, next) => gardenController.syncGarden(req, res, next));
router.put('/checklist', (req, res, next) => gardenController.updateChecklist(req, res, next));
router.post('/checklist/reset', (req, res, next) => gardenController.resetChecklist(req, res, next));
router.post('/bookmarks/toggle', (req, res, next) => gardenController.toggleBookmark(req, res, next));

module.exports = router;
