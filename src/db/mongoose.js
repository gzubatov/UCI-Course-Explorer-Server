const mongoose = require('mongoose');

const url = `mongodb+srv://${process.env.DB_USER}:${process.env
	.DB_PASSWORD}@zotreviewsdb.haje3.mongodb.net/${process.env
	.DB_NAME}?retryWrites=true&w=majority`;

mongoose.connect(url, {
	useNewUrlParser    : true,
	useUnifiedTopology : true,
	useCreateIndex     : true,
	useFindAndModify   : false
});
