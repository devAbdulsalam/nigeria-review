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
	getCareer,
	getTerms,
	getContact,
} from '../../controllers/app/index.js';
import authRoutes from './auth.js';
import businessRoutes from './business.js';
import listingRoutes from './listings.js';
import reviewRoutes from './reviews.js';
import {
	requiredAuth,
	requiredAuthPage,
	requiredAuthorize,
} from '../../middlewares/requireAuth.js';
const router = express.Router();
router.get('/', getIndex);
router.get('/index', getIndex);
router.use('/', authRoutes);
router.get('/register', getRegister);
router.get('/register-advertizer', getRegisterAdvertizer);
router.get('/advert', getAdvert);
router.get('/advertise', getAdvert);
router.get('/add-advert', requiredAuthPage, getAddAdvert);
router.get('/dashboard', requiredAuthPage, getDashboard);
router.get('/my-profile', requiredAuthPage, getProfile);
router.get('/update-password', requiredAuthPage, getUpdatePassword);
router.get('/author/:id', getAuthor);
router.use('/', businessRoutes);
router.use('/', listingRoutes);
router.use('/', reviewRoutes);
router.get('/about-us', getAbout);
router.get('/pricing', getPricing);
router.get('/contact', getContact);
router.get('/terms', getTerms);
router.get('/career', getCareer);
export default router;
