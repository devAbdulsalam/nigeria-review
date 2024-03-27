import express from 'express';
import {
	getIndex,
	getRegister,
	getRegisterAdvertizer,
	getDashboard,
	getProfile,
	getUpdatePassword,
	getAdvert,
	getPricing,
	getAuthor,
	getAbout,
	getAddAdvert,
} from '../../controllers/app/index.js';
import authRoutes from './auth.js';
import businessRoutes from './business.js';
import listingRoutes from './listings.js';
import {
	requiredAuth,
	requiredAuthPage,
	requiredAuthorize,
} from '../../middlewares/requireAuth.js';
const router = express.Router();
router.get('/', getIndex);
router.get('/index', getIndex);
router.get('/about', getAbout);
router.get('/pricing', getPricing);
router.get('/author', getAuthor);
router.get('/advert', getAdvert);
router.use('/', authRoutes);
router.get('/register', getRegister);
router.get('/register-advertizer', getRegisterAdvertizer);
router.get('/add-advert', requiredAuthPage, getAddAdvert);
router.get('/dashboard', requiredAuthPage, getDashboard);
router.get('/my-profile', requiredAuthPage, getProfile);
router.get('/update-password', requiredAuthPage, getUpdatePassword);
router.use('/', businessRoutes);
router.use('/', listingRoutes);
export default router;
