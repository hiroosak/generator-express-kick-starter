"use strict";

exports.index = function(req, res) {
  var user = {};
  if (req.session && req.session.passport && req.session.passport.user) {
    user = req.session.passport.user;
  }
  res.render('home', {title: "Title", user: user});
};
