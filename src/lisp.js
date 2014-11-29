/* jshint globalstrict:true */

'use strict';

var _ = require('underscore');


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

