const express = require('express');
require('./db/mongoose');
const courseRoutes = require('./routes/course-routes');
const reviewRoutes = require('./routes/review-routes');
const professorRoutes = require('./routes/professor-routes');

const app = express();

app.use(express.json());

app.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader(
		'Access-Control-Allow-Headers',
		'Origin, X-Requested-With, Content-Type, Accept, Authorization'
	);
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');

	next();
});

app.use('/api/courses', courseRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/professors', professorRoutes);

module.exports = app;
