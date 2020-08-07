const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema(
	{
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
		}
	},
	{
		toJSON    : { virtuals: true },
		toObject  : { getters: true },
		collation : { locale: 'en_US', numericOrdering: true }
	}
);

courseSchema.index({ deparment: 1, courseNumber: 1 }, { unique: true });

courseSchema.virtual('reviews', {
	ref          : 'Review',
	localField   : '_id',
	foreignField : 'course',
	justOne      : false,
	options      : { sort: { _id: -1 } }
});

courseSchema.virtual('avgRatings').get(function() {
	const course = this;
	const reviews = course.reviews;
	let avgDifficulty = 0;
	let avgWorkload = 0;
	if (reviews.length !== 0) {
		const totalDiff = reviews
			.map((review) => review.difficulty)
			.reduce((a, b) => a + b);

		const totalWorkLoad = reviews
			.map((review) => review.workload)
			.reduce((a, b) => a + b);

		avgDifficulty = totalDiff / course.reviews.length;
		avgWorkload = totalWorkLoad / course.reviews.length;
	}

	return { avgDifficulty, avgWorkload };
});

const Course = mongoose.model('Course', courseSchema);

module.exports = Course;
