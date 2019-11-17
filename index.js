const createError = require('http-errors');
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
// const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

const config = require('./src/config/config');
const routes = require('./src/routes/Routes');
const app = express();

mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.connect(config.DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(logger('dev'));
app.use(cors());
// app.use(cookieParser());

routes.forEach((route) => {
    app.use('/api', route);
});

app.listen(config.APP_PORT);

module.exports = app;
