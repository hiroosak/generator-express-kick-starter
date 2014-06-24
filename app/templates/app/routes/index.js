"use strict";

var express     = require('express');
var config      = require('config');
var passport    = require('passport');
var expressJwt  = require('express-jwt');
var error       = require('./error');
var controllers = require('../controllers');
var middleware  = require('../middleware');
var route       = express.Router();

module.exports = function() {

  var expressJwtService = expressJwt(config.jwt.options);

  //
  // loading files
  //
  var api = controllers.api;
  var home = controllers.home;

  // params
  route.param('userId', middleware.services.user);

  // Authenticate
  route.post('/api/1/authenticate', api.authenticate.index);

  route.get('/api/1/users/me', expressJwtService, api.users.me);
  route.get('/api/1/users/:userId', api.users.show);

  // login
  route.get('/auth/facebook', passport.authenticate('facebook', {scope: 'email'}));
  route.get('/auth/facebook/callback', passport.authenticate('facebook', {failureRedirect: '/?login=failed'}), function(req, res) {
    res.redirect(req.session.returnTo || '/');
  });
  route.get('/auth/twitter', passport.authenticate('twitter'));
  route.get('/auth/twitter/callback', passport.authenticate('twitter', {failureRedirect: '/?login=failed' }), function(req, res) {
    res.redirect(req.session.returnTo || '/');
  });

  // root page
  route.get('/', home.index);

  // ERROR
  if (process.env.NODE_ENV !== 'production') {
    route.use(error.logError);
  }
  route.use('/api', error.apiErrorHandler);
  route.use(error.errorHandler);
  route.use(error.notFoundError);

  return route;
};
