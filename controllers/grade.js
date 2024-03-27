import Grade from '../models/Grade.js';
import Student from '../models/Student.js';
import School from '../models/School.js';
import Teacher from '../models/Teacher.js';
import mongoose from 'mongoose';
export const getGrade = async (req, res) => {
	const { id } = req.params;
	try {
		const grade = await Grade.findById(id);
		res.status(200).json(grade);
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: error.message });
	}
};
export const getGrades = async (req, res) => {
	const { id } = req.params;
	try {
		const grade = await Grade.find(id);
		res.status(200).json(grade);
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: error.message });
	}
};
export const addGrade = async (req, res) => {
	try {
		const { title, description } = req.body;
		const { id } = req.params;
		if (!id || !mongoose.isValidObjectId(id)) {
			return res.status(404).json({ error: 'Enter a valid user' });
		}
		const school = await School.findById(id);

		if (!school) {
			throw new ApiError(403, 'Unauthorized to add school');
		}
		const grade = await Grade.create({
			school: school._id,
			title,
			description,
		});
		res.status(200).json({ grade, message: 'Grade added successfully' });
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: 'server error' });
	}
};
export const addStudents = async (req, res) => {
	try {
		const { students } = req.body;
		const { id } = req.params;

		if (!mongoose.isValidObjectId(id)) {
			return res.status(404).json({ error: 'Enter a valid grade ID' });
		}

		const grade = await Grade.findById(id);
		if (!grade) {
			throw new ApiError(403, 'Invalid class ID');
		}

		const studentIds = students.map(student => mongoose.Types.ObjectId(student));
		const updatedStudents = await Student.updateMany({ _id: { $in: studentIds } }, { gradeId: id });

		if (updatedStudents.nModified === 0) {
			throw new ApiError(403, 'No students were updated');
		}

		const updatedGrade = await Grade.findByIdAndUpdate(
			id,
			{ $addToSet: { students: { $each: studentIds } } }, // Add new students to the grade
			{ new: true }
		);

		res.status(200).json({ grade: updatedGrade, message: 'Grade updated successfully' });
	} catch (error) {
		console.error(error);
		res.status(error.statusCode || 500).json({ message: error.message || 'Server error' });
	}
};
export const addStudent = async (req, res) => {
	try {
		const { studentId } = req.body;
		const { id } = req.params;
		if (!id || !mongoose.isValidObjectId(id)) {
			return res.status(404).json({ error: 'Enter a valid user' });
		}
		const grade = await Grade.findById(id);
		if (!grade) {
			throw new ApiError(403, 'Invalid to class');
		}
		const student = await Student.findById(id, { gradeId: id }, { new: true });
		if (!student) {
			throw new ApiError(403, 'Unauthorized to add Student');
		}
		const updateGrade = await Grade.findById(
			{ id },
			{
				students: [studentId],
			},
			{ new: true }
		);
		res
			.status(200)
			.json({ grade: updateGrade, message: 'Grade updated successfully' });
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: 'server error' });
	}
};
export const demoteStudents = async (req, res) => {
	try {
		const { students, toGradeId } = req.body;
		const { id } = req.params;

		if (!mongoose.isValidObjectId(id) || !mongoose.isValidObjectId(toGradeId)) {
			return res.status(404).json({ error: 'Enter valid grade IDs' });
		}

		const fromGrade = await Grade.findById(id);
		const toGrade = await Grade.findById(toGradeId);

		if (!fromGrade || !toGrade) {
			throw new ApiError(403, 'Invalid from or to class ID');
		}

		const studentIds = students.map((student) =>
			mongoose.Types.ObjectId(student)
		);

		// Move students from the current grade to the new grade
		await Student.updateMany(
			{ _id: { $in: studentIds } },
			{ gradeId: toGradeId }
		);

		// Remove students from the current grade
		await Grade.findByIdAndUpdate(id, {
			$pull: { students: { $in: studentIds } },
		});

		// Add students to the new grade
		await Grade.findByIdAndUpdate(toGradeId, {
			$addToSet: { students: { $each: studentIds } },
		});

		res.status(200).json({ message: 'Students demoted successfully' });
	} catch (error) {
		console.error(error);
		res
			.status(error.statusCode || 500)
			.json({ message: error.message || 'Server error' });
	}
};
export const addTeacher = async (req, res) => {
	try {
		const { teacherId } = req.body;
		const { id } = req.params;
		if (!id || !mongoose.isValidObjectId(id)) {
			return res.status(404).json({ error: 'Enter a valid user' });
		}
		const grade = await Grade.findById(id);
		const teacher = await Teacher.findById(teacherId);
		if (!teacher) {
			throw new ApiError(403, 'Invalid teacher Id');
		}

		if (!grade) {
			throw new ApiError(403, 'Unauthorized to class id');
		}
		const updateGrade = await Grade.findById(
			{ id },
			{
				teacher: [teacher._id],
			},
			{ new: true }
		);
		res
			.status(200)
			.json({ grade: updateGrade, message: 'Grade updated successfully' });
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: 'server error' });
	}
};
