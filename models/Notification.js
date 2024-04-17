import mongoose, { Schema } from 'mongoose';

const NotificationSchema = new mongoose.Schema(
	{
		userId: {
			type: Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
		title: String,
		content: String,
		checked: false,
		status: {
			type: String,
			enum: ['NEW', 'UNREAD', 'READ'],
			default: 'NEW',
		},
	},
	{ timestamps: true }
);

const Notification = mongoose.model('Notification', NotificationSchema);
export default Notification;
