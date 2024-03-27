import User from '../../models/User.js';
import Listing from '../../models/Listing.js';
import SavedListing from '../../models/SavedListing.js';
import { getDashboardInfo } from '../../middlewares/apphelpers.js';

export const getListing = async (req, res, next) => {
	const user = await req.session.user;
	const id = req.params.id;
	const listing = await Listing.findOne({ id });
	const dasboardInfo = await getDashboardInfo(user._id);
	res.render('listing', {
		listing,
		user,
		...dasboardInfo,
		path: '/listing',
		pageTitle: 'Listing',
	});
};
export const getListings = async (req, res, next) => {
	const user = await req.session.user;
	const listings = await Listing.find({ userId: user._id });
	const dasboardInfo = await getDashboardInfo(user._id);
	res.render('listings', {
		listings,
		user,
		...dasboardInfo,
		path: '/listings',
		pageTitle: 'Listing',
	});
};
export const getMyListing = async (req, res, next) => {
	const user = await req.session.user;
	const listings = await Listing.find({ userId: user._id }).sort('createdAt');
	const dasboardInfo = await getDashboardInfo(user._id);
	res.render('myListing', {
		listings,
		user,
		...dasboardInfo,
		path: '/my-listings',
		pageTitle: 'Listing',
	});
};
export const getAddListing = async (req, res, next) => {
	const user = await req.session.user;
	const dasboardInfo = await getDashboardInfo(user._id);
	res.render('addListing', {
		path: '/add-listing',
		pageTitle: 'Listing',
		user,
		...dasboardInfo,
	});
};
export const getEditListing = async (req, res) => {
	const id = req.params.id;
	const user = await req.session.user;
	const listing = await Listing.findOne({ id });
	const dasboardInfo = await getDashboardInfo(user._id);
	res.render('addListing', {
		path: '/add-listing',
		pageTitle: 'Listing',
		user,
		...dasboardInfo,
		listing,
	});
};
export const getSavedListings = async (req, res) => {
	const user = await req.session.user;
	const listings = await SavedListing.find({ userId: user._id }).populate(
		'listingId'
	);
	const dasboardInfo = await getDashboardInfo(user._id);
	res.render('savedListing', {
		path: '/saved-listings',
		pageTitle: 'Listing',
		listings,
		...dasboardInfo,
		user,
	});
};
export const getSavedListing = async (req, res) => {
	const user = await req.session.user;
	let listings;
	const listingExist = await SavedListing.findOne({
		userId: user._id,
		listingId: req.params.id,
	});
	if (listingExist) {
		listings = await SavedListing.create({ userId: user._id }).populate(
			'listingId'
		);
	} else {
		listings = await SavedListing.create({
			userId: user._id,
			listingId: req.params.id,
		}).populate('listingId');
	}
	console.log(listings);
	const dasboardInfo = await getDashboardInfo(user._id);
	res.render('savedListing', {
		path: '/saved-listings',
		pageTitle: 'Listing',
		listings,
		...dasboardInfo,
		user,
	});
};
