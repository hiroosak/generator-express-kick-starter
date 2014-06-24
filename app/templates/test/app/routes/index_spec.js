/*global describe:false, it:false */

(function() {
  'use strict';

  var expect = require('expect.js');
  var sinon = require('sinon');

  var requireHelper = require('../require_helper');
  var route = requireHelper('routes')();

  describe('Routes', function() {
    var req = {};
    var res = {};

    it('is routing home', function(done) {
      req = {};
      res = {
        render: function(viewPath) {
          expect(viewPath).to.eql('home');
          done();
        }
      };
      route.handle({url: "/", method: "GET"}, res);
    });

    it('is not found page', function(done) {
      var res = {
        status: sinon.spy(),
        render: function(viewPath, opts) {
          expect(this.status.calledWith(404)).to.be.ok();
          expect(viewPath).to.eql('error');
          expect(opts.message).to.eql("Not Found");
          expect(opts).to.have.property("message");
          done();
        }
      };

      route.handle({url: "/page_not_found", method: "GET"}, res);
    });
  });
})();
