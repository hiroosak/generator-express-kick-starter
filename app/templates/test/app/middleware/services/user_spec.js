/*global describe:false, it:false, beforeEach:false */

(function() {
  'use strict';

  var requireHelper = require('../../require_helper');
  
  var User = requireHelper('models/user');
  var expect = require('expect.js');
  var userService = requireHelper('middleware/services/user');

  describe('middleware/services/user', function() {
    // mock
    var req = {
      checkParams: function() {
        return {
          isInt: function() {
          }
        };
      },
      validationErrors: function() {
        return null;
      }
    };
    var res = {};
    var user;

    beforeEach(function(done) {
      User.create({
        profile: {
          name: 'name1',
          picture: 'http://example.jp'
        },
        tokens: [
          {accessToken: 'token', kind: 'facebook'}
        ],
        createdAt: new Date(),
        updatedAt: new Date()
      }, function(err, _user) {
        user = _user;
        expect(err).to.be(null);
        done();
      });
    });

    it("should not found user", function(done) {
      var next = function(err) {
        expect(err).to.be.a(Error);
        done();
      };
      userService(req, res, next, 1);
    });

    it("should found user", function(done) {
      var next = function(err) {
        expect(err).to.be(undefined);

        expect(req.services.user.profile.name).to.be.eql("name1");
        expect(req.services.user.profile.picture).to.be.eql("http://example.jp");

        expect(req.services.user.createdAt).to.be.a("object"); // Date
        expect(req.services.user.updatedAt).to.be.a("object"); // Date

        done();
      };

      userService(req, res, next, user._id);
    });
  });
})();
