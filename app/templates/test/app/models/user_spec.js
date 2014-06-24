/*global describe:false, it:false, require:false */

(function() {
  'use strict';

  var expect = require('expect.js');
  var requireHelper = require('../require_helper');
  var User = requireHelper('models/User');

  describe('User', function() {
    it("should eql name", function() {
      expect(User.modelName).to.equal('User');
    });
  });
})();
