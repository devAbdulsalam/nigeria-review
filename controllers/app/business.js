import User from '../../models/User.js';
import Business from '../../models/Business.js';
import Site from '../../models/Site.js';

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
		const site = await Site.findOne();
		res.render('addBusiness', {
			path: '/business',
			pageTitle: 'Business',
			user,
			primary,
			site,
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
		const user = req.session.user;
		const business = await Business.findOne({ id });		
		const site = await Site.findOne();
		res.render('businessProfile', {
			business,
			user,
			totalRating: 0,
			path: '/business',
			isAuthenticated: true,
			site,
		});
	} catch (err) {
		const error = new Error(err);
		error.httpStatusCode = 500;
		return next(error);
	}
};
export const getBusiness = async (req, res, next) => {
	try {
		const user = req.session.user;
		const business = await Business.find();
		const site = await Site.findOne();
		res.render('business', {
			business,
			user,
			totalRating: 0,
			totalReviews: 0,
			path: '/business',
			isAuthenticated: true,
			site,
		});
	} catch (err) {
		const error = new Error(err);
		error.httpStatusCode = 500;
		return next(error);
	}
};
