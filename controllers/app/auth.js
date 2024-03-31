import bcryptjs from 'bcryptjs';
import { validationResult } from 'express-validator';
import transporter from '../../utils/transporter.js';
import createTokens, { generateToken } from '../../utils/createTokens.js';
import User from '../../models/User.js';
import { hash } from '../../utils/hash.js';
const { compare } = bcryptjs;

export function getLogin(req, res, next) {
	let message = req.flash('error');
	if (message.length > 0) {
		message = message[0];
	} else {
		message = null;
	}
	res.render('login', {
		path: '/login',
		pageTitle: 'Login',
		errorMessage: message,
		successMessage: null,
		oldInput: {
			email: '',
			password: '',
		},
		validationErrors: [],
	});
}

export function getSignup(req, res, next) {
	let message = req.flash('error');
	if (message.length > 0) {
		message = message[0];
	} else {
		message = null;
	}
	res.render('signup', {
		path: 'signup',
		pageTitle: 'Signup',
		errorMessage: message,
		successMessage: null,
		oldInput: {
			firstName: '',
			lastName: '',
			email: '',
			password: '',
		},
		validationErrors: [],
	});
}

export const postLogin = async (req, res, next) => {
	const email = req.body.email;
	const password = req.body.password;

	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(422).render('login', {
			path: 'login',
			pageTitle: 'Login',
			errorMessage: errors.array()[0].msg,
			successMessage: null,
			oldInput: {
				email: email,
				password: password,
			},
			validationErrors: errors.array(),
		});
	}
	try {
		const user = await User.findOne({ email: email });
		if (!user) {
			return res.status(422).render('login', {
				path: 'login',
				pageTitle: 'Login',
				errorMessage: 'Invalid email or password.',
				successMessage: null,
				oldInput: {
					email: email,
					password: password,
				},
				validationErrors: [],
			});
		}
		const doMatch = await compare(password, user.password);
		if (doMatch) {
			const user = await User.findOne({ email: email }).select('-password');
			req.session.isLoggedIn = true;
			req.session.user = user;
			await req.session.save();
			const { accessToken, refreshToken } = await createTokens(user._id);
			// Redirect the user back to the original URL if available, or to a default page
			let redirectTo = req.session.returnTo || '/dashboard';
			delete req.session.returnTo; // Clear the stored URL
			const options = {
				httpOnly: true,
				secure: process.env.NODE_ENV === 'production',
			};
			res
				.cookie('accessToken', accessToken, options) // set the access token in the cookie
				.cookie('refreshToken', refreshToken, options)
				.redirect(redirectTo);
		} else {
			return res.status(422).render('login', {
				path: 'login',
				pageTitle: 'Login',
				errorMessage: 'Invalid email or password.',
				successMessage: null,
				oldInput: {
					email: email,
					password: password,
				},
				validationErrors: [],
			});
		}
	} catch (err) {
		console.log(err);
		const error = new Error(err);
		error.httpStatusCode = 500;
		return next(error);
	}
};

export function postSignup(req, res, next) {
	const firstName = req.body.firstName;
	const lastName = req.body.lastName;
	const email = req.body.email;
	const password = req.body.password;
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		console.log(errors.array());
		return res.status(422).render('signup', {
			path: 'signup',
			pageTitle: 'Signup',
			errorMessage: errors.array()[0].msg,
			oldInput: {
				firstName,
				lastName,
				email,
				password,
			},
			validationErrors: errors.array(),
		});
	}

	hash(password, 12)
		.then((hashedPassword) => {
			const user = new User({
				firstName,
				lastName,
				email,
				password: hashedPassword,
			});
			return user.save();
		})
		.then((result) => {
			return res.status(200).render('login', {
				path: 'login',
				pageTitle: 'Login',
				errorMessage: null,
				successMessage: 'Registration Successfull, Login to continue',
				oldInput: {
					email: email,
				},
				validationErrors: [],
			});
			// return transporter.sendMail({
			//   to: email,
			//   from: 'shop@node-complete.com',
			//   subject: 'Signup succeeded!',
			//   html: '<h1>You successfully signed up!</h1>'
			// });
		})
		.catch((err) => {
			const error = new Error(err);
			error.httpStatusCode = 500;
			return next(error);
		});
}

