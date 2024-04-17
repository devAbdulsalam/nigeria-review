import express from 'express';
import {
	getAdmins,
	getUsers,
	getUser,
	updateUser,
	getTransactions,
	createTransaction,
	getTransaction,
	deleteUser,
	updateTransaction,
} from '../controllers/admin.js';
import { requireAuth, verifyPermission } from '../middlewares/requireAuth.js';
import { loginAdmin } from '../controllers/user.js';

const router = express.Router();

router.post('/login', loginAdmin);
router.get('/', requireAuth, verifyPermission(['ADMIN']), getAdmins);
router.get('/users', requireAuth, verifyPermission(['ADMIN']), getUsers);
router.get('/users/:id', requireAuth, verifyPermission(['ADMIN']), getUser);
router.delete(
	'/users/:id',
	requireAuth,
	verifyPermission(['ADMIN']),
	deleteUser
);
router.patch(
	'/users/:id',
	requireAuth,
	verifyPermission(['ADMIN']),
	updateUser
);
router.get(
	'/transactions',
	requireAuth,
	verifyPermission(['ADMIN']),
	getTransactions
);
router.get(
	'/transactions/:id',
	requireAuth,
	verifyPermission(['ADMIN']),
	getTransaction
);
router.post(
	'/transactions/:id',
	requireAuth,
	verifyPermission(['ADMIN']),
	createTransaction
);
router.patch(
	'/transactions/:id',
	requireAuth,
	verifyPermission(['ADMIN']),
	updateTransaction
);
// router.get("/performance/:id", getUserPerformance);

export default router;
