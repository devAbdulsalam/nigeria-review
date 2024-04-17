import mongoose, { Schema } from 'mongoose';

const AmenitySchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		status: String,
	},
	{ timestamps: true }
);

const Amenity = mongoose.model('Amenity', AmenitySchema);
export default Amenity;
