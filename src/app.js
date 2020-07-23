const express = require('express');
require('./db/mongoose');
const courseRoutes = require('./routes/course-routes');
const professorRoutes = require('./routes/professor-routes');

const app = express();

app.use(express.json());
app.use('/api/courses', courseRoutes);
app.use('/api/professors', professorRoutes);

module.exports = app;