export function postLogout(req, res, next) {
	req.session.destroy((err) => {
		console.log(err);
		res.redirect('/');
	});
}

export function getForgotPassword(req, res, next) {
	let message = req.flash('error');
	if (message.length > 0) {
		message = message[0];
	} else {
		message = null;
	}
	res.render('forgot-password', {
		path: 'forgot-password',
		pageTitle: 'Forget Password',
		successMessage: null,
		errorMessage: message,
		oldInput: {
			email: null,
		},
	});
}
export function getConfirmOtp(req, res, next) {
	let message = req.flash('error');
	if (message.length > 0) {
		message = message[0];
	} else {
		message = null;
	}
	res.render('confirm-otp', {
		path: 'confirm-otp',
		pageTitle: 'Confrim Otp',
		successMessage: null,
		errorMessage: message,
	});
}

export const postForgotPassword = async (req, res, next) => {
	try {
		const { token } = await generateToken();
		if (!token) {
			return res.redirect('forgot-password');
		}
		const user = await User.findOne({ email: req.body.email });
		if (!user) {
			req.flash('error', 'No account with that email found.');
			return res.redirect('forgot-password');
		}
		user.resetToken = token;
		user.resetTokenExpiration = Date.now() + 3600000;
		await user.save();
		const mailOption = {
			to: req.body.email,
			from: process.env.APP_EMAIL,
			subject: 'Password reset',
			html: `
							<p>You requested a password reset</p>
							<p>Click this <a href="${process.env.BASE_URL}/change-password/${token}">link</a> to set a new password.</p>
						`,
		};
		const sendMessage = await transporter.sendMail(mailOption);
		if (sendMessage.error) {
			console.log(error);
			req.flash('error', 'Error sending password reset');
			res.render('forgot-password', {
				path: 'forgot-password',
				pageTitle: 'Forget Password',
				successMessage: null,
				errorMessage: 'Something went wrong',
				oldInput: {
					email: null,
				},
			});
		}
		// console.log(token, 'success');
		req.flash('success', 'Password reset mail sent sucessfully');
		res.redirect('login');
	} catch (err) {
		const error = new Error(err);
		error.httpStatusCode = 500;
		return next(error);
	}
};

export function getChangePassword(req, res, next) {
	const token = req.params.token;
	User.findOne({ resetToken: token, resetTokenExpiration: { $gt: Date.now() } })
		.then((user) => {
			let message = req.flash('error');
			if (message.length > 0) {
				message = message[0];
			} else {
				message = null;
			}
			if (!user) {
				message = 'Invalid reset token';
			}
			res.render('change-password', {
				path: 'change-password',
				pageTitle: 'Change Password',
				errorMessage: message,
				successMessage: null,
				userId: user?._id.toString(),
				oldInput: {
					cpassword: null,
					password: null,
				},
				passwordToken: token,
			});
		})
		.catch((err) => {
			const error = new Error(err);
			error.httpStatusCode = 500;
			return next(error);
		});
}

export const postChangePassword = async (req, res, next) => {
	const newPassword = req.body?.password;
	const cpassword = req.body.cpassword;
	const userId = req.body.userId;
	const passwordToken = req.body.passwordToken;
	const errors = validationResult(req);
	try {
		if (!errors.isEmpty()) {
			// req.query = passwordToken;
			return res.status(422).render('change-password', {
				path: 'change-password',
				pageTitle: 'Change Password',
				errorMessage: errors.array()[0].msg,
				successMessage: null,
				oldInput: {
					password: newPassword,
					cpassword,
				},
				userId,
				passwordToken,
				validationErrors: errors.array(),
			});
		}
		const resetUser = await User.findOne({
			_id: userId,
			resetToken: passwordToken,
			resetTokenExpiration: { $gt: Date.now() },
		});
		if (!resetUser) {
			req.flash('error', 'Invalid user or reset token.');
			return res.redirect('login');
		}
		const hashedPassword = await hash(newPassword, 12);
		resetUser.password = hashedPassword;
		resetUser.resetToken = undefined;
		resetUser.resetTokenExpiration = undefined;
		await resetUser.save();

		req.flash('success', 'Password changed successfully.');
		res.redirect('login');
	} catch (err) {
		const error = new Error(err);
		error.httpStatusCode = 500;
		return next(error);
	}
};
