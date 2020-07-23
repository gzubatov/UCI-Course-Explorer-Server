const express = require('express');

const router = new express.Router();

router.get('/', (req, res, next) => {
	res.json({ courses: COURSES });
});

module.exports = router;
