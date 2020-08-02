const mongoose = require('mongoose');
const Course = require('../models/course');
const Review = require('../models/review');
const Professor = require('../models/professor');

const addReview = async (req, res, next) => {
	const {
		quarter,
		year,
		review,
		difficulty,
		workload,
		professor,
		professorLastName,
		professorFirstName,
		details,
		course,
		grade,
		recommend,
		attendance
	} = req.body;

	// if we don't have a professor we need to add a new one
	let newProfessor;
	if (!professor) {
		newProfessor = new Professor({
			lastName  : professorLastName,
			firstName : professorFirstName
		});
	}

	const newReview = new Review({
		quarter,
		year,
		review,
		difficulty,
		workload,
		professor  : professor ? professor : newProfessor._id,
		details,
		course,
		grade,
		recommend,
		attendance
	});

	try {
		const session = await mongoose.startSession();
		session.startTransaction();
		if (!professor) {
			await newProfessor.save({ session });
		}
		await newReview.save({ session });
		await session.commitTransaction();
		res.status(201).send({ newReview });
	} catch (e) {
		res.status(500).send(e);
	}
};

module.exports = {
	addReview
};
