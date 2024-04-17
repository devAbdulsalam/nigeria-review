import Amenity from '../models/Amenity.js';
export const addAmenity = async (req, res) => {
	try {
		const amenity = await Amenity.create({ ...req.body });
		res.status(200).json(amenity);
	} catch (error) {
		console.error('Error creating amenity:', error);
		res.status(500).json({ error: 'Internal Server Error' });
	}
};
export const createAmenity = async (req, res) => {
	try {
		const amenity = await Amenity.create({ ...req.body });
		res.status(200).json(amenity);
	} catch (error) {
		console.error('Error creating amenity:', error);
		res.status(500).json({ error: 'Internal Server Error' });
	}
};
export const getAmenities = async (req, res) => {
	try {
		const amenities = await Amenity.find();
		res.status(200).json(amenities);
	} catch (error) {
		console.error('Error creating amenity:', error);
		res.status(500).json({ error: 'Internal Server Error' });
	}
};
export const getAmenity = async (req, res) => {
	try {
		const amenity = await Amenity.findById({ _id: req.params.id });
		res.status(200).json(amenity);
	} catch (error) {
		console.error('Error creating amenity:', error);
		res.status(500).json({ error: 'Internal Server Error' });
	}
};
export const updateAmenity = async (req, res) => {
	try {
		const amenity = await Amenity.findByIdAndUpdate(
			{ _id: req.params.id },
			{ ...req.body }
		);
		res.status(200).json(amenity);
	} catch (error) {
		console.error('Error updating amenity:', error);
		res.status(500).json({ error: 'Internal Server Error' });
	}
};
export const deleteAmenity = async (req, res) => {
	try {
		const amenity = await Amenity.findByIdAndDelete({ _id: req.params.id });
		res.status(200).json(amenity);
	} catch (error) {
		console.error('Error deleting amenity:', error);
		res.status(500).json({ error: 'Internal Server Error' });
	}
};
