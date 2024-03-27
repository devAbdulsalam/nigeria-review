import User from '../../models/User.js';
import Listing from '../../models/Listing.js';
import Transaction from '../../models/Transaction.js';
import Notification from '../../models/Notification.js';
import {
	getIndexPageInfo,
	getDashboardInfo,
} from '../../middlewares/apphelpers.js';
export const getIndex = async (req, res, next) => {
	try {
		const user = await req.session.user;
		// const site = await Site.findOne().select('description');
		const getIndexInfo = await getIndexPageInfo(user._id);
		res.render('index', {
			user,
			...getIndexInfo,
			path: '/',
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
	res.render('register', {
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
		const transactions = await Transaction.find()
			.limit(50)
			.sort({ createdOn: -1 });
		const newUsers = await User.find({ role: 'USER' })
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
			totalListing,
			totalBooking: 500,
			followers: newUsers,
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
		res.render('advert', {
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
export const getAuthor = async (req, res, next) => {
	try {
		const user = await req.session.user;
		const author = await User.findOne({ _id: req.params.id }).select(
			'firstName lastName email avatar address'
		);
		res.render('author', {
			path: '/author',
			pageTitle: 'Author',
			user,
			author,
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
		res.render('addAdvert', {
			path: '/add-advert',
			pageTitle: 'Add advert',
			user,
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
