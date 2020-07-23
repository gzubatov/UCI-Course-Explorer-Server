const express = require('express');
const professorController = require('../controllers/professors-controllers');

const router = new express.Router();

router.get('/', professorController.getAllProfessors);

router.post('/', professorController.addProfessor);

module.exports = router;
