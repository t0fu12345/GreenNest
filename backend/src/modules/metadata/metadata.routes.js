const express = require('express');
const router = express.Router();
const metadataController = require('./metadata.controller');

// GET /api/metadata/filters
router.get('/filters', (req, res, next) => metadataController.getFilters(req, res, next));

module.exports = router;
