import express from 'express';
import {
	getUser,
	getAdminDashboard,
	getDashboardStats,
	getSite,
	updateSite,
	updateSiteLogo,
} from '../controllers/general.js';
import { requireAuth, verifyPermission } from '../middlewares/requireAuth.js';
import { upload } from '../middlewares/multer.js';

const router = express.Router();

router.get('/user/:id', requireAuth, getUser);
router.get('/dashboard', requireAuth, getDashboardStats);
router.get(
	'/',
	requireAuth,
	verifyPermission(['SUPER_ADMIN', 'ADMIN']),
	getAdminDashboard
);
router.get('/site', getSite);
router.post(
	'/site',
	requireAuth,
	verifyPermission(['SUPER_ADMIN', 'ADMIN']),
	updateSite
);
router.patch(
	'/site',
	requireAuth,
	verifyPermission(['SUPER_ADMIN', 'ADMIN']),
	updateSite
);
router.patch(
	'/site/logo',
	upload.single('logo'),
	requireAuth,
	verifyPermission(['SUPER_ADMIN', 'ADMIN']),
	updateSiteLogo
);
export default router;
