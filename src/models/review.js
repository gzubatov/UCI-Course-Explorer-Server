const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
	reviewDate : {
		type     : Date,
		required : true,
		default  : Date.now()
	},
	quarter    : {
		type     : String,
		required : true,
		trim     : true
	},
	year       : {
		type     : Number,
		required : true
	},
	review     : {
		type     : String,
		required : true,
		trim     : true
	},
	difficulty : {
		type     : Number,
		required : true
	},
	workload   : {
		type     : Number,
		required : true
	},
	details    : {
		grade       : {
			type : String,
			trim : true
		},
		recommend   : {
			type : Boolean
		},
		attendance  : {
			type : String,
			trim : true
		},
		iClicker    : {
			type : Boolean
		},
		groupWork   : {
			type : String,
			trim : true
		},
		homework    : {
			type : Boolean
		},
		quizzes     : {
			type : Boolean
		},
		exams       : {
			type : Boolean
		},
		textbook    : {
			type : String,
			trim : true
		},
		curve       : {
			type : Boolean
		},
		officeHours : {
			type : String,
			trim : true
		}
	},
	professor  : {
		type     : mongoose.Types.ObjectId,
		required : true,
		ref      : 'Professor'
	}
});

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
