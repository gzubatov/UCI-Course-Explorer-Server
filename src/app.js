const express = require('express');
require('./db/mongoose');
const courseRoutes = require('./routes/course-routes');

const app = express();

app.use(express.json());
app.use('/api/courses', courseRoutes);

module.exports = app;
