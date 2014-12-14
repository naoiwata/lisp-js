module.exports = (function() {
  'use strict';

  var _ = require('underscore');

  /**
   * Lisp built in methods
   */
  var Nil = null,
      True = true,
      False = false;

  var Not = function(x) {
    return !x;
  };

  var And = function() {
    var arg = arguments,
        len = Length(arg),
        index = -1;
    while (++index < len) {
      var val = arg[index];
      if (isFalse(val)) {
        return arg[index];
      }
    }
    return arg[len - 1];
  };

  var Or = function() {
    var arg = arguments,
        len = Length(arg),
        index = -1;
    while (++index < len) {
      var val = arg[index];
      if (isTrue(val)) {
        return val;
      }
    }
    return arg[len - 1];
  };

  var isEq = function(x, y) {
    return x === y;
  };

  var isPair = function(item) {
    return And(_.isArray(item), isEq(Length(item), 2));
  };

  var isNull = function(x) {
    return _.isNull(x);
  };

  var isSymbol = function(x) {
    return Not(_.isUndefined(x));
  };

  var isTrue = function(x) {
    return Not(isEq(x, False));
  };

  var isFalse = function(x) {
    return isEq(x, False);
  };

  var Cons = function(x, y) {
    var dispatch = function(m) {
      if (isEq(m, 0)) { return x; }
      else if (isEq(m, 1)) { return y; }
      else { throw new Error('Argument not 0 or 1 -- CONS' + m); }
    };
    return dispatch;
  };

  var Car = function(z) { return z(0); };

  var Cdr = function(z) { return z(1); };

  var List = function() {
    var listIter = function(items) {
      if (isNull(_.first(items))) {
        return Nil;
      }
      else {
        return Cons(_.first(items),
                    listIter(_.rest(items)));
      }
    };
    var args = Array.prototype.slice.call(arguments);
    args.push(Nil);
    return listIter(args);
  };

  var Length = function(items) {
    if (isNull(items)) {
      return 0;
    }
    else {
      return Length(Cdr(items)) + 1;
    }
  };

  var ListRef = function(items, n) {
    if (isEq(n, 0)) {
      return Car(items);
    }
    else {
      return ListRef(Cdr(items), n - 1);
    }
  };

  var Map = function(list, proc) {
    return list.map(proc);
  };

  var Cadr = function(list) {
    return Car(Cdr(list));
  };

  var Cddr = function(list) {
    return Cdr(Cdr(list));
  };

  var Caadr = function(list) {
    return Car(Car(Cdr(list)));
  };

  var Cdadr = function(list) {
    return Cdr(Car(Cdr(list)));
  };

  var Caddr = function(list) {
    return Car(Cdr(Cdr(list)));
  };

  var Cdddr = function(list) {
    return Cdr(Cdr(Cdr(list)));
  };

  var Cadddr = function(list) {
    return Car(Cdr(Cdr(Cdr(list))));
  };

   var NumberToString = function(v) {
    if (_.isNumber(v)) {
      return String(v);
    }
    else {
      throw new TypeError(v);
    }
  };

  var StringToNumber = function(v) {
    if (And(_.isString(v), Not(isEq(v, '')), Not(_.isNaN(Number(v))))) {
      return Number(v);
    }
    else {
      return Number(v);
    }
  };

  var isTaggedList = function(exp, tag) {
    if (isPair(exp)) {
      return isEq(Car(exp), tag);
    }
    return False;
  };

  return {
    Nil: Nil,
    True: True,
    False: False,
    Not: Not,
    And: And,
    Or: Or,
    Length: Length,
    isEq: isEq,
    isPair: isPair,
    isNull: isNull,
    isSymbol: isSymbol,
    isTrue: isTrue,
    isFalse: isFalse,
    Cons: Cons,
    Car: Car,
    Cdr: Cdr,
    List: List,
    Map: Map,
    Cadr: Cadr,
    Cddr: Cddr,
    Caadr: Caadr,
    Cdadr: Cdadr,
    Caddr: Caddr,
    Cdddr: Cdddr,
    Cadddr: Cadddr,
    NumberToString: NumberToString,
    StringToNumber: StringToNumber,
    isTaggedList: isTaggedList
  };

}());
