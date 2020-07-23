const express = require('express');
const coursesController = require('../controllers/courses-controllers');

const router = new express.Router();

router.get('/', coursesController.getAllCourses);

router.post('/', coursesController.addCourse);

router.get('/:department', coursesController.getCoursesByDepartment);

router.get('/:department/:courseNumber', coursesController.getCourse);

module.exports = router;
