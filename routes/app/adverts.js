import express from 'express';
import { getAdverts } from '../../controllers/app/adverts.js';
const router = express.Router();
import {
	requiredAuth,
	requiredAuthPage,
} from '../../middleware/requireAuth.js';
// users
router.get('/adverts', requiredAuth, getAdverts);
export default router;
