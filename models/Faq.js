import mongoose, { Schema } from 'mongoose';
const FaqSchema = new mongoose.Schema({
	question: {
		type: String,
		required: true,
	},
	answer: {
		type: String,
		required: true,
	},
	status: {
		type: String,
		default: 'ACTIVE',
	},
	category: {
		type: String,
	},
});

const Faq = mongoose.model('faq', FaqSchema);

export default Faq;
