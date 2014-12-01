/* jshint globalstrict:true */

'use strict';

var _ = require('underscore');


/* --------------------------
 * Lisp built in methods
 * -------------------------- */
var Nil = [],
    True = true,
    False = false;

var isEq = function(x, y) {
  return x === y? true: false;
};

var Not = function(x) {
  return isEq(x, False);
};

var isNull = function(x) {
  return _.isNull(x);
};

var isSymbol = function(x) {
  // FIXME
  return _.isString(x);
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
    list.push(lists[index]);
  }
  return list;
};

var isPair = function(item) {
  return _.isArray(item) && isEq(item.length, 2)? true: false;
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

/**
 * Eval
 * @param {Any} exp
 * @param {Object} env
 */
var Eval = function(exp, env) {
  if (selfEvaluating(exp)) {
    return exp;
  }
  else if (isVariable(exp)) {
    return lookupVariableValue(exp, env);
  }
  else if (isQuoted(exp)) {
    return textOfQuotation(exp);
  }
  else if (isAssignment(exp)) {
    return evalAssignment(exp, env);
  }
  else if (isDefinitiation(exp)) {
    return evalDefinitiation(exp, env);
  }
  else if (isIf(exp)) {
    return evalIf(exp, env);
  }
  else if (isLambda(exp)) {
    return makeProcedure(lambdaParameters(exp),
                         lambdaBody(exp),
                         env);
  }
  else if (isBegin(exp)) {
    return evalSequence(beginActions(exp), env);
  }
  else if (isApplication(exp)) {
    return Apply(Eval(operator(exp), env),
                 listOfValues(operands(exp), env));
  }
  else {
    throw new Error('Unknown expression type -- EVAL ' + exp);
  }
};

/**
 * Apply
 * @param {Array} procedure
 * @param {Array} args
 */
var Apply = function(procedure, args) {
  if (isPrimitiveProcedure(procedure)) {
    return applyPrimitiveProcedure(procedure, args);
  }
  else if (isCompoundProcedure(procedure)) {
    return evalSequence(procedureBody(procedure),
                        extendEnvironment(procedureParameters(procedure),
                                          args,
                                          procedureEnvironment(procedure)));
  }
  else {
    throw new Error('Unknown procedure type -- APPLY ' + procedure);
  }
};

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

/**
 * listOfValues
 * @param {Any} exps
 * @param {Object} env
 */
var listOfValues = function(exps, env) {
  if (isNoOperands(exp)) {
    return Nil;
  }
  return Cons(Eval(firstOperand(exps), env),
              listOfValues(restOperands(exps), env));
};

/**
 * evalIf
 * @param {Any} exp
 * @param {Object} env
 */
var evalIf = function(exp, env) {
  if (isTrue(Eval(ifPredicate(env), env))) {
    return Eval(ifConsequent(exp), env);
  }
  return Eval(ifAlternative(exp), env);
};

/**
 * evalSequence
 * @param {Any} exps
 * @param {Object} env
 */
var evalSequence = function(exps, env) {
  if (isLastExp(exps)) {
    return Eval(firstExp(exps), env);
  }
  else {
    Eval(firstExp(exps), env);
    return evalSequence(restExps(exps), env);
  }
};

/**
 * evalAssignment
 * @param {Any} exp
 * @param {Object} env
 */
var evalAssignment = function(exp, env) {
  setValiableValue(assignmentValiable(exp),
                   Eval(assignmentValue(exp), env),
                   env);
  return 'ok';
};

/**
 * evalDefinition
 * @param {Any} exp
 * @param {Object} env
 */
var evalDefinition = function(exp, env) {
  setValiableValue(definitionValiable(exp),
                   Eval(definitionValue(exp), env),
                   env);
  return 'ok';
};

/* --------------------------
 * Expressions
 * --------------------------
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
  return isTaggedList(exp, 'if?');
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

/* --------------------------
 * Utilities
 * -------------------------- */
var isTaggedList = function(exp, tag) {
  if (isPair(exp)) {
    return isEq(Car(exp), tag);
  }
  else {
    return False;
  }
};

