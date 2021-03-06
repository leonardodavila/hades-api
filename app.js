const express = require('express');
const path = require('path');
const logger = require('morgan');
const bodyParser = require('body-parser');
const app = express();
app.use(logger('dev'));
app.use(bodyParser.json());

const network = require('./network/network-routes');

const db = require('./db.js');

//Middleware that will create connection to database
app.use(db.createConnectionMiddleware);

app.use('/network', network);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send('error');
});

//Middleware that will close connection to databse
app.use(db.closeConnectionMiddleware);

module.exports = app;
