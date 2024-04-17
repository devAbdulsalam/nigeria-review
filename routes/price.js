import express from 'express';
import {
	getPrices,
	getPrice,
	createPrice,
	updatePrice,
	deletePrice,
} from '../controllers/price.js';
const router = express.Router();

router.get('/', getPrices);
router.get('/:id', getPrice);
router.post('/', createPrice);
router.patch('/', updatePrice);
router.delete('/:id', deletePrice);

export default router;
