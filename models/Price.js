import mongoose, { Schema } from 'mongoose';

const PriceSchema = new mongoose.Schema(
	{
		userId: {
			type: Schema.Types.ObjectId,
			ref: 'User',
		},
		businessId: {
			type: Schema.Types.ObjectId,
			ref: 'Business',
		},
		title: {
			type: String,
			required: true,
		},
		price: {
			type: Number,
			default: 0,
		},
		category: {
			type: String,
			required: true,
		},
		description: {
			type: String,
		},
		status: {
			type: String,
			default: 'ACTIVE',
		},
		isPrimary: {
			type: Boolean,
			default: false,
		},
	},
	{ timestamps: true }
);

const Price = mongoose.model('Price', PriceSchema);
export default Price;
