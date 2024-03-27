import express from 'express';
import { check, body } from 'express-validator';
import User from '../../models/User.js';
import {
	getLogin,
	getSignup,
	postLogin,
	postSignup,
	postLogout,
	getForgotPassword,
	postForgotPassword,
	getConfirmOtp,
	getChangePassword,
	postChangePassword,
} from '../../controllers/app/auth.js';
const router = express.Router();
router.get('/login', getLogin);
router.get('/signup', getSignup);

router.post(
	'/login',
	[
		body('email').isEmail().withMessage('Please enter a valid email address.'),
		body('password', 'Password has to be valid.')
			.isLength({ min: 5 })
			.isAlphanumeric()
			.trim(),
	],
	postLogin
);
const validateSignup = [
	check('email')
		.isEmail()
		.withMessage('Please enter a valid email.')
		.custom((value, { req }) => {
			return User.findOne({ email: value }).then((userDoc) => {
				if (userDoc) {
					return Promise.reject(
						'E-Mail exists already, please pick a different one.'
					);
				}
			});
		})
		.normalizeEmail(),
	body('firstName', 'Please enter a first name and at least 5 characters.'),
	body('lastName', 'Please enter a last name and at least 5 characters.'),
	body(
		'password',
		'Please enter a password with only numbers and text and at least 5 characters.'
	)
		.isLength({ min: 5 })
		.isAlphanumeric()
		.trim(),
	// body('confirmPassword')
	// 	.trim()
	// 	.custom((value, { req }) => {
	// 		if (value !== req.body.password) {
	// 			throw new Error('Passwords have to match!');
	// 		}
	// 		return true;
	// 	}),
];
router.post('/signup', validateSignup, postSignup);

router.post('/logout', postLogout);

router.get('/forgot-password', getForgotPassword);
router.get('/confirm-otp', getConfirmOtp);

router.post('/forgot-password', postForgotPassword);

router.get('/change-password/:token', getChangePassword);

router.post(
	'/change-password',
	[
		body(
			'password',
			'Please enter a password with only numbers and text and at least 5 characters.'
		)
			.isLength({ min: 5 })
			.isAlphanumeric()
			.trim(),
		body('cpassword')
			.trim()
			.custom((value, { req }) => {
				if (value !== req.body?.password) {
					throw new Error('Passwords have to match!');
				}
				return true;
			}),
	],
	postChangePassword
);
export default router;
