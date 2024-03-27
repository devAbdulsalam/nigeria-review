import mongoose, { Schema } from 'mongoose';

const AdvertSchema = new mongoose.Schema(
	{
		userId: {
			type: Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
		title: {
			type: String,
			required: true,
		},
		subtitle: {
			type: String,
			required: true,
		},
		content: {
			type: String,
			required: true,
		},
	},
	{ timestamps: true }
);

const Advert = mongoose.model('Advert', AdvertSchema);
export default Advert;
