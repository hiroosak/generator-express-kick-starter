/*global describe:false, it:false, require:false, beforeEach:false */

(function() {
  'use strict';

  var expect = require('expect.js');
  var requireHelper = require('../require_helper');
  var router = requireHelper('routes/error');
  var sinon = require('sinon');
  var req, res, err, next;

  beforeEach(function() {
    req = {};
    res = {};
    err = {};
    next = sinon.spy();
  });

  describe("routes/error", function() {
    describe("logError", function() {
      it("should call next callback", function() {
        err = new Error();
        router.logError(err, req, res, next);
        expect(next.calledWith(err)).to.be.ok();
      });
    });

    describe("apiErrorHandler", function() {
      beforeEach(function() {
        err = {
          status: 500,
          message: "Error",
          stack: 'Stack'
        };
      });

      it("should response json with status code", function() {
        res.json = sinon.spy();
        router.apiErrorHandler(err, req, res, next);
        expect(res.json.calledWith(err.status, err)).to.be.ok();
      });

      it("should response default status code", function() {
        res.json = sinon.spy();
        err.status = null;
        router.apiErrorHandler(err, req, res, next);
        expect(res.json.calledWith(500, err)).to.be.ok();
      });
    });

    describe("errorHandler", function() {
      beforeEach(function() {
        err = {
          status: 500,
          message: "Error",
          stack: 'Stack'
        };
        res.status = sinon.spy();
        res.render = sinon.spy();
      });

      it("should response render with status code", function() {
        router.errorHandler(err, req, res, next);
        expect(res.status.calledWith(err.status)).to.be.ok();
        expect(res.render.calledWith('error', err)).to.be.ok();
      });

      it("should call next callback", function() {
        err.status = null;
        router.errorHandler(err, req, res, next);
        expect(next.calledWith(err)).to.be.ok();
      });

    });

    describe("notFoundError", function() {
    });
  });
})();
