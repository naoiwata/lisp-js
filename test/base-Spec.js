/*jshint strict:false */
/*global it, describe, expect */

describe('base', function() {
  var base = require('base');

  describe('Nil', function() {
    it('Nil to be null in JavaScript', function() {
      expect(base.Nil).to.be.null;
    });
  });

  describe('True', function() {
    it('True to be true in JavaScript', function() {
      expect(base.True).to.be.true;
    });
  });

  describe('False', function() {
    it('False to be false in JavaScript', function() {
      expect(base.False).to.be.false;
    });
  });

  describe('And', function() {
    var True = base.True,
        False = base.False;
    it('And(True, True, True) should return true', function() {
      expect(base.And(True, True, True)).to.be.true;
    });

    it('And(True, True, False) should return false', function() {
     expect(base.And(True, True, False)).to.be.false;
    });

    it('And(True, False, True) should return false', function() {
      expect(base.And(True, False, True)).to.be.false;
    });

    it('And(False, True, True) should return false', function() {
      expect(base.And(False, True, True)).to.be.false;
    });

    it('And(False, False, False) should return false', function() {
      expect(base.And(False, False, False)).to.be.false;
    });
  });

  describe('Or', function() {
    var True = base.True,
        False = base.False;
    it('Or(True, True, True) should return true', function() {
      expect(base.Or(True, True, True)).to.be.true;
    });

    it('Or(True, True, False) should return true', function() {
     expect(base.Or(True, True, False)).to.be.true;
    });

    it('Or(True, False, True) should return true', function() {
      expect(base.Or(True, False, True)).to.be.true;
    });

    it('Or(False, True, True) should return true', function() {
      expect(base.Or(False, True, True)).to.be.true;
    });

    it('Or(False, False, False) should return false', function() {
      expect(base.Or(False, False, False)).to.be.false;
    });
  });
});
