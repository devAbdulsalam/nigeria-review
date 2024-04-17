import mongoose, { Schema } from 'mongoose';

const ClaimBusinessSchema = new mongoose.Schema(
	{
		userId: {
			type: Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
		business: {
			type: Schema.Types.ObjectId,
			ref: 'Business',
			required: true,
		},
		price: {
			type: Schema.Types.ObjectId,
			ref: 'Price',
			required: true,
		},
		paid: {
			type: Boolean,
			default: false,
		},
	},
	{ timestamps: true }
);

const ClaimBusiness = mongoose.model('ClaimBusiness', ClaimBusinessSchema);
export default ClaimBusiness;
