import express from 'express';
import {
	getListing,
	getAddListing,
	getMyListing,
	getListings,
	getSearchListings,
	getSavedListing,
	getSavedListings,
	getEditListing,
} from '../../controllers/app/listings.js';
const router = express.Router();
import { requiredAuthPage } from '../../middlewares/requireAuth.js';
// users

router.get('/listings', getSearchListings);
router.get('/search', getSearchListings);
router.get('/listings/:id', requiredAuthPage, getListing);
router.get('/my-listings', requiredAuthPage, getMyListing);
router.get('/add-listing', requiredAuthPage, getAddListing);
router.get('/edit-listing/:id', requiredAuthPage, getEditListing);
router.get('/saved-listings', requiredAuthPage, getSavedListings);
router.get('/saved-listings/:id', requiredAuthPage, getSavedListing);
export default router;
