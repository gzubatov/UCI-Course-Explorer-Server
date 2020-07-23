const mongoose = require('mongoose');
const Course = require('../models/course');
const Review = require('../models/review');
//const Professor = require('../models/professor');

const addReview = async (req, res, next) => {
	const {
		quarter,
		year,
		review,
		difficulty,
		workload,
		professor,
		details,
		courseId
	} = req.body;

	const newReview = new Review({
		quarter,
		year,
		review,
		difficulty,
		workload,
		professor,
		details
	});
	const course = await Course.findById(courseId);

	try {
		const session = await mongoose.startSession();
		session.startTransaction();
		await newReview.save({ session });
		course.reviews.push(newReview);
		await course.save({ session });
		await session.commitTransaction();
		res.status(201).send({ newReview });
	} catch (e) {
		res.status(500).send(e);
	}
};

module.exports = {
	addReview
};
