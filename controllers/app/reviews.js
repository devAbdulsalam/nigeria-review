import Review from '../../models/Review.js';
import Listing from '../../models/Listing.js';
export const getMyReview = async (req, res, next) => {
	try {
		const user = await req.session.user;
		const review = await Review.find({ userId: user._id });
		res.render('reviews', {
			path: '/my-reviews',
			pageTitle: 'Reviews',
			review,
			user,
		});
	} catch (err) {
		const error = new Error(err);
		error.httpStatusCode = 500;
		return next(error);
	}
};
export const getReviews = async (req, res, next) => {
	try {
		const user = await req.session.user;
		const listing = await Listing.findOne({ _id: req.params.id });
		const reviews = await Review.find({ id: req.params.id });
		res.render('reviews', {
			path: '/review',
			pageTitle: 'Reviews',
			reviews,
			listing,
			listingId: req.params.id,
			userId: user?._id,
			user,
		});
	} catch (err) {
		const error = new Error(err);
		error.httpStatusCode = 500;
		return next(error);
	}
};
export const postReview = async (req, res, next) => {
	try {
		const user = await req.session.user;
		const id = req.params?.id;
		const listing = await Listing.find({ id });
		const newReview = await Review.create({ ...req.body, userId: user?._id });
		const reviews = await Review.find({ id });
		res.render('reviews', {
			path: '/my-reviews',
			pageTitle: 'Reviews',
			reviews,
			listing,
			newReview,
			listingId: req.params.id,
			userId: user?._id,
			user,
		});
	} catch (err) {
		const error = new Error(err);
		error.httpStatusCode = 500;
		return next(error);
	}
};
