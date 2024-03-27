import Business from '../models/Business.js';
import Listing from '../models/Listing.js';
import Review from '../models/Review.js';
const updateTotalReview = async (doc) => {
	Review.aggregate([
		{
			$match: { userId: doc.userId },
		},
		{
			$group: {
				_id: null,
				totalRating: { $sum: '$rating' },
			},
		},
	]).exec(function async(err, result) {
		if (err) {
			console.error(err);
		} else {
			const totalRating = result.length > 0 ? result[0].totalRating : 0;
			updateListing(doc.userId, totalRating);
		}
	});
};

const updateListing = async (id, totalRating) => {
	await Listing.findOneAndUpdate(
		{ _id: id },
		// Set the totalRating field to the calculated Rating
		{ $set: { totalRating } },
		{ new: true }
	);
	await updateListingTotalRating(id);
};
const updateListingTotalRating = async (userId) => {
	// Retrieve customer by ID
	const listing = await Listing.findOne({ _id: userId });



	// Find reviews for a  listing
	const reviews = await Review.find({
		userId
	});


	// Update calculate average Rating
    for (const review of reviews) {
        
		let averageRating = review.rating | 5;
		listing.totalRating = averageRating;
		await listing.save();
	}
};

export { updateTotalReview, updateListingTotalRating };
