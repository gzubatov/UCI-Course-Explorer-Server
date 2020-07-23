const mongoose = require('mongoose');

const professorSchema = new mongoose.Schema({
	lastName  : {
		type     : String,
		required : true,
		trim     : true
	},
	firstName : {
		type     : String,
		required : true,
		trim     : true
	}
});

professorSchema.index({ lastName: 1, firstName: 1 }, { unique: true });

const Professor = mongoose.model('Professor', professorSchema);

module.exports = Professor;
