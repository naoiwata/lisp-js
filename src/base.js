/* jshint globalstrict:true */
'use strict';

var _ = require('underscore');

module.exports = (function() {

  /**
   * Lisp built in methods
   */
  var Nil = null,
      True = true,
      False = false;

  var Not = function(x) {
    return !x;
  };

  var Length = function(x) {
    return x.length;
  };

  var Car = function(list) {
    if (isPair(list)) {
      return _.first(list);
    }
    else {
      throw new Error('parameter isn\'t list -- CAR ' + list);
    }
  };

  var Cdr = function(list) {
    if (isPair(list)) {
      return _.rest(list);
    }
    else {
      throw new Error('parameter isn\'t list -- CDR ' + list);
    }
  };

  var Cons = function(car, cdr) {
    return [car, cdr];
  };

  var List = function() {
    var list = [],
        arg = arguments,
        len = Length(arg),
        index = -1;
    while (++index < len) {
      list.push(arg[index]);
    }
    return list;
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

  var isEq = function(x, y) {
    return x === y;
  };

  var isPair = function(item) {
    return _.isArray(item) && isEq(Length(item), 2);
  };

  var isNull = function(x) {
    return _.isNull(x);
  };

  var isSymbol = function(x) {
    // FIXME
    return _.isString(x);
  };

  var isTrue = function(x) {
    return Not(isEq(x, False));
  };

  var isFalse = function(x) {
    return isEq(x, False);
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
    if (_.isString(v) && v !== '' && !_.isNaN(Number(v))) {
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
    Length: Length,
    Car: Car,
    Cdr: Cdr,
    Cons: Cons,
    List: List,
    Map: Map,
    Cadr: Cadr,
    Cddr: Cddr,
    Caadr: Caadr,
    Cdadr: Cdadr,
    Caddr: Caddr,
    Cdddr: Cdddr,
    Cadddr: Cadddr,
    isEq: isEq,
    isPair: isPair,
    isNull: isNull,
    isSymbol: isSymbol,
    isTrue: isTrue,
    isFalse: isFalse,
    NumberToString: NumberToString,
    StringToNumber: StringToNumber,
    isTaggedList: isTaggedList
  };

}());
