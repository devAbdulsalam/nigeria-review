import express from 'express';
import { getReviews } from '../../controllers/app/adverts.js';
const router = express.Router();
import {
	requiredAuth,
	requiredAuthPage,
} from '../../middleware/requireAuth.js';
// users
router.get('/reviews', requiredAuthPage, getReviews);
export default router;
