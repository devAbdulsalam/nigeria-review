import User from '../models/User.js';
import Review from '../models/Review.js';
import Business from '../models/Business.js';
import Listing from '../models/Listing.js';
import { ApiError } from '../utils/ApiError.js';
import mongoose from 'mongoose';
import fs from 'fs';
import { uploader } from '../utils/cloudinary.js';
import { hash } from '../utils/hash.js';
import {
	getPaginatedPayload,
	businessSearchConditions,
	listingsSearchConditions,
} from '../utils/getPaginatedPayload.js';
import Notification from '../models/Notification.js';
export const getBusinesss = async (req, res) => {
	const page = +(req.query.page || 1);
	const limit = +(req.query.limit || 10);
	const query = req.query.query?.toLowerCase(); // search query
	const inc = req.query.inc?.split(','); // only include fields mentioned in this query

	try {
		let filter;

		if (query) {
			const searchConditions = businessSearchConditions(query);
			filter = { ...filter, ...searchConditions };
		}

		const options = {
			lean: true,
			skip: (page - 1) * limit,
			limit: limit,
			select: inc,
		};

		const business = await Business.find(filter, null, options);
		const totalItems = await Business.countDocuments(filter);

		res.status(200).json({
			data: getPaginatedPayload(business, page, limit, totalItems),
			message: 'Business fetched successfully',
			success: true,
		});
	} catch (error) {
		console.log(error);
		res
			.status(500)
			.json({ message: 'Failed to fetch business', success: false });
	}
};
export const addBusiness = async (req, res) => {
	const userId = req.user._id;
	const { name, description, email, phone } = req.body;
	try {
		if (!id || !mongoose.isValidObjectId(id)) {
			return res.status(404).json({ error: 'Enter a valid user' });
		}
		if (!req.file) {
			throw new ApiError(400, 'Business logo is required');
		}
		const logo = await uploader(req.file.path, 'logo');
		const checkBusiness = await Business.findOne({ userId });
		let business;
		if (!checkBusiness) {
			business = await Business.create({
				name,
				description,
				logo,
				phone,
				email,
				userId,
				primary: true,
			});
		} else {
			business = await Business.create({
				name,
				description,
				logo,
				phone,
				email,
				userId,
			});
		}
		await fs.promises.unlink(req.file.path);
		res.status(200).json({ business, message: 'Business added successfully' });
	} catch (error) {
		console.log(error);
		if (req.file) {
			await fs.promises.unlink(req.file.path);
		}
		throw new ApiError(401, error?.message || 'Server error');
	}
};
export const registerBusiness = async (req, res) => {
	const {
		firstName,
		lastName,
		businessName,
		description,
		email,
		phone,
		address,
		password,
	} = req.body;
	try {
		if (!req.file) {
			return res.status(400).json({ error: 'Business logo is required' });
		}
		const existingUser = await User.findOne({ email });
		if (existingUser) {
			await fs.promises.unlink(req.file.path);
			return res.status(409).json({ error: 'Email Address already Exists' });
		}
		const logo = await uploader(req.file.path, 'logo');
		const hashedPassword = await hash(password);
		const user = await User.create({
			firstName,
			email,
			phone,
			lastName,
			role: 'BUSINESS',
			address,
			password: hashedPassword,
		});
		if (!user) {
			await fs.promises.unlink(req.file.path);
			return res
				.status(400)
				.json({ error: 'Unable to register business user' });
		}
		const business = await Business.create({
			name: businessName,
			description,
			logo,
			address,
			claimed: true,
			primary: true,
			phone,
			email,
			userId: user._id,
		});
		await fs.promises.unlink(req.file.path);
		res
			.status(200)
			.json({ business, message: 'Business registration successfully' });
	} catch (error) {
		console.log(error);
		if (req.file) {
			await fs.promises.unlink(req.file.path);
		}
		throw new ApiError(401, error?.message || 'Server errer');
	}
};
export const registerAdvertizer = async (req, res) => {
	const {
		firstName,
		lastName,
		businessName,
		description,
		email,
		phone,
		address,
		password,
	} = req.body;
	try {
		if (!req.file) {
			return res.status(400).json({ error: 'Business logo is required' });
		}
		const existingUser = await User.findOne({ email });
		if (existingUser) {
			await fs.promises.unlink(req.file.path);
			return res.status(409).json({ error: 'Email Address already Exists' });
		}
		const logo = await uploader(req.file.path, 'logo');
		const hashedPassword = await hash(password);
		const user = await User.create({
			firstName,
			email,
			phone,
			lastName,
			role: 'BUSINESS',
			address,
			password: hashedPassword,
		});
		if (!user) {
			await fs.promises.unlink(req.file.path);
			return res
				.status(400)
				.json({ error: 'Unable to register business user' });
		}
		const business = await Business.create({
			name: businessName,
			description,
			logo,
			address,
			claimed: true,
			primary: true,
			phone,
			email,
			userId: user._id,
		});
		res
			.status(200)
			.json({ business, message: 'Advetizer registered successfully' });
	} catch (error) {
		console.log(error);
		if (req.file) {
			await fs.promises.unlink(req.file.path);
		}
		throw new ApiError(401, error?.message || 'Server errer');
	}
};
export const getBusiness = async (req, res) => {
	const { id } = req.params;
	try {
		const business = await Business.findById(id);
		res.status(200).json(business);
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: error.message });
	}
};
export const claimBusiness = async (req, res) => {
	const { id } = req.params;
	try {
		const user = await User.findById(id);
		const business = await Business.findByIdAndUpdate(
			id,
			{ userId: user._id },
			{ new: true }
		);
		res.status(200).json(business);
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: error.message });
	}
};
export const approveBusiness = async (req, res) => {
	const { id } = req.params;
	const { status } = req.body;
	try {
		const business = await Business.findById(id);
		if (!business) {
			return res.status(401).json({ message: 'Business not found' });
		}
		if (!business.ownner) {
			return res.status(401).json({ message: 'Business has not been claimed' });
		}
		const newBusiness = await Business.findByIdAndUpdate(
			id,
			{ status },
			{ new: true }
		);
		await Notification.create({
			userId: business.userId,
			title: 'Business Approved',
			content: `Your Business ${business.name} has been approved`,
		});
		res.status(200).json(newBusiness);
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: error.message });
	}
};
export const addReview = async (req, res) => {
	const { id } = req.params;
	try {
		const business = await Business.find(id);
		const listing = await Listing.find(id);
		if (!business && !listing) {
			return res.status(400).json({ message: 'Invalid business type' });
		}
		const review = await Review.create({ ...req.body });
		res.status(200).json(review);
	} catch (error) {
		console.log(error);
		res.status(500).json({ error, message: 'something went wrong' });
	}
};
export const getReviews = async (req, res) => {
	const { id } = req.params;
	try {
		const business = await Review.find(id);
		res.status(200).json(business);
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: error.message });
	}
};
export const getReview = async (req, res) => {
	const { id } = req.params;
	try {
		const business = await Review.findById(id);
		res.status(200).json(business);
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: error.message });
	}
};
export const deleteReview = async (req, res) => {
	const { id } = req.params;
	try {
		const review = await Review.findByIdAndDelete(id);
		if (!review) {
			res.status(400).json({ message: 'Invalid review id' });
		}
		res.status(200).json(review);
	} catch (error) {
		res.status(500).json({ error, message: 'something went wrong' });
	}
};
export const getListings = async (req, res) => {
	const page = +(req.query.page || 1);
	const limit = +(req.query.limit || 10);
	const query = req.query.query?.toLowerCase(); // search query
	const inc = req.query.inc?.split(','); // only include fields mentioned in this query

	try {
		let filter = { schoolId: req.user._id };

		if (query) {
			const searchConditions = listingsSearchConditions(query);
			filter = { ...filter, ...searchConditions };
		}

		const options = {
			lean: true,
			skip: (page - 1) * limit,
			limit: limit,
			select: inc,
		};

		const listings = await Listing.find(filter, null, options);
		const totalItems = await Listing.countDocuments(filter);

		res.status(200).json({
			data: getPaginatedPayload(listings, page, limit, totalItems),
			message: 'Listings fetched successfully',
			success: true,
		});
	} catch (error) {
		console.log(error);
		res
			.status(500)
			.json({ message: 'Failed to fetch listings', success: false });
	}
};
