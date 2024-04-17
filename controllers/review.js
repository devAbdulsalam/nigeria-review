import Review from '../models/Review.js';

export const addDisLikes = async (req, res) => {
	try {
		const id = req.params.id;
		const review = await Review.findByIdAndUpdate(
			id,
			{ $inc: { disLikes: 1 } },
			{ new: true }
		);
		res.status(200).json(review);
	} catch (error) {
		console.error('Error adding dislikes:', error);
		res.status(500).json({ error: 'Internal Server Error' });
	}
};
export const addLikes = async (req, res) => {
	try {
		const id = req.params.id;
		const review = await Review.findByIdAndUpdate(
			id,
			{ $inc: { likes: 1 } },
			{ new: true }
		);
		res.status(200).json(review);
	} catch (error) {
		console.error('Error adding dislikes:', error);
		res.status(500).json({ error: 'Internal Server Error' });
	}
};
export const addLoves = async (req, res) => {
	try {
		const id = req.params.id;
		const review = await Review.findByIdAndUpdate(
			id,
			{ $inc: { loves: 1 } },
			{ new: true }
		);
		res.status(200).json(review);
	} catch (error) {
		console.error('Error adding dislikes:', error);
		res.status(500).json({ error: 'Internal Server Error' });
	}
};
