const express = require('express');
const router = express.Router();
const adminController = require('./admin.controller');
const { protect } = require('../../middlewares/auth.middleware');
const { authorize } = require('../../middlewares/role.middleware');

// Tất cả routes trong /api/admin đều yêu cầu JWT Token và role Admin
router.use(protect, authorize('admin'));

router.get('/dashboard/stats', (req, res, next) => adminController.getDashboardStats(req, res, next));

module.exports = router;
