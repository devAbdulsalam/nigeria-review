import mongoose, { Schema } from 'mongoose';
const SavedListingSchema = new mongoose.Schema(
	{
		userId: {
			type: Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
		listingId: {
			type: Schema.Types.ObjectId,
			ref: 'Listing',
			required: true,
		},
	},
	{ timestamps: true }
);

const SavedListing = mongoose.model('SavedListing', SavedListingSchema);
export default SavedListing;
