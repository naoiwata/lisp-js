/* jshint globalstrict:true */
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

var Car = function(list) {
  return _.first(list);
};

var Cdr = function(list) {
  return _.rest(list);
};

var Cons = function(car, cdr) {
  return [car, cdr];
};

var List = function() {
  var list = [],
      arg = arguments,
      len = arg.length,
      index = -1;
  while (++index < len) {
    list.push(arg[index]);
  }
  return list;
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
  return x === y? True: False;
};

var isPair = function(item) {
  return _.isArray(item) && isEq(item.length, 2)? True: False;
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
