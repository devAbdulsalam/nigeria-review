import mongoose, { Schema } from 'mongoose';

const SiteSchema = new mongoose.Schema(
	{
		userId: {
			type: Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
		name: {
			type: String,
		},
		description: {
			type: String,
		},
		email: {
			type: String,
		},
		about: {
			type: String,
		},
		phone: {
			type: String,
		},
		slogan: {
			type: String,
		},
		state: {
			type: String,
		},
		lga: {
			type: String,
		},
		address: {
			type: String,
		},
		logo: {
			public_id: {
				type: String,
			},
			url: {
				type: String,
			},
		},
	},
	{ timestamps: true }
);

const Site = mongoose.model('Site', SiteSchema);
export default Site;
