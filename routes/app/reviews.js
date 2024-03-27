import express from 'express';
import { getReviews } from '../../controllers/app/reviews.js';
const router = express.Router();
import { requiredAuthPage } from '../../middlewares/requireAuth.js';
// users
router.get('/reviews', requiredAuthPage, getReviews);
export default router;
