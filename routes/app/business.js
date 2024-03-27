import express from 'express';
import {
	getAddBusiness,
	getBusinessProfile,
	getClaimBusiness,
} from '../../controllers/app/business.js';
const router = express.Router();
import {
	requiredAuth,
	requiredAuthPage,
} from '../../middlewares/requireAuth.js';
// business
router.get('/add-business', requiredAuthPage, getAddBusiness);
router.get('/submit-business', requiredAuthPage, getAddBusiness);
router.get('/claim-business', requiredAuthPage, getClaimBusiness);
router.get('/business-profile', requiredAuthPage, getBusinessProfile);
export default router;
