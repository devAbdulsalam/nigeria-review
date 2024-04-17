import express from 'express';
import {
	getFaqs,
	getFaq,
	createFaq,
	updateFaq,
	deleteFaq,
} from '../controllers/faq.js';
const router = express.Router();

router.get('/', getFaqs);
router.get('/:id', getFaq);
router.post('/', createFaq);
router.patch('/', updateFaq);
router.delete('/:id', deleteFaq);

export default router;
