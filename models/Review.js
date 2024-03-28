import mongoose, { Schema } from 'mongoose';

const ReviewSchema = new mongoose.Schema(
	{
		itemId: {
			type: Schema.Types.ObjectId,
			ref: 'Business || Listing',
			required: true,
		},
		userId: {
			type: Schema.Types.ObjectId,
			ref: 'User',
		},
		name: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
		},
		comment: {
			type: String,
			required: true,
		},
		rating: {
			type: Number,
			required: true,
		},
		status: String,
	},
	{ timestamps: true }
);

// Middleware to update average rating and total reviews in Business or Listing
ReviewSchema.post('save', async function (doc) {
	try {
		const itemId = doc.itemId;

		// Calculate average rating and total reviews for the updated Listing
		const [listingStats, relatedListings] = await Promise.all([
			this.model('Review').aggregate([
				{ $match: { itemId } },
				{
					$group: {
						_id: null,
						avgRating: { $avg: '$rating' },
						totalReviews: { $sum: 1 },
					},
				},
			]),
			this.model('Listing').find({
				businessId: (await this.model('Listing').findById(itemId)).businessId,
			}),
		]);

		const listingAvgRating = listingStats[0].avgRating;
		const listingTotalReviews = listingStats[0].totalReviews;

		// Update the corresponding Listing model
		await this.model('Listing').updateOne(
			{ _id: itemId },
			{
				$set: {
					averageRating: listingAvgRating,
					totalReviews: listingTotalReviews,
				},
			}
		);

		const businessId = relatedListings[0].businessId;

		// Calculate business average rating and total reviews
		const [businessStats] = await this.model('Listing').aggregate([
			{ $match: { businessId } },
			{
				$group: {
					_id: null,
					avgRating: { $avg: '$averageRating' },
					totalReviews: { $sum: '$totalReviews' },
				},
			},
		]);

		const businessAvgRating = businessStats.avgRating;
		const businessTotalReviews = businessStats.totalReviews;

		// Update Business model average rating and total reviews
		await this.model('Business').updateOne(
			{ _id: businessId },
			{
				$set: {
					averageRating: businessAvgRating,
					totalReviews: businessTotalReviews,
				},
			}
		);
	} catch (error) {
		// Handle errors
		console.error('Error updating models:', error);
	}
});

const Review = mongoose.model('Review', ReviewSchema);
export default Review;
