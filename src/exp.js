/* jshint globalstrict:true */
'use strict';

var _ = require('underscore');


/**
 * Expressions
 */
var selfEvaluating = function(exp) {
  if (_.isString(exp) || _.isNumber(exp)) {
    return True;
  }
  else {
    return False;
  }
};

var isVariable = function(exp) {
  // TODO
  return False;
};

var isQuoted = function(exp) {
  return isTaggedList(exp, 'quote');
};

var isAssignment = function(exp) {
  return isTaggedList(exp, 'set!');
};

var assignmentVariable = function(exp) {
  return Cadr(exp);
};

var assignmentValue = function(exp) {
  return Caddr(exp);
};

var isDefinition = function(exp) {
  return isTaggedList(exp, 'define');
};

var definitionVariable = function(exp) {
  if (isSymbol(Cadr(exp))) {
    return Cadr(exp);
  }
  return Caadr(exp);
};

var definitionValue = function(exp) {
  if (isSymbol(Cadr(exp))) {
    return Caddr(exp);
  }
  return makeLambda(Cdadr(exp),
                    Cddr(exp));
};

var isLamnda = function(exp) {
  return isTaggedList(exp, 'lambda');
};

var lambdaParameters = function(exp) {
  return Cadr(exp);
};

var lambdaBody = function(exp) {
  return Cddr(exp);
};

var makeLambda = function(parameters, body) {
  return Cons('lambda', Cons(parameters, body));
};

var isIf = function(exp) {
  return isTaggedList(exp, 'if');
};

var ifPreficate = function(exp) {
  return Cadr(exp);
};

var ifConsequent = function(exp) {
  return Caddr(exp);
};

var ifAlternative = function(exp) {
  if (Not(isNull(Cdddr(exp)))) {
    return Cadddr(exp);
  }
  return 'false';
};

var makeIf = function(predicate, consequent, alternative) {
  return List('if', predicate, consequent, alternative);
};

var isBegin = function(exp) {
  return isTaggedList(exp, 'begin');
};

var beginActions = function(exp) {
  return Cdr(exp);
};

var isLastExp = function(seq) {
  return isNull(Cdr(seq));
};

var firstExp = function(seq) {
  return Car(seq);
};

var restExps = function(seq) {
  return Cdr(seq);
};

var sequenceToExp = function(seq) {
  if (isNull(seq)) {
    return seq;
  }
  else if (isLastExp(seq)) {
    return firstExp(seq);
  }
  else {
    return makeBegin(seq);
  }
};

var makeBegin = function(seq) {
  return Cons('begin', seq);
};

var isApplication = function(exp) {
  return isPair(exp);
};

var operator = function(exp) {
  return Car(exp);
};

var operands = function(exp) {
  return Cdr(exp);
};

var isNoOperands = function(ops) {
  return isNull(ops);
};

var firstOperand = function(ops) {
  return Car(ops);
};

var restOperands = function(ops) {
  return Cdr(ops);
};

var isCond = function(exp) {
  return isTaggedList(exp, 'cond');
};

var condClauses = function(exp) {
  return Cdr(exp);
};

var condElseClauses = function(clause) {
  return isEq(condPredicate(clause), 'else');
};

var condPredicate = function(clause) {
  return Car(clause);
};

var condActions = function(clause) {
  return Cdr(clause);
};

var CondToIf = function(exp) {
  return expandClauses(condClauses(exp));
};
