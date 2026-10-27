const express = require('express');
const router = express.Router();
const adminController = require('./admin.controller');
const { protect } = require('../../middlewares/auth.middleware');
const { authorize } = require('../../middlewares/role.middleware');

// All routes under /api/admin require valid JWT Token and Admin role
router.use(protect, authorize('admin'));

router.get('/dashboard/stats', (req, res, next) => adminController.getDashboardStats(req, res, next));
router.get('/users', (req, res, next) => adminController.getUsers(req, res, next));
router.patch('/users/:id/role', (req, res, next) => adminController.updateUserRole(req, res, next));
router.delete('/users/:id', (req, res, next) => adminController.deleteUser(req, res, next));

module.exports = router;
