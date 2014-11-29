/* jshint globalstrict:true */

'use strict';

var _ = require('underscore');
var Nil = [];


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
    return apply(Eval(operator(exp), env),
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
    throw new Error('Unknown procedure type -- APPLY ' + exp);
  }
};

/**
 * listOfValues
 * @param {Any} exps
 * @param {Object} env
 */
var listOfValues = function(exps, env) {
  if (isNoOperands exp) {
    return Nil;
  }
  else {
    return Cons(Eval(firstOperand(exps), env),
                listOfValues(restOperands(exps), env));
  }
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
  else {
    return Eval(ifAlternative(exp), env);
  }
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
                   eval(assignmentValue(exp), env),
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
                   eval(definitionValue(exp), env),
                   env);
  return 'ok';
};
