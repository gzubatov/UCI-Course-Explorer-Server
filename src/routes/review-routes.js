const express = require('express');
const reviewsController = require('../controllers/reviews-controllers');

const router = new express.Router();

router.post('/', reviewsController.addReview);

module.exports = router;
