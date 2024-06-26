import express from 'express';
import {
	getAllBusiness,
	getBusiness,
	registerBusiness,
	addBusiness,
	claimBusiness,
	updateBusiness,
	addReview,
	getReviews,
	getReview,
	deleteReview,
	registerAdvertizer,
} from '../controllers/business.js';
import { addPrice, deletePrice, updatePrice } from '../controllers/price.js';
import { requireAuth, verifyPermission } from '../middlewares/requireAuth.js';
import { upload } from '../middlewares/multer.js';
const router = express.Router();

router.get('/', requireAuth, getAllBusiness);
router.get(
	'/:id',
	requireAuth,
	verifyPermission(['ADMIN', 'BUSINESS']),
	getBusiness
);
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
	'/',
	upload.single('file'),
	requireAuth,
	verifyPermission(['ADMIN', 'BUSINESS']),
	addBusiness
);
router.post('/claim/:id', requireAuth, claimBusiness);
router.post('/register', upload.single('logo'), registerBusiness);
router.post('/register/advertizer', upload.single('logo'), registerAdvertizer);
router.post(
	'/price',
	requireAuth,
	verifyPermission(['ADMIN', 'BUSINESS']),
	addPrice
);
router.patch(
	'/price/:id',
	requireAuth,
	verifyPermission(['ADMIN']),
	updatePrice
);
router.delete(
	'/price/:id',
	requireAuth,
	verifyPermission(['ADMIN', 'BUSINESS']),
	deletePrice
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
router.patch(
	'/:id',
	requireAuth,
	verifyPermission(['ADMIN', 'BUSINESS']),
	updateBusiness
);
router.delete(
	'/reviews',
	requireAuth,
	verifyPermission(['ADMIN', 'BUSINESS']),
	deleteReview
);

export default router;
