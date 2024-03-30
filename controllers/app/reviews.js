import Review from '../../models/Review.js';
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
		const reviews = await Review.find({ id: req.params.id });
		res.render('reviews', {
			path: '/review',
			pageTitle: 'Reviews',
			reviews,
			listingId: req.params.id,
			userId: user._id,
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
		const newReview = await Review.create({ ...req.body, userId: user?._id });
		const reviews = await Review.find({ id });
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
