const express = require('express');
const router = express.Router();
const adminController = require('./admin.controller');
const { protect } = require('../../middlewares/auth.middleware');
const { authorize } = require('../../middlewares/role.middleware');

// All routes under /api/admin require valid JWT Token and Admin role
router.use(protect, authorize('admin'));

router.get('/dashboard/stats', (req, res, next) => adminController.getDashboardStats(req, res, next));

module.exports = router;
