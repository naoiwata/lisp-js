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
        False = base.False,
        And= base.And;
    it('And(True, True, True) should return true', function() {
      expect(And(True, True, True)).to.be.true;
    });

    it('And(True, True, False) should return false', function() {
     expect(And(True, True, False)).to.be.false;
    });

    it('And(True, False, True) should return false', function() {
      expect(And(True, False, True)).to.be.false;
    });

    it('And(False, True, True) should return false', function() {
      expect(And(False, True, True)).to.be.false;
    });

    it('And(False, False, False) should return false', function() {
      expect(And(False, False, False)).to.be.false;
    });
  });

  describe('Or', function() {
    var True = base.True,
        False = base.False,
        Or = base.Or;
    it('Or(True, True, True) should return true', function() {
      expect(Or(True, True, True)).to.be.true;
    });

    it('Or(True, True, False) should return true', function() {
     expect(Or(True, True, False)).to.be.true;
    });

    it('Or(True, False, True) should return true', function() {
      expect(Or(True, False, True)).to.be.true;
    });

    it('Or(False, True, True) should return true', function() {
      expect(Or(False, True, True)).to.be.true;
    });

    it('Or(False, False, False) should return false', function() {
      expect(Or(False, False, False)).to.be.false;
    });
  });

  describe('isEq', function() {
    var isEq = base.isEq;
    it('isEq(<Number>, <Number>) return true', function() {
      expect(isEq(100, 100)).to.be.true;
    });

    it('isEq(<Number>, <Not Number>) return false', function() {
      expect(isEq(100, '100')).to.be.false;
    });

    it('isEq(<String>, <String>) return true', function() {
      expect(isEq('hoge', 'hoge')).to.be.true;
    });

    it('isEq(<Function>, <Function>) return true', function() {
      var func = function() {};
      expect(isEq(func, func)).to.be.true;
    });

    it('isEq(<Function1>, <Function2>) return false', function() {
      expect(isEq(function() {}, function() {})).to.be.false;
    });

    it('isEq(<Object>, <Object>) return true', function() {
      var obj = {};
      expect(isEq(obj, obj)).to.be.true;
    });

    it('isEq(<Object1>, <Object2>) return false', function() {
      var obj = {};
      expect(isEq({}, {})).to.be.false;
    });
  });

  describe('isEqual', function() {
    var isEqual = base.isEqual;
    it('isEqual(<Number>, <Number>) return true', function() {
      expect(isEqual(100, 100)).to.be.true;
    });

    it('isEqual(<Number>, <Not Number>) return false', function() {
      expect(isEqual(100, '100')).to.be.false;
    });

    it('isEqual(<String>, <String>) return true', function() {
      expect(isEqual('hoge', 'hoge')).to.be.true;
    });

    it('isEqual(<Function>, <Function>) return true', function() {
      var func = function() {};
      expect(isEqual(func, func)).to.be.true;
    });

    it('isEqual(<Function1>, <Function2>) return false', function() {
      expect(isEqual(function() {}, function() {})).to.be.false;
    });

    it('isEqual(<Object>, <Object>) return true', function() {
      var obj = {};
      expect(isEqual(obj, obj)).to.be.true;
    });

    it('isEqual(<Object1>, <Object2>) return true', function() {
      var obj = {};
      expect( isEqual({}, {})).to.be.true;
    });;
  });

  describe('isPair', function() {
    var isPair = base.isPair;
    it('isPair(<List>) return true', function() {
      var list = base.Cons(1, 2);
      expect(isPair(list)).to.be.true;
    });

    it('isPair(<List>) return true', function() {
      var Cons = base.Cons,
          list = Cons(Cons(1, 2), Cons(3, 4));
      expect(isPair(list)).to.be.true;
    });

    it('isPair(<List>) return true', function() {
      var list = base.Cons(1, 2);
      expect(isPair(list)).to.be.true;
    });

    it('isPair(<Nil>) return false', function() {
      expect(isPair(base.Nil)).to.be.false;
    });
  });

  describe('isNull', function() {
    it('isNull(<Nil>) return true', function() {
      expect(base.isNull(base.Nil)).to.be.true;
    });

    it('isNull(<List>) return false', function() {
      expect(base.isNull(base.Cons('hoge', 'fuga'))).to.be.false;
    });
  });

  describe.skip('isSymbol', function() {
    // TODO
  });

  describe('isTrue', function() {
    it('isTrue(true) return true', function() {
      expect(base.isTrue(true)).to.be.true;
    });

    it('isTrue(false) return false', function() {
      expect(base.isTrue(false)).to.be.false;
    });

    it('isTrue(100) return true', function() {
      expect(base.isTrue(100)).to.be.true;
    });

    it('isTrue(Nil) return true', function() {
      expect(base.isTrue(base.Nil)).to.be.true;
    });

    it('isTrue("String") return true', function() {
      expect(base.isTrue('string')).to.be.true;
    });
  });

  describe('isFalse', function() {
    it('isFalse(true) return false', function() {
      expect(base.isFalse(true)).to.be.false;
    });

    it('isFalse(false) return true', function() {
      expect(base.isFalse(false)).to.be.true;
    });

    it('isFalse(100) return false', function() {
      expect(base.isFalse(100)).to.be.false;
    });

    it('isFalse(Nil) return false', function() {
      expect(base.isFalse(base.Nil)).to.be.false;
    });

    it('isFalse("String") return false', function() {
      expect(base.isFalse('string')).to.be.false;
    });
  });
});
