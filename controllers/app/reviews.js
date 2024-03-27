import Review from '../../models/Review.js';

export const getReviews = async (req, res, next) => {
	try {
		const user = await req.session.user;
		const reviews = await Review.find({ userId: user._id });
		res.render('my-reviws', {
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
