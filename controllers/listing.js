// import User from '../models/User.js';
import Listing from '../models/Listing.js';
import Business from '../models/Business.js';
import SavedListing from '../models/SavedListing.js';
import mongoose from 'mongoose';
import fs from 'fs';
import { uploader } from '../utils/cloudinary.js';
import { ApiError } from '../utils/ApiError.js';
export const addListing1 = async (req, res) => {
	const { businessId } = req.body;
	try {
		// Check if files are present in the request
		// if (!req.files || Object.keys(req.files).length === 0) {
		// 	throw new ApiError(400, 'School Avatar is required');
		// }
		console.log('singleFile', req.files);
		// Upload all single files in parallel
		const singleFilePromises = Object.values(req.files)
			.filter((files) => !Array.isArray(files)) // Exclude gallery files
			.map(
				(file) => console.log('singleFile', file)
				// return uploader(file[0]);
			);

		// Upload gallery files in parallel
		const galleryFilePromises = req.files['gallery']
			? req.files['gallery'].map((file) => uploader(file))
			: [];

		// Wait for all file uploads to complete
		const results = await Promise.all([
			...singleFilePromises,
			...galleryFilePromises,
		]);
		console.log('results.................results', results);
		// Create listing
		const business = await Business.findById(businessId);
		const listing = await Listing.create({
			businessId: business._id,
			...req.body,
			...results,
		});

		// Respond with success
		res.status(200).json({ listing, message: 'Listing added successfully' });
	} catch (error) {
		console.error(error);

		// Clean up uploaded files if any
		if (req.files) {
			const filePromises = Object.values(req.files)
				.flat()
				.map((file) => fs.promises.unlink(file.path));
			await Promise.all(filePromises);
		}

		// Handle errors
		if (error instanceof ApiError) {
			res.status(error.status).json({ message: error.message });
		} else {
			res.status(500).json({ message: 'Server error' });
		}
	}
};
export const addListing = async (req, res) => {
	const { businessId, socials } = req.body;

	try {
		// Validate required field and presence of files
		if (!req.files || !req.files.featuredImage) {
			return res
				.status(400)
				.json({ error: 'Listing featuredImage is required' });
		}
		if (!businessId) {
			return res.status(400).json({ error: 'Business Id is required' });
		}

		// Separate gallery and single uploads for efficient processing
		const singleUploads = Object.entries(req.files)
			.filter(([fieldName]) => fieldName !== 'gallery')
			.map(([fieldName, files]) => ({ fieldName, file: files[0] })); // Destructure directly

		const singleUploadResults = await Promise.all(
			singleUploads.map(async (upload) => {
				const { fieldName, file } = upload; // Destructure fieldName and file
				const result = await uploader(file.path, fieldName); // Use fieldName directly
				return { [upload.fieldName]: { ...result } }; // Spread result object directly to fieldName
			})
		);
		const cleanedResult = singleUploadResults.reduce((acc, obj) => {
			const key = Object.keys(obj)[0];
			acc[key] = obj[key];
			return acc;
		}, {});

		const business = await Business.findById(businessId);
		if (!business) {
		}
		const listing = await Listing.create({
			businessId,
			...req.body,
			socials: JSON.parse(socials),
			...cleanedResult,
		});

		// Delete temporary files after successful upload (assuming uploader handles cleanup)
		if (req.files) {
			const filePromises = Object.values(req.files)
				.flat()
				.map((file) => fs.promises.unlink(file.path));
			await Promise.all(filePromises);
		}
		res.status(200).json({ listing, message: 'Listing added successfully' });
	} catch (error) {
		console.error(error);

		// Clean up uploaded files if any
		if (req.files) {
			const filePromises = Object.values(req.files)
				.flat()
				.map((file) => fs.promises.unlink(file.path));
			await Promise.all(filePromises);
		}

		// Handle errors
		if (error instanceof ApiError) {
			res.status(error.status).json({ message: error.message });
		} else {
			res.status(500).json({ message: 'Server error' });
		}
	}
};
export const newListing = async (req, res) => {
	try {
		// Validate required field and presence of files
		if (!req.files || !req.files.featuredImage) {
			return res
				.status(400)
				.json({ error: 'Listing featuredImage is required' });
		}
		// Separate gallery and single uploads for efficient processing
		const singleUploads = Object.entries(req.files)
			.filter(([fieldName]) => fieldName !== 'gallery')
			.map(([fieldName, files]) => ({ fieldName, file: files[0] })); // Destructure directly

		const singleUploadResults = await Promise.all(
			singleUploads.map(async (upload) => {
				const { fieldName, file } = upload; // Destructure fieldName and file
				const result = await uploader(file.path, fieldName); // Use fieldName directly
				return { [upload.fieldName]: { ...result } }; // Spread result object directly to fieldName
			})
		);
		const cleanedResult = singleUploadResults.reduce((acc, obj) => {
			const key = Object.keys(obj)[0];
			acc[key] = obj[key];
			return acc;
		}, {});

		const listing = await Listing.create({
			...req.body,
			...cleanedResult,
		});

		// Delete temporary files after successful upload (assuming uploader handles cleanup)
		if (req.files) {
			const filePromises = Object.values(req.files)
				.flat()
				.map((file) => fs.promises.unlink(file.path));
			await Promise.all(filePromises);
		}
		res.status(200).json({ listing, message: 'Listing added successfully' });
	} catch (error) {
		console.error(error);

		// Clean up uploaded files if any
		if (req.files) {
			const filePromises = Object.values(req.files)
				.flat()
				.map((file) => fs.promises.unlink(file.path));
			await Promise.all(filePromises);
		}

		// Handle errors
		if (error instanceof ApiError) {
			res.status(error.status).json({ message: error.message });
		} else {
			res.status(500).json({ message: 'Server error' });
		}
	}
};

