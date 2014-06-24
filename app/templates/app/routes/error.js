"use strict";

var handlers = {};

handlers.logError = function(err, req, res, next) {
  console.error(err);
  next(err);
};

handlers.apiErrorHandler = function(err, req, res, next) {
  var message = {
    status: err.status,
    message: err.message
  };
  if (process.env.NODE_ENV !== 'production') {
    message.stack = err.stack;
  }
  res.json(err.status || 500, message);
};

handlers.errorHandler = function(err, req, res, next) {
  if (err && err.status) {
    res.status(err.status);
    return res.render('error', {
      status: err.status,
      message: err.message || '',
      stack: err.stack
    });
  }
  next(err);
};

handlers.notFoundError = function(req, res) {
  var err = new Error("Not Found");
  var status = 404;

  res.status(status);
  res.render('error', {
    error: status,
    message: err.message,
    stack: err.stack
  });
};

module.exports = handlers;
