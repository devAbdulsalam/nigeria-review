import express from 'express';
import { requireAuth, verifyPermission } from '../middlewares/requireAuth.js';
import {
	getListing,
	getUserListings,
	getListings,
	getBusinessListings,
	addManyListing,
	addListing,
	newListing,
	updateListing,
	updateListings,
	deleteListings,
	deleteListing,
} from '../controllers/listing.js';
import { upload } from '../middlewares/multer.js';

const uploadFields = [
	{ name: 'avatar', maxCount: 1 },
	{ name: 'logo', maxCount: 1 },
	{ name: 'coverImage', maxCount: 1 },
	{ name: 'gallery', maxCount: 10 },
];
const listingFields = [
	{ name: 'featuredImage', maxCount: 1 },
	{ name: 'itemImage', maxCount: 1 },
];

const router = express.Router();

router.post(
	'/',
	requireAuth,
	verifyPermission(['ADMIN', 'BUSINESS']),
	upload.fields(listingFields),
	addListing
);
router.post(
	'/new',
	requireAuth,
	verifyPermission(['ADMIN', 'BUSINESS']),
	upload.fields(listingFields),
	newListing
);
router.post(
	'/add',
	requireAuth,
	verifyPermission(['ADMIN', 'BUSINESS']),
	upload.fields(uploadFields),
	addManyListing
);
router.get(
	'/',
	requireAuth,
	verifyPermission(['USER', 'ADMIN', 'BUSINESS']),
	getUserListings
);
router.get(
	'/all',
	getListings
);
router.get(
	'/:id',
	requireAuth,
	verifyPermission(['USER', 'ADMIN', 'BUSINESS']),
	getListing
);
router.patch(
	'/',
	requireAuth,
	verifyPermission(['USER', 'ADMIN', 'BUSINESS']),
	updateListings
);
router.patch(
	'/:id',
	requireAuth,
	verifyPermission(['USER', 'ADMIN', 'BUSINESS']),
	updateListing
);
router.delete(
	'/',
	requireAuth,
	verifyPermission(['USER', 'ADMIN', 'BUSINESS']),
	deleteListings
);
router.delete(
	'/:id',
	requireAuth,
	verifyPermission(['USER', 'ADMIN', 'BUSINESS']),
	deleteListing
);

export default router;
