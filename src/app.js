const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
require('dotenv').config();
const genresRouter = require('./routes/genres');
const directorsRouter = require('./routes/director');
const actorsRouter = require('./routes/actor');
const moviesRouter = require('./routes/movie');


// Esta es nuestra aplicación
const app = express();

// Middlewares 
app.use(express.json());
app.use(helmet({
    crossOriginResourcePolicy: false,
}));
app.use(cors());

app.use('/genres', genresRouter);
app.use('/directors', directorsRouter);
app.use('/actors', actorsRouter);
app.use('/movies', moviesRouter);

module.exports = app;