"use strict";

var User = require('../../models/user');
var util = require('util');

// `/:userId` の展開
module.exports = function(req, res, next, userId) {

  req.checkParams('userId', 'Invalid userId').isInt();
  var err = req.validationErrors();
  if (err) {
    return next(new Error(util.inspect(err)));
  }

  User.findById(userId, function(err, user) {
      if (!user) {
        err = new Error('Not found');
      }
      if (err) {
        return next(err);
      }
      req.services = req.services || {};
      req.services.user = user;
      next();
    });
};
