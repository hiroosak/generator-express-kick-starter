/*global describe:false, it:false, require:false, beforeEach: false */

(function() {

  'use strict';

  var expect = require('expect.js');
  var sinon = require('sinon');
  var requireHelper = require('../require_helper');
  var controller = requireHelper('controllers/home');

  describe('index', function() {
    var res = {};
    var req = {};

    beforeEach(function() {
      res = {};
      req = {
        session: {
          user: {
            asId: "as_id"
          }
        }
      };
      res.render = sinon.spy();
      controller.index(req, res);
    });

    it("set title", function() {
      expect(res.render.called).to.be.ok();
    });
  });
})();
