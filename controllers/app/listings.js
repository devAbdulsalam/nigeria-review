import User from '../../models/User.js';
import Listing from '../../models/Listing.js';
import SavedListing from '../../models/SavedListing.js';
import Review from '../../models/Review.js';
import Site from '../../models/Site.js';
import { getDashboardInfo } from '../../middlewares/apphelpers.js';

export const getListing = async (req, res, next) => {
	const user = await req.session.user;
	const id = req.params.id;
	const listing = await Listing.findOne({ id });
		const site = await Site.findOne();
	if (!listing) {
		return res.redirect('/listings');
	}
	const author = await User.findOne({ _id: listing.userId }).select(
		'firstName lastName email avatar address phone'
	);
	const reviews = await Review.find({ itemId: id }).populate('itemId');
	const recentListing = await Listing.find().limit(4).sort({ createdAt: -1 });
	const totalListings = await Listing.count({ userId: author?._id });
	const followers = await User.countDocuments({ _id: author?._id });
	const following = await User.countDocuments({ _id: author?._id });
	res.render('listing', {
		listing,
		listingId: id,
		author,
		reviews,
		totalListings,
		recentListing,
		followers,
		following,
		user,site,
		path: '/listing',
		pageTitle: 'Listing',
	});
};
// implementing search query, filter, sort and pagination of listing
// http://localhost:8000/listings?query
export const getListings = async (req, res, next) => {
	const {
		query,
		filter,
		sort = { createdAt: -1 },
		page = 1,
		limit = 10,
	} = req.query;

	let listingQuery = { status: 'ACTIVE' }; // Default filter for active listings

	// Build search query based on parameters
	if (query) {
		listingQuery.$text = { $search: query };
	}
	if (filter) {
		try {
			const filterObj = JSON.parse(filter); // Parse filter JSON
			listingQuery = { ...listingQuery, ...filterObj }; // Apply filter conditions
		} catch (err) {
			console.error('Error parsing filter:', err);
			// Handle invalid filter format
		}
	}

	// Pagination logic
	const skip = (page - 1) * limit;

	const listings = await Listing.find(listingQuery)
		.sort(sort)
		.skip(skip)
		.limit(limit)
		.select({ _id: 1, status: 'DELETED' }); // Select only necessary fields for efficiency

	const totalCount = await Listing.countDocuments(listingQuery); // Total matching listings
	// Pass limit per page for pagination UI
	// Other data for the listings template
	const user = await req?.session?.user;
	const dasboardInfo = await getDashboardInfo(user?._id);	
		const site = await Site.findOne();

	res.render('listings', {
		listings,
		totalCount, // Pass total count for pagination UI
		filter, // Pass back the applied filter for UI state
		sort, // Pass back the applied sort for UI state
		page, // Pass current page for pagination UI
		limit,
		user,site,
		...dasboardInfo,
		path: '/listing',
		pageTitle: 'Listing',
	});
};
export const getSearchListings = async (req, res, next) => {
	const {
		query,
		filter,
		sort = { createdAt: -1 },
		page = 1,
		limit = 10,
	} = req.query;
	// status: 'ACTIVE';
	let listingQuery = {}; // Default filter for active listings

	// Build search query based on parameters
	if (query) {
		listingQuery.$text = { $search: query };
	}
	if (filter) {
		try {
			const filterObj = JSON.parse(filter); // Parse filter JSON
			listingQuery = { ...listingQuery, ...filterObj }; // Apply filter conditions
		} catch (err) {
			console.error('Error parsing filter:', err);
			// Handle invalid filter format
		}
	}

	// Pagination logic
	const skip = (page - 1) * limit;
	console.log('listingQuery', listingQuery);
	const listings = await Listing.find(listingQuery)
		.sort(sort)
		.skip(skip)
		.limit(limit);
	// .select({ _id: 1 }); // Select only necessary fields for efficiency

	const totalCount = await Listing.countDocuments(listingQuery); // Total matching listings
	// Pass limit per page for pagination UI
	// Other data for the listings template
	const user = await req?.session?.user;
	const dasboardInfo = await getDashboardInfo(user?._id);
		const site = await Site.findOne();

	res.render('search', {
		listings,
		totalCount, // Pass total count for pagination UI
		filter, // Pass back the applied filter for UI state
		sort, // Pass back the applied sort for UI state
		page, // Pass current page for pagination UI
		limit,
		user,site,
		...dasboardInfo,
		path: '/search',
		pageTitle: 'Listing',
	});
};

export const getMyListing = async (req, res, next) => {
	const user = await req.session.user;
	const listings = await Listing.find({ userId: user._id }).sort('createdAt');
	const dasboardInfo = await getDashboardInfo(user._id);
		const site = await Site.findOne();
	res.render('myListing', {
		listings,
		user,site,
		...dasboardInfo,
		path: '/my-listings',
		pageTitle: 'Listing',
	});
};
export const getAddListing = async (req, res, next) => {
	const user = await req.session.user;
	const dasboardInfo = await getDashboardInfo(user._id);
		const site = await Site.findOne();
	res.render('addListing', {
		path: '/add-listing',
		pageTitle: 'Listing',
		user,site,
		...dasboardInfo,
	});
};
export const getEditListing = async (req, res) => {
	const id = req.params.id;
	const user = await req.session.user;
	const listing = await Listing.findOne({ id });
	const dasboardInfo = await getDashboardInfo(user._id);
		const site = await Site.findOne();
	res.render('addListing', {
		path: '/add-listing',
		pageTitle: 'Listing',
		user,site,
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
		const site = await Site.findOne();
	res.render('savedListing', {
		path: '/saved-listings',
		pageTitle: 'Listing',
		listings,
		...dasboardInfo,
		user,
		site,
	});
};
export const getSavedListing = async (req, res) => {
	const user = await req.session.user;
	const listingExist = await SavedListing.findOne({
		userId: user._id,
		listingId: req.params.id,
	});
	let listing;
	if (!listingExist) {
		listing = await SavedListing.create({
			userId: user._id,
			listingId: req.params.id,
		});
	}
	const listings = await SavedListing.find({ userId: user._id }).populate(
		'listingId'
	);
	const dasboardInfo = await getDashboardInfo(user._id);
		const site = await Site.findOne();
	res.render('savedListing', {
		path: '/saved-listings',
		pageTitle: 'Listing',
		listings,
		listing,
		...dasboardInfo,
		user,
		site,
	});
};
