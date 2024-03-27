import mongoose, { Schema } from 'mongoose';

const ResultSchema = new mongoose.Schema(
	{
		Student: {
			type: Schema.Types.ObjectId,
			ref: 'Student',
			required: true,
		},
		name: String,
		type: String,
		role: String,
		remark: String,
		status: {
			type: String,
			default: 'SCHEDULED',
			required: true,
			enum: [
				'SCHEDULED',
				'START',
				'ONGOING',
				'COMPLETED',
				'INCOMPLETED',
				'CANCELED',
			],
		},
		startDate: {
			type: Date,
			require: true,
		},
		endDate: {
			type: Date,
			require: true,
		},
	},
	{ timestamps: true }
);

const Result = mongoose.model('Result', ResultSchema);
export default Result;
