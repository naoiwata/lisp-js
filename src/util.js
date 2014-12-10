/* jshint globalstrict:true */
'use strict';

var _ = require('underscore'),
    base = require('./base');

var False = base.False,
    Car = base.Car,
    isEq = base.isEq,
    isPair = base.isPair;

module.exports = (function() {

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
    NumberToString: NumberToString,
    StringToNumber: StringToNumber,
    isTaggedList: isTaggedList
  };

}());

