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
	description  : {
		type : String
	},
	prereqs      : {
		type : String
	}
});

courseSchema.index({ deparment: 1, courseNumber: 1 }, { unique: true });

const Course = mongoose.model('Course', courseSchema);

module.exports = Course;
