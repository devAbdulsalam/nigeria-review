import mongoose, { Schema } from 'mongoose';
// Define the schema for the socials
const SocialSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    value: {
        type: String,
        required: true
    }
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
			required: true,
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
		amenties: [
			{
				type: String,
			},
		],
		socials: [SocialSchema],
		status: {
			type: String,
			default: 'PENDING',
			required: true,
			enum: ['PENDING', 'ACTIVE', 'INACTIVE', 'CANCELED', 'DELETED'],
		},
	},
	{ timestamps: true }
);

const Listing = mongoose.model('Listing', ListingSchema);
export default Listing;
