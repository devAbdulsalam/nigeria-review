import mongoose, { Schema } from 'mongoose';

const BlogSchema = new mongoose.Schema(
	{
		businessId: {
			type: Schema.Types.ObjectId,
			ref: 'Business || Listing',
			required: true,
		},
		userId: {
			type: Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
		name: {
			type: String,
			required: true,
		},
		comment: {
			type: String,
			required: true,
		},
		rating: {
			type: Number,
			required: true,
		},
		status: String,
	},
	{ timestamps: true }
);

const Blog = mongoose.model('Blog', BlogSchema);
export default Blog;
