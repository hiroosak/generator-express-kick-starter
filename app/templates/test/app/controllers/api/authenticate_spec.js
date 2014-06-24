/*global describe:false, require:false, it:false */

(function() {
  'use strict';

  var expect = require('expect.js');
  var sinon = require('sinon');
  var requireHelper = require('../../require_helper');
  var controller = requireHelper('controllers/api/authenticate');

  var res = {};
  var req = {};
  var next;

  describe('controllers/api/authenticate', function() {
    describe('index', function() {
      it("should authorize the index action", function() {
        req.user = {name: 'name'};
        res.json = sinon.spy();
        controller.index(req, res, function() {});
        expect(res.json.called).to.be.ok();
      });

      it("should error when the user isn't authorized", function() {
        req.user = null;
        next = sinon.spy();
        controller.index(req, res, next);
        expect(next.calledWith(new Error("But Authentication data"))).to.be.ok();
      });
    });
  });
})();
