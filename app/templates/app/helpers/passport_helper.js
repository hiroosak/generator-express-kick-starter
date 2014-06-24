"use strict";

var _ = require('lodash');
var configOAuth = require('config').oauth;
var User = require('../models/user');
var FacebookStrategy = require('passport-facebook').Strategy
var TwitterStrategy = require('passport-twitter').Strategy

/**
 * Check that you are already logged in
 *
 * @param {ServerRequest} req
 * @param {Function} save function
 * @param {Function} done 
 *
 * @api private
 */
var accountCallback = function(req, saveCallback, done) {
  return function(err, existingUser) {
    var user;
    if (req.session && req.session.passport && req.session.passport.user) {
      user = req.session.passport.user;
      if (existingUser) {
        console.error('There is already a account that belongs to you.');
        done(err);
      } else {
        User.findById(user._id, saveCallback); 
      }
    } else {
      if (existingUser) {
        done(null, existingUser);
      } else {
        saveCallback(null, new User());
      }
    }
  };
};

/**
 * Facebook callback function.
 *
 * @param {Object} req
 * @param {String} accessToken
 * @param {String} refreshToken
 * @param {Object} profile
 * @param {Function} done 
 *
 * @api private
 */
var facebookCallback = function(req, accessToken, refreshToken, profile, done) {
  var saveCallback = function(err, user) {
    if (!user) {
      return done(err);
    }
    user.facebook = profile.id;
    user.tokens.push({ kind: 'facebook', accessToken: accessToken });
    user.profile.name = profile.displayName;
    user.profile.picture = "http://graph.facebook.com/" + profile.id + "/picture?height=64&width=64&type=square";
    user.save(function(err) {
      done(err, user);
    });
  };

  User.findOne({facebook: profile.id}, accountCallback(req, saveCallback, done));
};

/**
 * Twitter callback function.
 *
 * @param {Object} req
 * @param {String} accessToken
 * @param {String} tokenSecret
 * @param {Object} profile
 * @param {Function} done 
 *
 * @api private
 */
var twitterCallback = function(req, accessToken, tokenSecret, profile, done) {
  /**
   * Insert to user data
   *
   * @param {Error} Error or null
   * @param {Object} user
   */
  var saveCallback = function(err, user) {
    if (!user) {
      return done(err);
    }
    user.twitter = profile.id;
    user.tokens.push({ kind: 'twitter', accessToken: accessToken, tokenSecret: tokenSecret });
    user.profile.name = user.profile.name || profile.displayName;
    user.profile.picture = user.profile.picture || profile._json.profile_image_url;
    user.save(function(err) {
      done(err, user);
    });
  };

  User.findOne({twitter: profile.id}, accountCallback(req, saveCallback, done));
};

/**
 * Set passport strategy
 *
 * @param {Passport} passport
 *
 * @api public
 */
var passportHelper = function(passport) {
  passport.use(new FacebookStrategy(_.merge(configOAuth.facebook, {passReqToCallback: true}), facebookCallback));
  passport.use(new TwitterStrategy(_.merge(configOAuth.twitter, {passReqToCallback: true}), twitterCallback));

  /**
   * serialize
   */
  passport.serializeUser(function(user, done) {
    done(null, user);
  });

  /**
   * deserialize
   */
  passport.deserializeUser(function(obj, done) {
    done(null, obj);
  });
};

module.exports = passportHelper;
