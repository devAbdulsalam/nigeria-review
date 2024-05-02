import express from 'express';
const router = express.Router();
import { loginWithEmailOrPhone } from '../controllers/auth.js';

// // get user
router.post('/login', loginWithEmailOrPhone);
export default router;
