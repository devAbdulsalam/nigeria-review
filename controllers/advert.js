import Advert from '../models/Advert.js';
import User from '../models/User.js';
import fs from 'fs';
import { uploader } from '../utils/cloudinary.js';
import { ApiError } from '../utils/ApiError.js';
import {
	getPaginatedPayload,
	AdvertsSearchConditions,
} from '../utils/getPaginatedPayload.js';
export const getAdverts = async (req, res) => {
	const page = +(req.query.page || 1);
	const limit = +(req.query.limit || 10);
	const query = req.query.query?.toLowerCase(); // search query
	const inc = req.query.inc?.split(','); // only include fields mentioned in this query

	try {
		let filter;

		if (query) {
			const searchConditions = AdvertsSearchConditions(query);
			filter = { ...filter, ...searchConditions };
		}

		const options = {
			lean: true,
			skip: (page - 1) * limit,
			limit: limit,
			select: inc,
		};

		const adverts = await Advert.find(filter, null, options);
		const totalItems = await Advert.countDocuments(filter);

		res.status(200).json({
			data: getPaginatedPayload(adverts, page, limit, totalItems),
			message: 'Adverts fetched successfully',
			success: true,
		});
	} catch (error) {
		console.log(error);
		res
			.status(500)
			.json({ message: 'Failed to fetch projects', success: false });
	}
};
export const getAdvert = async (req, res) => {
	try {
		const advert = Advert.findById({ _id: req.params.id });
		if (!advert) {
			return res.status(401).json({ message: 'Invalid advert id' });
		}
		res.status(200).json(advert);
	} catch (error) {
		console.log(error);
		res.status(404).json({ message: error.message });
	}
};
export const createAdvert = async (req, res) => {
	try {
		if (!req.file) {
			throw new ApiError(400, 'Advert image is required');
		}
		const checkUser = User.findById({ _id: req.user?._id });
		if (!checkUser) {
			return res.status(401).json({ message: 'Upgrade to post adverts' });
		}

		const featuredImage = await uploader(req.file.path, 'adverts');
		const advert = await Advert.create({
			userId: req.user._id,
			...req.body,
			featuredImage,
		});
		res.status(200).json(advert);
	} catch (error) {
		console.log(error);
		res.status(404).json({ message: error.message });
	}
};

export const updateAdvertStatus = async (req, res) => {
	try {
		const { id } = req.params;
		const { status } = req.body;
		const isAdvert = await Advert.findById(id);
		if (!isAdvert) {
			return res.status(401).json({ message: 'Invalid advert id' });
		}
		const advert = await Advert.findByIdAndUpdate(
			id,
			{ status },
			{ new: true }
		);
		res.status(200).json(advert);
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};
export const deleteAdvert = async (req, res) => {
	try {
		const { id } = req.params;
		const userId = req.user._id;

		// Check if the Advert exists and the user has permission
		const advert = await Advert.findById(id);
		if (
			!advert ||
			(req.user.role !== 'ADMIN' &&
				advert.userId.toString() !== userId.toString())
		) {
			return res.status(403).json({ message: 'Unauthorized to delete advert' });
		}
		await Advert.findByIdAndDelete(id);
		res.status(200).json({ message: 'Advert deleted successfully' });
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: 'Internal server error' });
	}
};
