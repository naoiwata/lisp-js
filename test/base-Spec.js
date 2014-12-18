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

  describe('isEq', function() {
    it('isEq(<Number>, <Number>) return true', function() {
      expect(base.isEq(100, 100)).to.be.true;
    });

    it('isEq(<Number>, <Not Number>) return false', function() {
      expect(base.isEq(100, '100')).to.be.false;
    });

    it('isEq(<String>, <String>) return true', function() {
      expect(base.isEq('hoge', 'hoge')).to.be.true;
    });

    it('isEq(<Function>, <Function>) return true', function() {
      var func = function() {};
      expect(base.isEq(func, func)).to.be.true;
    });

    it('isEq(<Function1>, <Function2>) return false', function() {
      expect(base.isEq(function() {}, function() {})).to.be.false;
    });

    it('isEq(<Object>, <Object>) return true', function() {
      var obj = {};
      expect(base.isEq(obj, obj)).to.be.true;
    });

    it('isEq(<Object1>, <Object2>) return false', function() {
      var obj = {};
      expect(base.isEq({}, {})).to.be.false;
    });
  });

  describe('isEqual', function() {
    it('isEqual(<Number>, <Number>) return true', function() {
      expect(base.isEqual(100, 100)).to.be.true;
    });

    it('isEqual(<Number>, <Not Number>) return false', function() {
      expect(base.isEqual(100, '100')).to.be.false;
    });

    it('isEqual(<String>, <String>) return true', function() {
      expect(base.isEqual('hoge', 'hoge')).to.be.true;
    });

    it('isEqual(<Function>, <Function>) return true', function() {
      var func = function() {};
      expect(base.isEqual(func, func)).to.be.true;
    });

    it('isEqual(<Function1>, <Function2>) return false', function() {
      expect(base.isEqual(function() {}, function() {})).to.be.false;
    });

    it('isEqual(<Object>, <Object>) return true', function() {
      var obj = {};
      expect(base.isEqual(obj, obj)).to.be.true;
    });

    it('isEqual(<Object1>, <Object2>) return true', function() {
      var obj = {};
      expect(base.isEqual({}, {})).to.be.true;
    });;
  });
});
