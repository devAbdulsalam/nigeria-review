import Faq from '../models/Faq.js';
export const addFaq = async (req, res) => {
	try {
		const faq = await Faq.create({ ...req.body });
		res.status(200).json(faq);
	} catch (error) {
		console.error('Error creating faq:', error);
		res.status(500).json({ error: 'Internal Server Error' });
	}
};
export const createFaq = async (req, res) => {
	try {
		const faq = await Faq.create({ ...req.body });
		res.status(200).json(faq);
	} catch (error) {
		console.error('Error creating faq:', error);
		res.status(500).json({ error: 'Internal Server Error' });
	}
};
export const getFaqs = async (req, res) => {
	try {
		const faq = await Faq.find();
		res.status(200).json(faq);
	} catch (error) {
		console.error('Error creating faq:', error);
		res.status(500).json({ error: 'Internal Server Error' });
	}
};
export const getFaq = async (req, res) => {
	try {
		const faq = await Faq.findById({ _id: req.params.id });
		res.status(200).json(faq);
	} catch (error) {
		console.error('Error creating faq:', error);
		res.status(500).json({ error: 'Internal Server Error' });
	}
};
export const updateFaq = async (req, res) => {
	try {
		const faq = await Faq.findByIdAndUpdate(
			{ _id: req.params.id },
			{ ...req.body }
		);
		res.status(200).json(faq);
	} catch (error) {
		console.error('Error updating faq:', error);
		res.status(500).json({ error: 'Internal Server Error' });
	}
};
export const deleteFaq = async (req, res) => {
	try {
		const faq = await Faq.findByIdAndDelete({ _id: req.params.id });
		res.status(200).json(faq);
	} catch (error) {
		console.error('Error deleting faq:', error);
		res.status(500).json({ error: 'Internal Server Error' });
	}
};
