/* jshint globalstrict:true */
'use strict';

var _ = require('underscore');


var NumberToString = function(v) {
  if (!_.isNumber(v)) {
    throw new TypeError(v);
  }
  return String(v);
};

var StringToNumber = function(v) {
  if (!_.isString(v) || v === '' || _.isNaN(Number(v))) {
    throw new TypeError(v);
  }
  return Number(v);
};

var isTaggedList = function(exp, tag) {
  if (isPair(exp)) {
    return isEq(Car(exp), tag);
  }
  return False;
};
