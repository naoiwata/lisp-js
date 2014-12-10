/* jshint globalstrict:true */
'use strict';

var base = require('./base');

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



/**
 * evaluator
 */
var makeProcedure = function(parameters, body, env) {
  return List('procedure', parameters, body, env);
};

var Define = function(isConpoundProcedure, p) {
  return isTaggedList(p, 'procedure');
};

var procedureParameters = function(p) {
  return Cadr(p);
};

var procedureBody = function(p) {
  return Caddr(p);
};

var procedureEnvironment = function(p) {
  return Cadddr(p);
};

/**
 * environment
 */
var enclosingEnvironment = function(env) {
  return Cdr(env);
};

var firstFrame = function(env) {
  return Cdr(env);
};

var theEmptyEnvironment = Nil;

var makeFrame = function(variables, values) {
  return Cons(variables, values);
};

var frameVariables = function(frame) {
  return Car(frame);
};

var frameValues = function(frame) {
  return Cdr(frame);
};

var addBindingToFrame = function(variable, value, frame) {
  setCar(frame, Cons(variable, Car(frame)));
  setCdr(frame, Cons(value, Cdr(frame)));
};

var extendEnvironment = function(vars, vals, baseEnv) {
  if (isEq(Length(vars), Length(vals))) {
    return Cons(makeFrame(vars, vals), baseEnv);
  }
  else {
    if (Length(vars) < Length(vals)) {
      throw new Error ('Too many arguments supplied ' +  vars + vals);
    }
    else {
      throw new Error ('Too few arguments supplied ' +  vars + vals);
    }
  }
};

var lookupVariableValue = function(variable, env) {
  var envLoop = function(env) {
    var scan = function(vars, vals) {
      if (isNull(vars)) {
        return envLoop(enclosingEnvironment(env));
      }
      else if (isEq(variable, Car(vars))) {
        return Car(vals);
      }
      else {
        return Scan(Cdr(vars), Cdr(vals));
      }
    };
    if (isEq(env, theEmptyEnvironment)) {
      throw new Error('Unbound variable' + variable);
    }
    var frame = firstFrame(env);
    return scan(frameVariables(frame), frameValues(frame));
  };
  return envLoop(env);
};

var setVariableValue = function(variable, value, env) {
   var envLoop = function(env) {
    var scan = function(vars, vals) {
      if (isNull(vars)) {
        return envLoop(enclosingEnvironment(env));
      }
      else if (isEq(variable, Car(vars))) {
        return setCar(vals, val);
      }
      else {
        return Scan(Cdr(vars), Cdr(vals));
      }
    };
    if (isEq(env, theEmptyEnvironment)) {
      throw new Error('Unbound variable -- SET!' + variable);
    }
    var frame = firstFrame(env);
    return scan(frameVariables(frame), frameValues(frame));
   };
  return envLoop(env);
};

var defineVariable = function(variable, value, env) {
  var frame = firstFrame(env);
  var scan = function(vars, vals) {
    if (isNull(vars)) {
      return addBindingToFrame(variable, value, frame);
    }
    else if (isEq(variable, Car(vars))) {
      return setCar(vals, value);
    }
    else {
      return scan(Cdr(vars), Cdr(vals));
    }
  };
  return scan(frameVariables(frame), frameValues(frame));
};
