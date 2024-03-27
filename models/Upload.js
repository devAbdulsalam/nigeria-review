import mongoose, { Schema } from 'mongoose';

const UploadSchema = new mongoose.Schema(
	{
		userId: {
			type: Schema.Types.ObjectId,
			ref: 'User',
			required: true,
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

const Upload = mongoose.model('Upload', UploadSchema);
export default Upload;
