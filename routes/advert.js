import express from 'express';
import {
	getAdverts,
	getAdvert,
	createAdvert,
	updateAdvertStatus,
	deleteAdvert,
} from '../controllers/advert.js';
import { requireAuth, verifyPermission } from '../middlewares/requireAuth.js';
import { upload } from '../middlewares/multer.js';
const router = express.Router();

router.get('/', getAdverts);
router.get('/:id', getAdvert);
router.post(
	'/',
	upload.single('featuredImage'),
	requireAuth,
	verifyPermission(['ADMIN', 'BUSINESS']),
	createAdvert
);
router.patch(
	'/',
	requireAuth,
	verifyPermission(['ADMIN', 'BUSINESS']),
	updateAdvertStatus
);
router.delete(
	'/',
	requireAuth,
	verifyPermission(['ADMIN', 'BUSINESS']),
	deleteAdvert
);

export default router;