export const addManyListing = async (req, res) => {
	try {
		const singleFilePromises = Object.keys(req.files)
			.filter((field) => field !== 'gallery')
			.map(async (fieldName) => {
				const file = req.files[fieldName][0];
				return uploader(file);
			});

		const galleryFilePromises = req.files['gallery'].map(async (file) => {
			return uploader(file);
		});

		const results = await Promise.all([
			...singleFilePromises,
			...galleryFilePromises,
		]);
		res.json({ success: true, uploadedFiles: results });
	} catch (error) {
		console.error('Upload error:', error);
		res.status(500).json({ success: false, error: 'File upload failed' });
	}
};

export const updateListing = async (req, res) => {
	const id = req.params.id;
	try {
		if (!id || !mongoose.isValidObjectId(id)) {
			return res.status(404).json({ error: 'Enter a valid listing' });
		}
		const listing = await Listing.findByIdAndUpdate(id, {
			...req.body,
		});
		res.status(200).json({ listing, message: 'Listing updated successfully' });
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: 'server error' });
	}
};
export const updateListingImage = async (req, res) => {
	const id = req.user._id;
	const { name, description } = req.body;
	try {
		if (!id || !mongoose.isValidObjectId(id)) {
			return res.status(404).json({ error: 'Enter a valid teader' });
		}
		if (!req.file) {
			throw new ApiError(400, 'School logo is required');
		}
		const logo = await uploader(req.file.path, 'avatar');
		const teacher = await Listing.findByIdAndUpdate({
			name,
			description,
			logo,
			userId: id,
		});
		await fs.promises.unlink(req.file.path);
		res.status(200).json({ teacher, message: 'Listing updated successfully' });
	} catch (error) {
		console.log(error);
		await fs.promises.unlink(req.file.path);
		res.status(500).json({ message: 'server error' });
	}
};
export const getListing = async (req, res) => {
	const { id } = req.params;
	try {
		const listing = await Listing.findById(id).populate('userId');
		res.status(200).json(listing);
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: error.message });
	}
};
export const getBusinessListings = async (req, res) => {
	const { businessId } = req.params;
	try {
		const listings = await Listing.find({ businessId });
		//  const listings = await Listing.find({
		// 		businessId,
		// 		status: { $ne: 'DELETED' },
		// 	});

		res.status(200).json(listings);
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: error.message });
	}
};
export const getUserListings = async (req, res) => {
	const { id } = req.params;
	try {
		const listing = await Listing.find({
			userId: id,
			status: { $ne: 'DELETED' },
		});
		res.status(200).json(listing);
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: error.message });
	}
};
export const getListings = async (req, res) => {
	try {
		const listing = await Listing.find().populate('userId');
		res.status(200).json(listing);
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: error.message });
	}
};
export const getUserSavedListings = async (req, res) => {
	try {
		const listing = await SavedListing.find({ userId: req.user._id });
		res.status(200).json(listing);
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: error.message });
	}
};
export const getSavedListings = async (req, res) => {
	try {
		const listing = await SavedListing.find();
		res.status(200).json(listing);
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: error.message });
	}
};
export const getSavedListing = async (req, res) => {
	try {
		const listing = await SavedListing.find();
		res.status(200).json(listing);
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: error.message });
	}
};
export const deleteListing = async (req, res) => {
	const { id } = req.params;
	try {
		const listing = await Listing.findByIdAndUpdate(id, { status: 'DELETED' });
		if (!listing) {
			res.status(400).json({ message: 'Listing not found' });
		}
		res.status(200).json(listing);
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: error.message });
	}
};
export const updateListings = async (req, res) => {
	// const { id } = req.params;
	try {
		let listings = await Listing.find();
		for (const list of listings) {
			listings = await Listing.findOneAndUpdate(list._id, {
				status: 'PENDING',
			});
		}
		res.status(200).json(listings);
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: error.message });
	}
};
export const deleteListings = async (req, res) => {
	const { id } = req.params;
	try {
		const listings = await Listing.find();
		// const listings = await Listing.find({ businessId: id });
		if (!listings) {
			res.status(400).json({ message: 'No Listing not found' });
		}
		for (const list of listings) {
			await Listing.findByIdAndUpdate(list._id, { status: 'PENDING' });
		}
		res.status(200).json({ message: 'Listings deleted successsfully' });
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: error.message });
	}
};
