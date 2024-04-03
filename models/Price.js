import mongoose, { Schema } from 'mongoose';

const PriceSchema = new mongoose.Schema(
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
		price: {
			type: Number,
			default: 0,
		},
	},
	{ timestamps: true }
);

const Price = mongoose.model('Price', PriceSchema);
export default Price;
