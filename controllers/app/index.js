import User from '../../models/User.js';
import Listing from '../../models/Listing.js';
import Site from '../../models/Site.js';
import Transaction from '../../models/Transaction.js';
import Notification from '../../models/Notification.js';
import Price from '../../models/Price.js';
import Business from '../../models/Business.js';
import {
	getIndexPageInfo,
	getDashboardInfo,
} from '../../middlewares/apphelpers.js';
export const getIndex = async (req, res, next) => {
	try {
		const user = await req.session.user;
		// const site = await Site.findOne().select('description');
		const getIndexInfo = await getIndexPageInfo(user?._id);
		const site = await Site.findOne();
		res.render('index', {
			user,
			...getIndexInfo,
			path: '/',
			site,
			isAuthenticated: req.session.isAuthenticated,
		});
	} catch (err) {
		const error = new Error(err);
		error.httpStatusCode = 500;
		return next(error);
	}
};
export function getRegister(req, res) {
	res.render('register', {
		path: '/register',
		pageTitle: 'Register business',
	});
}
export function getRegisterAdvertizer(req, res, next) {
	res.render('registerAdvertizer', {
		path: '/register',
		pageTitle: 'Register As Advertizer',
	});
}
export const getDashboard = async (req, res, next) => {
	try {
		const user = await req.session.user;
		const listings = await Listing.find({ userId: user._id });
		const totalListing = await Listing.countDocuments({ userId: user._id });
		const dasboardInfo = await getDashboardInfo(user._id);
		const site = await Site.findOne();
		const transactions = await Transaction.find({ userId: user._id })
			.limit(10)
			.sort({ createdOn: -1 });
		const followers = await User.find({ role: 'USER' })
			.limit(2)
			.select('firstName lastName email')
			.sort({ createdOn: -1 });

		const notifications = await Notification.find({
			userId: user._id,
			checked: false,
		})
			.limit(5)
			.sort({ createdOn: -1 });

		res.render('dashboard', {
			user,
			...dasboardInfo,
			listings,
			site,
			totalListing,
			totalBooking: 500,
			followers,
			invoices: transactions,
			activities: notifications,
			path: '/dashboard',
			pageTitle: 'dashboard',
			isAuthenticated: req.session.isAuthenticated,
		});
	} catch (err) {
		const error = new Error(err);
		error.httpStatusCode = 500;
		return next(error);
	}
};
export const getProfile = async (req, res) => {
	const user = req.session.user;
	const getIndexInfo = await getDashboardInfo(user._id);
	res.render('profile', {
		path: '/profile',
		pageTitle: 'User profile',
		user,
		...getIndexInfo,
	});
};
export const getUpdatePassword = async (req, res) => {
	const user = req.session.user;
	const getIndexInfo = await getDashboardInfo(user._id);
	res.render('changePassword', {
		path: '/change-password',
		pageTitle: 'User profile',
		user,
		...getIndexInfo,
	});
};

export const getListing = async (req, res, next) => {
	try {
		const user = await req.session.user;
		res.render('listing', {
			path: '/listing',
			pageTitle: 'listing',
			user,
			isAuthenticated: req.session.isAuthenticated,
		});
	} catch (err) {
		const error = new Error(err);
		error.httpStatusCode = 500;
		return next(error);
	}
};
export const getAdvert = async (req, res, next) => {
	try {
		const user = await req.session.user;
		res.render('advertise', {
			user,
			path: '/advert',
			isAuthenticated: req.session.isAuthenticated,
			// isNew: user.verified,
		});
	} catch (err) {
		const error = new Error(err);
		error.httpStatusCode = 500;
		return next(error);
	}
};
export const getPricing = async (req, res, next) => {
	try {
		const user = await req.session.user;
		const prices = await User.find({ role: 'USER' });
		res.render('pricing', {
			path: '/pricing',
			pageTitle: 'pricing',
			user,
			prices,
			isAuthenticated: req.session.isAuthenticated,
			// isNew: user.verified,
		});
	} catch (err) {
		const error = new Error(err);
		error.httpStatusCode = 500;
		return next(error);
	}
};
export const getSelectPricing = async (req, res, next) => {
	try {
		const user = await req.session.user;
		const prices = await Price.find({ businessId: req.params.id });
		res.render('pricing', {
			path: '/pricing',
			pageTitle: 'pricing',
			user,
			prices,
			isAuthenticated: req.session.isAuthenticated,
			// isNew: user.verified,
		});
	} catch (err) {
		const error = new Error(err);
		error.httpStatusCode = 500;
		return next(error);
	}
};
export const getAuthor = async (req, res, next) => {
	try {
		const user = await req?.session?.user;
		const author = await User.findOne({ _id: req.params.id }).select(
			'firstName lastName email avatar address phone'
		);
		const listings = await Listing.find({ userId: req.params.id });
		const totalListings = await Listing.count({ userId: req.params.id });
		const followers = await User.countDocuments({ _id: req.params.id });
		const following = await User.countDocuments({ _id: req.params.id });
		res.render('author', {
			path: '/author',
			pageTitle: 'Author',
			user,
			listings,
			totalListings,
			author,
			followers,
			following,
			authorId: req.params.id,
			isAuthenticated: req.session.isAuthenticated,
			// isNew: user.verified,
		});
	} catch (err) {
		const error = new Error(err);
		error.httpStatusCode = 500;
		return next(error);
	}
};
export const getAddAdvert = async (req, res, next) => {
	try {
		const user = await req.session.user;
		const dasboardInfo = await getDashboardInfo(user?._id);
		res.render('advertise', {
			path: '/add-advert',
			pageTitle: 'Add advert',
			user,
			...dasboardInfo,
			isAuthenticated: req.session.isAuthenticated,
			// isNew: user.verified,
		});
	} catch (err) {
		const error = new Error(err);
		error.httpStatusCode = 500;
		return next(error);
	}
};
export const getAbout = async (req, res, next) => {
	try {
		const user = await req.session.user;
		res.render('about', {
			path: '/about',
			pageTitle: 'About',
			user,
			isAuthenticated: req.session.isAuthenticated,
		});
	} catch (err) {
		const error = new Error(err);
		error.httpStatusCode = 500;
		return next(error);
	}
};
export const getTerms = async (req, res, next) => {
	try {
		const user = await req.session.user;
		res.render('terms', {
			path: '/terms',
			pageTitle: 'Terms',
			user,
			isAuthenticated: req.session.isAuthenticated,
		});
	} catch (err) {
		const error = new Error(err);
		error.httpStatusCode = 500;
		return next(error);
	}
};
export const getCareer = async (req, res, next) => {
	try {
		const user = await req.session.user;
		res.render('career', {
			path: '/career',
			pageTitle: 'Career',
			user,
			isAuthenticated: req.session.isAuthenticated,
		});
	} catch (err) {
		const error = new Error(err);
		error.httpStatusCode = 500;
		return next(error);
	}
};
export const getContact = async (req, res, next) => {
	try {
		const user = await req.session.user;
		res.render('contact', {
			path: '/contact',
			pageTitle: 'Contact',
			user,
			isAuthenticated: req.session.isAuthenticated,
		});
	} catch (err) {
		const error = new Error(err);
		error.httpStatusCode = 500;
		return next(error);
	}
};
