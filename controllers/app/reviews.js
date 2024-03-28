import Review from '../../models/Review.js';

export const getReviews = async (req, res, next) => {
	try {
		const user = await req.session.user;
		const reviews = await Review.find({ userId: user._id });
		res.render('reviews', {
			path: '/my-reviews',
			pageTitle: 'Reviews',
			reviews,
			user,
		});
	} catch (err) {
		const error = new Error(err);
		error.httpStatusCode = 500;
		return next(error);
	}
};
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
export const getReview = async (req, res, next) => {
	try {
		const user = await req.session.user;
		const review = await Review.find({ _id: req.params._id });
		res.render('review', {
			path: '/review',
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
export const postReview = async (req, res, next) => {
	try {
		const user = await req.session.user;
		const review = await Review.create({ ...req.body, userId: user._id });
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
