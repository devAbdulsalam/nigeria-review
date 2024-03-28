import express from 'express';
import { getReviews, getReview } from '../../controllers/app/reviews.js';
const router = express.Router();
import { requiredAuthPage } from '../../middlewares/requireAuth.js';
// users
router.get('/reviews', requiredAuthPage, getReviews);
router.get('/review/:id', requiredAuthPage, getReview);
export default router;
