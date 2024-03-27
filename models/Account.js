import mongoose, { Schema } from 'mongoose';

const AccountSchema = new mongoose.Schema(
	{
		userId: {
			type: Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
		phone: String,
		accountName: String,
		accountNumber: String,
		bank: String,
		balance: {
			type: Number,
			default: 100,
		},
		pin: {
			type: String,
			default: '1234',
			min: 4,
		},
		verified: Boolean,
		isDefaultPin: {
			type: Boolean,
			default: true,
		},
	},
	{ timestamps: true }
);

const Account = mongoose.model('Account', AccountSchema);
export default Account;
