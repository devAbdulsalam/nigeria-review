import User from '../models/User.js';
import Notification from '../models/Notification.js';
import Business from '../models/Business.js';
import Listing from '../models/Listing.js';
import Review from '../models/Review.js';

export const getIndexPageInfo = async () => {
	try {
		const listings = await Listing.find({ status: 'ACTIVE' }).limit(8);
		// aggregate and return the unique categories and number of listing, unique cities
		const topCategories = await Listing.aggregate([
			{
				$group: {
					_id: '$category',
					count: { $sum: 1 },
					cities: { $addToSet: '$city' },
				},
			},
			{
				$project: {
					category: '$_id',
					listings: '$count',
					cities: { $size: '$cities' },
				},
			},
		]);
		return {
			topCategories,
			listings,
		};
	} catch (err) {
		console.error('Error in getIndexInfo:', err);
		throw err;
	}
};
export const getDashboardInfo = async (userId) => {
	try {
		// Use await to correctly handle the asynchronous functions
		// const cartCountPromise = Cart.countDocuments({
		// 	userId,
		// 	isChecked: false,
		// });
		// const notificationCountPromise = Notification.countDocuments({
		// 	userId,
		// 	checked: false,
		// });

		// // Wait for both promises to resolve using Promise.all
		// const [cartCount, notificationCount] = await Promise.all([
		// 	cartCountPromise,
		// 	notificationCountPromise,
		// ]);
		const totalReviews = await Review.countDocuments({});
		const business = await Business.findOne({ userId, primary: true });

		return {
			business,
			totalReviews,
			totalRating: 3,
		};
	} catch (err) {
		// Instead of throwing a new Error, you can log the error and handle it appropriately
		console.error('Error in getDashboardInfo:', err);
		throw err; // You might want to handle this error in your calling code
	}
};
