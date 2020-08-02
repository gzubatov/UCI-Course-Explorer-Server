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
		type : String,
		trim : true
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
		grade        : {
			type : String,
			trim : true
		},
		recommend    : {
			type : Boolean
		},
		attendance   : {
			type : String,
			trim : true
		},
		iClicker     : {
			type : Boolean
		},
		groupWork    : {
			type : Boolean
		},
		textbook     : {
			type : Boolean
		},
		curve        : {
			type : Boolean
		},
		heavyReading : {
			type : Boolean
		}
	},
	professor  : {
		type     : mongoose.Types.ObjectId,
		required : true,
		ref      : 'Professor'
	},
	course     : {
		type     : mongoose.Types.ObjectId,
		required : true,
		ref      : 'Course'
	}
});

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
