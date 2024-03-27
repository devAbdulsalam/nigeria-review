import Student from '../models/Student.js';
import User from '../models/User.js';
import Record from './../models/Record';
import {
	getPaginatedPayload,
	studentsSearchConditions,
} from '../utils/getPaginatedPayload.js';
export const getStudents = async (req, res) => {
	const page = +(req.query.page || 1);
	const limit = +(req.query.limit || 10);
	const query = req.query.query?.toLowerCase(); // search query
	const inc = req.query.inc?.split(','); // only include fields mentioned in this query

	try {
		let filter;

		if (query) {
			const searchConditions = studentsSearchConditions(query);
			filter = { ...filter, ...searchConditions };
		}

		const options = {
			lean: true,
			skip: (page - 1) * limit,
			limit: limit,
			select: inc,
		};

		const students = await Student.find(filter, null, options);
		const totalItems = await Student.countDocuments(filter);

		res.status(200).json({
			data: getPaginatedPayload(students, page, limit, totalItems),
			message: 'Students fetched successfully',
			success: true,
		});
	} catch (error) {
		console.log(error);
		res
			.status(500)
			.json({ message: 'Failed to fetch projects', success: false });
	}
};

export const createStudent = async (req, res) => {
	try {
		const student = await Student.create({ userId: req.user._id, ...req.body });
		res.status(200).json(student);
	} catch (error) {
		console.log(error);
		res.status(404).json({ message: error.message });
	}
};

export const getProject = async (req, res) => {
	try {
		const { id } = req.params;
		const student = await Student.findById(id);
		const user = await User.find({ project: id });
		res.status(200).json({ user, student });
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};
export const getRecords = async (req, res) => {
	try {
		const id = req.user._id;
		const records = await Record.find({ role: id });
		res.status(200).json(records);
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};
export const getUser = async (req, res) => {
	try {
		const { id } = req.params;
		const student = await Student.findOne({ id }).populate('userId', [
			'avatar',
			'firstName',
			'lastName',
			'phone',
		]);
		res.status(200).json({ student });
	} catch (error) {
		console.log(error);
		res.status(404).json({ message: error.message });
	}
};

export const updateStudentStatus = async (req, res) => {
	try {
		const { id } = req.params;
		const { status } = req.body;
		const isStudent = await Student.findById(id);
		if (!isStudent) {
			return res.status(401).json({ message: 'Invalid project' });
		}
		const student = await Student.findByIdAndUpdate(
			id,
			{ status },
			{ new: true }
		);
		res.status(200).json(student);
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};
export const deleteStudent = async (req, res) => {
	try {
		const { id } = req.params;
		const userId = req.user._id;

		// Check if the student exists and the user has permission
		const student = await Student.findById(id);
		if (
			!student ||
			(req.user.role !== 'ADMIN' &&
				student.userId.toString() !== userId.toString())
		) {
			return res
				.status(403)
				.json({ message: 'Unauthorized to delete student' });
		}
		await Student.findByIdAndDelete(id);
		res.status(200).json({ message: 'Student deleted successfully' });
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: 'Internal server error' });
	}
};
