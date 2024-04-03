import User from '../models/User.js';
import Transaction from '../models/Transaction.js';
import Business from '../models/Business.js';
import Review from '../models/Review.js';
import Listing from './../models/Listing.js';
import Site from './../models/Site.js';
import Notification from './../models/Notification.js';
import fs from 'fs';
import { uploader } from '../utils/cloudinary.js';

export const getUser = async (req, res) => {
	try {
		const { id } = req.params;
		const user = await User.findById(id);
		res.status(200).json(user);
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};

export const getDashboardStats = async (req, res) => {
	const user = req.user;
	try {
		const totalReviews = await Review.countDocuments();
		const totalListing = await Listing.countDocuments();
		const transactions = await Transaction.find()
			.limit(50)
			.sort({ createdOn: -1 });
		const business = await Business.findOne({ userId: req.user._id });
		const newUsers = await User.find({ role: 'USER' })
			.limit(5)
			.select('firstName lastName email')
			.sort({ createdOn: -1 });
		const notifications = await Notification.find()
			.limit(5)
			.sort({ createdOn: -1 });

		res.status(200).json({
			user,
			business,
			totalReviews,
			totalListing,
			newUsers,
			notifications,
			transactions,
		});
	} catch (error) {
		res.status(404).json({ error, message: error.message });
	}
};
export const getAdminDashboard = async (req, res) => {
	try {
		const transactions = await Transaction.find()
			.limit(50)
			.sort({ createdOn: -1 });
		const totalUsers = await User.countDocuments();
		const totalReviews = await Review.countDocuments();
		const totalBusiness = await Business.countDocuments();
		const totalListing = await Listing.countDocuments();
		const newUsers = await User.find({ role: 'USER' })
			.limit(5)
			.sort({ createdOn: -1 });

		res.status(200).json({
			totalUsers,
			totalReviews,
			totalBusiness,
			totalListing,
			newUsers,
			transactions,
		});
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};
export const updateSite = async (req, res) => {
	try {
		const userId = req.user._id;
		let siteInfo = await Site.findOneAndUpdate({ userId }, { ...req.body });
		if (!siteInfo) {
			siteInfo = await Site.create({ ...req.body });
		}
		res.status(200).json(siteInfo);
	} catch (error) {
		res.status(404).json({ error, message: error?.message });
	}
};
export const updateSiteLogo = async (req, res) => {
	try {
		if (!req.file) {
			return res.status(400).json({ error: 'Business logo is required' });
		}

		const logo = await uploader(req.file.path, 'logo');
		const siteInfo = await Site.findOneAndUpdate(
			{ userId: req.user._id },
			{ logo }
		);
		await fs.promises.unlink(req.file.path);
		res.status(200).json(siteInfo);
	} catch (error) {
		if (req.file) {
			await fs.promises.unlink(req.file.path);
		}
		res.status(404).json({ message: error.message });
	}
};
export const getSite = async (req, res) => {
	try {
		const siteInfo = await Site.findOne();
		res.status(200).json(siteInfo);
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};
