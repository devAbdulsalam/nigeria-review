import User from '../../models/User.js';
import Business from '../../models/Business.js';
import Review from './../../models/Review.js';

export const getAddBusiness = async (req, res, next) => {
	try {
		const user = await req.session.user;
		const hasPrimaryBusiness = await Business.findOne({
			userId: user._id,
			primary: true,
		});
		let primary;
		if (hasPrimaryBusiness) {
			primary = false;
		} else {
			primary = true;
		}
		res.render('addBusiness', {
			path: '/business',
			pageTitle: 'Business',
			user,
			primary,
		});
	} catch (err) {
		const error = new Error(err);
		error.httpStatusCode = 500;
		return next(error);
	}
};

export const getBusinessProfile = async (req, res, next) => {
	try {
		const { id } = req.params;
		const business = await Business.find({ id });
		const reviews = await Review.find({ businessId: id });
		res.render('businessProfile', {
			business,
			reviews,
			path: '/business',
			isAuthenticated: true,
		});
	} catch (err) {
		const error = new Error(err);
		error.httpStatusCode = 500;
		return next(error);
	}
};
export const getClaimBusiness = async (req, res, next) => {
	try {
		const { id } = req.params;
		const business = await Business.find({ id });
		const reviews = await Review.find({ businessId: id });
		res.render('claimBusiness', {
			business,
			reviews,
			path: '/business',
			isAuthenticated: true,
		});
	} catch (err) {
		const error = new Error(err);
		error.httpStatusCode = 500;
		return next(error);
	}
};
