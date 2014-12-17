/*jshint strict:false */
/*global it, describe, expect */

describe('base', function() {
  var base = require('base');

  describe('Nil', function() {
    it('Nil to be null in JavaScript', function() {
      expect(base.Nil).to.be.eql(null);
    });
  });

  describe('True', function() {
    it('True to be true in JavaScript', function() {
      expect(base.True).to.be.eql(true);
    });
  });

  describe('False', function() {
    it('False to be false in JavaScript', function() {
      expect(base.False).to.be.eql(false);
    });
  });
});
