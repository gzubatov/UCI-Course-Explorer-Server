const mongoose = require('mongoose');
const Course = require('../models/course');
const Review = require('../models/review');

const getAllCourses = async (req, res, next) => {
	try {
		const courses = await Course.find({}).populate({
			path     : 'reviews',
			populate : {
				path : 'professor'
			}
		});

		res.json({ courses });
	} catch (e) {
		res.status(500).send(e);
	}
};

const addCourse = async (req, res, next) => {
	const { department, courseNumber, prereqs, description } = req.body;

	const newCourse = new Course({
		department,
		courseNumber,
		prereqs,
		description
	});

	try {
		await newCourse.save();
		res.status(201).send({ newCourse });
	} catch (e) {
		res.status(500).send(e);
	}
};

const getCoursesByDepartment = async (req, res, next) => {
	try {
		const courses = await Course.find(
			{
				department : req.params.department
			},
			null,
			{
				sort : { courseNumber: 1 }
			}
		).populate({
			path     : 'reviews',
			populate : {
				path : 'professor'
			}
		});
		res.json({ courses });
	} catch (e) {
		res.status(500).send(e);
	}
};

const getCourse = async (req, res, next) => {
	try {
		const course = await Course.find({
			department   : req.params.department,
			courseNumber : req.params.courseNumber
		}).populate({
			path     : 'reviews',
			populate : {
				path : 'professor'
			}
		});
		res.json({ course });
	} catch (e) {
		res.status(500).send(e);
	}
};

const getCourseById = async (req, res, next) => {
	try {
		const professorsLookup = await Review.aggregate([
			{ $match: { course: mongoose.Types.ObjectId(req.params.id) } },
			{
				$project : {
					professor : 1
				}
			},
			{
				$group : {
					_id : '$professor'
				}
			},
			{
				$lookup : {
					from         : 'professors',
					localField   : '_id',
					foreignField : '_id',
					as           : 'professor'
				}
			},
			{
				$sort : {
					'professor.lastName' : 1
				}
			}
		]);

		const course = await Course.findById(req.params.id).populate({
			path     : 'reviews',
			populate : {
				path : 'professor'
			}
		});
		res.json({ course, professorOptions: professorsLookup });
	} catch (e) {
		res.status(500).send(e);
	}
};

module.exports = {
	getAllCourses,
	addCourse,
	getCoursesByDepartment,
	getCourse,
	getCourseById
};
