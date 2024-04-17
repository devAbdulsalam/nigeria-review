import express from 'express';
import {
	getMyReview,
	getReviews,
	postReview,
} from '../../controllers/app/reviews.js';
const router = express.Router();
import { requiredAuthPage } from '../../middlewares/requireAuth.js';
// users
router.get('/reviews', requiredAuthPage, getMyReview);
router.get('/reviews/:id', getReviews);
router.post('/reviews/:id', postReview);
export default router;
