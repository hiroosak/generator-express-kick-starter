/*global describe:false, it:false, require:false */

(function() {
  'use strict';

  var expect = require('expect.js');
  var passport = require('passport');

  var requireHelper = require('../require_helper');
  var helper = requireHelper('helpers/passport_helper');

  // mock
  var user = {a: 1};
  
  helper(passport);

  describe("use", function() {
    it("should set strategy", function() {
      expect(passport._strategies).to.have.key('facebook');
      expect(passport._strategies).to.have.key('twitter');
    });
  });

  describe("serializeUser", function() {
    it("should set serializeUser", function(done) {
      var callback = function(err, res) {
        expect(err).to.eql(null);
        expect(res).to.eql(user);
        done();
      };

      expect(passport._serializers).to.have.length(1);
      passport._serializers[0](user, callback);
    });
  });

  describe("deserializeUser", function() {
    it("should set deserializeUser", function(done) {
      var callback = function(err, res) {
        expect(err).to.eql(null);
        expect(res).to.eql(user);
        done();
      };

      expect(passport._deserializers).to.have.length(1);
      passport._deserializers[0](user, callback);
    });
  });
})();
