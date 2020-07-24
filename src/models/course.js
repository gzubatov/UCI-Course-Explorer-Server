const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
	department   : {
		type     : String,
		required : true,
		trim     : true
	},
	courseNumber : {
		type     : String,
		required : true,
		trim     : true
	},
	title        : {
		type : String,
		trim : true
	},
	description  : {
		type     : String,
		required : true,
		trim     : true
	},
	prereqs      : {
		type     : String,
		required : true,
		trim     : true
	},
	reviews      : [
		{
			type     : mongoose.Types.ObjectId,
			required : true,
			ref      : 'Review'
		}
	]
});

courseSchema.index({ deparment: 1, courseNumber: 1 }, { unique: true });

courseSchema.methods.toJSON = function() {
	const course = this;
	course.populate('reviews');

	const courseObject = course.toObject();
	let avgDifficultyRating = 0;
	let avgWorkload = 0;
	if (course.reviews.length !== 0) {
		const totalDiff = courseObject.reviews
			.map((review) => review.difficulty)
			.reduce((a, b) => a + b);

		const totalWorkLoad = courseObject.reviews
			.map((review) => review.workload)
			.reduce((a, b) => a + b);

		avgDifficultyRating = totalDiff / course.reviews.length;
		avgWorkload = totalWorkLoad / course.reviews.length;
	}

	courseObject.avgDifficulty = avgDifficultyRating;
	courseObject.avgWorkload = avgWorkload;

	return courseObject;
};

const Course = mongoose.model('Course', courseSchema);

module.exports = Course;
