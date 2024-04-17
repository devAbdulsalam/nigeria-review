import jwt from 'jsonwebtoken';
import asyncHandler from '../utils/asyncHandler.js';
import User from '../models/User.js';
export const requireAuth = async (req, res, next) => {
	// verify user is authenticated
	const { authorization } = req.headers;
	const token =
		req.cookies?.accessToken ||
		authorization?.split(' ')[1] ||
		req.header('Authorization')?.replace('Bearer ', '');

	if (!token) {
		return res.status(401).json({ error: 'Authorization token required' });
	}
	try {
		const { _id } = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
		const user = await User.findOne({ _id }).select('-password -refreshToken');
		if (!user) {
			return res.status(401).json({ error: 'Invalid access token' });
		}
		req.user = user;
		next();
	} catch (error) {
		console.log(error);
		res.status(401).json({ error: 'Request is not authorized' });
	}
};

export const verifyPermission = (roles = []) =>
	asyncHandler(async (req, res, next) => {
		if (!req.user?._id) {
			throw new Error(401, 'Unauthorized request');
		}
		if (roles.includes(req.user?.role)) {
			next();
		} else {
			throw new Error(403, 'You are not allowed to perform this action');
		}
	});

const requiredAuth = (req, res, next) => {
	if (!req.session.isLoggedIn) {
		return res.status(401).send('Require Authtentication');
	}
	next();
};
const requiredAuthPage = (req, res, next) => {
	if (!req.session.isLoggedIn) {
		// Save the original URL to session before redirecting to login
		req.session.returnTo = req.originalUrl;
		return res.redirect('/login');
	}
	next();
};
const isLogin = (req, res, next) => {
	if (req.session.isLoggedIn) {
		return res.redirect('/home');
	}
	next();
};
const requiredAuthorize = (requiredRole) => {
	return (req, res, next) => {
		// Check if the user has the required role
		if (req.session.user && requiredRole.includes(req.session.user?.role)) {
			next();
		} else {
			// User does not have the required role, redirect or show an error page
			res.status(403).send('You are not allowed to perform this action');
		}
	};
};

export { requiredAuth, requiredAuthPage, isLogin, requiredAuthorize };
