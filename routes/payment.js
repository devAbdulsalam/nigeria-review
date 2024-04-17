import express from 'express';
const router = express.Router();
// const requireAuth = require('../middlewares/requireAuth');
import {
	getPaymentOption,
	updatePaymentOption,
	createPaymentOption,
} from '../controllers/payment.js';

// // get user
router.get('/get-payment-option', getPaymentOption);
router.post('/create-payment-option', createPaymentOption);
router.patch('/update-payment-option', updatePaymentOption);
// router.delete('/', updatePaymentOption);

export default router;
