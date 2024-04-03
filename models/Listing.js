import mongoose, { Schema } from 'mongoose';
// Define the schema for the socials
const SocialSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	value: {
		type: String,
		required: true,
	},
});
const ListingSchema = new mongoose.Schema(
	{
		userId: {
			type: Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
		businessId: {
			type: Schema.Types.ObjectId,
			ref: 'Business',
		},
		businessName: String,
		keywords: [
			{
				type: String,
			},
		],
		category: String,
		subCategories: String,
		description: String,
		productName: String,
		productDescription: String,
		featuredImage: {
			public_id: {
				type: String,
			},
			url: {
				type: String,
			},
		},
		latitude: String,
		longitude: String,
		location: String,
		state: String,
		city: String,
		address: String,
		zipCode: String,
		mobile: String,
		email: String,
		website: String,
		otherLoaction: String,
		lga: String,
		itemName: String,
		itemImage: String,
		itemDescription: String,
		itemPrice: Number,
		itemImage: {
			public_id: {
				type: String,
			},
			url: {
				type: String,
			},
		},
		totalReviews: {
			type: Number,
			default: 0,
		},
		averageRating: {
			type: Number,
			default: 0,
		},
		amenties: [
			{
				type: String,
			},
		],
		socials: [SocialSchema],
		claimed: {
			type: Boolean,
			default: false,
		},
		status: {
			type: String,
			default: 'PENDING',
			required: true,
			enum: ['PENDING', 'ACTIVE', 'INACTIVE', 'CANCELED', 'DELETED'],
		},
	},
	{ timestamps: true }
);
ListingSchema.index({ keywords: 'text' }); // Text index for full-text search
ListingSchema.index({ category: 1, location: 1 }); // Compound index for common searches

const Listing = mongoose.model('Listing', ListingSchema);
export default Listing;
