import express from 'express';
import {
	getUser,
	getAdminDashboard,
	getDashboardStats,
} from '../controllers/general.js';
import { requireAuth, verifyPermission } from '../middlewares/requireAuth.js';

const router = express.Router();

router.get('/user/:id', requireAuth, getUser);
router.get('/dashboard', requireAuth, getDashboardStats);
router.get(
	'/',
	requireAuth,
	verifyPermission(['SUPER_ADMIN', 'ADMIN']),
	getAdminDashboard
);

export default router;
