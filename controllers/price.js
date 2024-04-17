import Price from '../models/Price.js';
export const addPrice = async (req, res) => {
	try {
		const price = await Price.create({ ...req.body });
		res.status(200).json(price);
	} catch (error) {
		console.error('Error creating price:', error);
		res.status(500).json({ error: 'Internal Server Error' });
	}
};
export const createPrice = async (req, res) => {
	try {
		const price = await Price.create({ ...req.body });
		res.status(200).json(price);
	} catch (error) {
		console.error('Error creating price:', error);
		res.status(500).json({ error: 'Internal Server Error' });
	}
};
export const getPrices = async (req, res) => {
	try {
		const price = await Price.find();
		res.status(200).json(price);
	} catch (error) {
		console.error('Error creating price:', error);
		res.status(500).json({ error: 'Internal Server Error' });
	}
};
export const getPrice = async (req, res) => {
	try {
		const price = await Price.findById({ _id: req.params.id });
		res.status(200).json(price);
	} catch (error) {
		console.error('Error creating price:', error);
		res.status(500).json({ error: 'Internal Server Error' });
	}
};
export const updatePrice = async (req, res) => {
	try {
		const price = await Price.findByIdAndUpdate(
			{ _id: req.params.id },
			{ ...req.body }
		);
		res.status(200).json(price);
	} catch (error) {
		console.error('Error updating price:', error);
		res.status(500).json({ error: 'Internal Server Error' });
	}
};
export const deletePrice = async (req, res) => {
	try {
		const price = await Price.findByIdAndDelete({ _id: req.params.id });
		res.status(200).json(price);
	} catch (error) {
		console.error('Error deleting price:', error);
		res.status(500).json({ error: 'Internal Server Error' });
	}
};
