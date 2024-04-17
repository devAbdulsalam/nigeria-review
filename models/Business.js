import mongoose, { Schema } from 'mongoose';

const BusinessSchema = new mongoose.Schema(
	{
		userId: {
			type: Schema.Types.ObjectId,
			ref: 'User',
		},
		name: {
			type: String,
			require: true,
		},
		email: String,
		phone: String,
		description: String,
		address: String,
		category: String,
		totalReviews: {
			type: Number,
			default: 0,
		},
		averageRating: {
			type: Number,
			default: 0,
		},
		primary: {
			type: Boolean,
			require: false,
		},
		claimed: {
			type: Boolean,
			require: false,
		},
		logo: {
			public_id: {
				type: String,
			},
			url: {
				type: String,
			},
		},
		status: {
			type: String,
			enum: ['INACTIVE', 'ACTIVE', 'DEACTIVATED', 'DELETED'],
			default: 'INACTIVE',
		},
	},
	{ timestamps: true }
);

const Business = mongoose.model('Business', BusinessSchema);
export default Business;
