import express from 'express';
import {
	getBusiness,
	registerBusiness,
	addBusiness,
	addReview,
	getReviews,
	getReview,
	deleteReview,
	registerAdvertizer,
} from '../controllers/business.js';
import { requireAuth, verifyPermission } from '../middlewares/requireAuth.js';
import { upload } from '../middlewares/multer.js';
const router = express.Router();

router.get(
	'/',
	requireAuth,
	verifyPermission(['ADMIN', 'BUSINESS']),
	getBusiness
);
router.post(
	'/',
	upload.single('file'),
	requireAuth,
	verifyPermission(['ADMIN', 'BUSINESS']),
	addBusiness
);
router.post('/register', upload.single('logo'), registerBusiness);
router.post('/register/advertizer', upload.single('logo'), registerAdvertizer);
router.get(
	'/reviews',
	requireAuth,
	verifyPermission(['ADMIN', 'BUSINESS']),
	getReviews
);
router.get(
	'/reviews/:id',
	requireAuth,
	verifyPermission(['ADMIN', 'BUSINESS']),
	getReview
);
router.post(
	'/reviews/:id',
	requireAuth,
	verifyPermission(['ADMIN', 'BUSINESS']),
	addReview
);
router.patch(
	'/reviews',
	requireAuth,
	verifyPermission(['ADMIN', 'BUSINESS']),
	addReview
);
router.delete(
	'/reviews',
	requireAuth,
	verifyPermission(['ADMIN', 'BUSINESS']),
	deleteReview
);

export default router;
