const express = require('express');
const controller = require('./personalCollection.controller');
const { protect } = require('../../middlewares/auth.middleware');

const router = express.Router();

router.use(protect);
router.route('/')
  .get((req, res, next) => controller.list(req, res, next))
  .post((req, res, next) => controller.create(req, res, next));

router.route('/:id')
  .put((req, res, next) => controller.update(req, res, next))
  .delete((req, res, next) => controller.remove(req, res, next));

router.post('/:id/plants', (req, res, next) => controller.addPlant(req, res, next));
router.delete('/:id/plants/:plantId', (req, res, next) => controller.removePlant(req, res, next));

module.exports = router;
