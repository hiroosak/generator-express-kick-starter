/*global describe:false, it:false, require:false, beforeEach: false */

(function() {
  'use strict';

  var expect = require('expect.js');
  var sinon = require('sinon');
  var requireHelper = require('../../require_helper');
  var controller = requireHelper('controllers/api/users');

  describe('controllers/api/users', function() {
    var res = {};
    var req = {};
    var user = {
      id: 1,
      asId: "asId",
      appId: "appId",
      accessToken: 'access_token'
    };

    describe('#me', function() {
      beforeEach(function() {
        req = {user: user};
        res = {json: sinon.spy()};
        controller.me(req, res);
      });

      it("call res.json with data", function() {
        expect(
          res.json.calledWith({id: 1, asId: "asId", appId: "appId"})
        ).to.be.ok();
      });
    });

    describe('#show', function() {
      beforeEach(function() {
        req = {
          services: {
            user: user
          }
        };
        res = {json: sinon.spy()};
        controller.show(req, res);
      });

      it("call res.json with data", function() {
        expect(
          res.json.calledWith({id: 1, asId: "asId", appId: "appId", accessToken: 'access_token'})
        ).to.be.ok();
      });
    });
  });
})();
