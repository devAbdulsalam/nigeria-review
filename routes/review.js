import express from 'express';
import {
	addLikes,
	addDisLikes,
	addLoves,
} from '../controllers/business.js';
const router = express.Router();

router.patch('/:id/love', addLikes);
router.patch('/:id/like', addLoves);
router.patch('/:id/disLike', addDisLikes);

export default router;
