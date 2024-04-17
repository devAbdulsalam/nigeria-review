import Blog from '../models/Blog.js';
import User from '../models/User.js';
import {
	getPaginatedPayload,
	BlogsSearchConditions,
} from '../utils/getPaginatedPayload.js';
export const getBlogs = async (req, res) => {
	const page = +(req.query.page || 1);
	const limit = +(req.query.limit || 10);
	const query = req.query.query?.toLowerCase(); // search query
	const inc = req.query.inc?.split(','); // only include fields mentioned in this query

	try {
		let filter;

		if (query) {
			const searchConditions = BlogsSearchConditions(query);
			filter = { ...filter, ...searchConditions };
		}

		const options = {
			lean: true,
			skip: (page - 1) * limit,
			limit: limit,
			select: inc,
		};

		const blogs = await Blog.find(filter, null, options);
		const totalItems = await Blog.countDocuments(filter);

		res.status(200).json({
			data: getPaginatedPayload(blogs, page, limit, totalItems),
			message: 'Blogs fetched successfully',
			success: true,
		});
	} catch (error) {
		console.log(error);
		res
			.status(500)
			.json({ message: 'Failed to fetch projects', success: false });
	}
};

export const createBlog = async (req, res) => {
	try {
		const blog = await Blog.create({ userId: req.user._id, ...req.body });
		res.status(200).json(blog);
	} catch (error) {
		console.log(error);
		res.status(404).json({ message: error.message });
	}
};

export const getProject = async (req, res) => {
	try {
		const { id } = req.params;
		const blog = await Blog.findById(id);
		const user = await User.find({ project: id });
		res.status(200).json({ user, blog });
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};
export const getComments = async (req, res) => {
	try {
		const id = req.user._id;
		const blog = await Blog.find({ role: id });
		res.status(200).json(blog);
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};
export const getUser = async (req, res) => {
	try {
		const { id } = req.params;
		const blog = await Blog.findOne({ id }).populate('userId', [
			'avatar',
			'firstName',
			'lastName',
			'phone',
		]);
		res.status(200).json(blog);
	} catch (error) {
		console.log(error);
		res.status(404).json({ message: error.message });
	}
};

export const updateBlogStatus = async (req, res) => {
	try {
		const { id } = req.params;
		const { status } = req.body;
		const isBlog = await Blog.findById(id);
		if (!isBlog) {
			return res.status(401).json({ message: 'Invalid project' });
		}
		const blog = await Blog.findByIdAndUpdate(id, { status }, { new: true });
		res.status(200).json(blog);
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};
export const deleteBlog = async (req, res) => {
	try {
		const { id } = req.params;
		const userId = req.user._id;

		// Check if the Blog exists and the user has permission
		const blog = await Blog.findById(id);
		if (
			!blog ||
			(req.user.role !== 'ADMIN' &&
				blog.userId.toString() !== userId.toString())
		) {
			return res.status(403).json({ message: 'Unauthorized to delete blog' });
		}
		await Blog.findByIdAndDelete(id);
		res.status(200).json({ message: 'Blog deleted successfully' });
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: 'Internal server error' });
	}
};
