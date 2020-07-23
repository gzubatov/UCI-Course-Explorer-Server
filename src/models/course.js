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

const Course = mongoose.model('Course', courseSchema);

module.exports = Course;
