import express from 'express';
import {
	getAddBusiness,
	getBusinessProfile,
	getBusiness,
} from '../../controllers/app/business.js';
const router = express.Router();
import { requiredAuthPage } from '../../middlewares/requireAuth.js';
// business
router.get('/add-business', requiredAuthPage, getAddBusiness);
router.get('/submit-business', requiredAuthPage, getAddBusiness);
router.get('/business', getBusiness);
router.get('/business-profile/:id', requiredAuthPage, getBusinessProfile);
export default router;
