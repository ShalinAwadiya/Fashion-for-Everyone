var createError = require('http-errors');
var express = require('express');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
const checkAuth = require('./middlewares/authorization');


// ---------------------------------DATABASE CONFIG-----------------------------
var mongoUrl = "mongodb+srv://deep:webproject@web-project.pmnnubo.mongodb.net/?retryWrites=true&w=majority"
mongoose
  .connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("connected to the database"));
// -----------------------------------------------------------------------------

var app = express();

// ---------------------------------MIDDLEWARES---------------------------------
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// -----------------------------------------------------------------------------

// --------------------------------ROUTE CONFIG---------------------------------
var usersRouter = require('./routes/users');

app.use('/users', checkAuth, usersRouter);
// -----------------------------------------------------------------------------


module.exports = app;
