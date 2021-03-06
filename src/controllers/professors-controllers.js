const mongoose = require('mongoose');
const Professor = require('../models/professor');

const getAllProfessors = async (req, res, next) => {
	try {
		const professors = await Professor.find({}, null, {
			sort : { lastName: 1 }
		});
		res.json({ professors });
	} catch (e) {
		res.status(500).send(e);
	}
};

const addProfessor = async (req, res, next) => {
	const { lastName, firstName } = req.body;

	const newProfessor = new Professor({
		lastName,
		firstName
	});

	try {
		await newProfessor.save();
		res.status(201).send({ newProfessor });
	} catch (e) {
		if (e.code === 11000) {
			return res
				.status(400)
				.send({ message: 'Professor already exists!' });
		}
		res.status(500).send(e);
	}
};

module.exports = {
	getAllProfessors,
	addProfessor
};
