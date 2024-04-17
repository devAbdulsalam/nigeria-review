import express from 'express';
import {
	getClient,
	postTransaction,
	getTransactions,
	getTransaction,
} from '../controllers/client.js';
import { requireAuth } from '../middlewares/requireAuth.js';

const router = express.Router();
router.get('/', requireAuth, getClient);
router.post('/transactions', requireAuth, postTransaction);
router.get('/transactions', requireAuth, getTransactions);
router.get('/transactions/:id', requireAuth, getTransaction);
export default router;
