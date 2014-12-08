/* jshint globalstrict:true */
'use strict';

var setupEnvironment = function() {
  var initialEnv = extendEnvironment(primitiveProcedureNames(),
                                     primitiveProcedureObjects(),
                                     theEmptyEnvironment);
  defineVariable('true', True, initialEnv);
  defineVariable('false', False, initialEnv);
  initialEnv();
};

var theGlobalEnvironment = setupEnvironment();

var isPrimitiveProcedure = function(proc) {
  return isTaggedList(proc, 'primitive');
};

var primitiveImplementation = function(proc) {
  return Cadr(proc);
};

var primitiveProcedures = List(List('car', Car),
                               List('cdr', Cdr),
                               List('cons', Cons),
                               List('null?', isNull)
                               // TODO
                              );

var primitiveProcedureNames = function() {
  return Map(priitiveProcedures, Car);
};

var priitiveProcesureObjects = function() {
  return Map(primitiveProcedures,
             function(proc) {return List('primitive', Car(proc))});
};

var applyPrimitiveProcedure = function(proc, args) {
  return applyInUnderlyingScheme(primitiveImplementation(proc),
                                 args);
};

var inputPrompt = ';;; M-Eval input: ';

var outputPrompt = ';;; M-Eval value: ';

var driverLoop = function() {
  promptForInput(inputPrompt);
  // TODO: read()
  var input = read();
  var output = Eval(input, theGlobalEnvironment);
  announceOutput(outputPrompt);
  userPrint(output);
  return driverLoop();
};

var promptForInput = function(string) {
  // TODO: newline(), display()
  newline();
  newline();
  display(string);
  newline();
};

var announceOutput = function(string) {
  newline();
  display(string);
  newline();
};

var userPrint = function(object) {
  if (isCompoundProcedure(object)) {
    display(List('compondProceure',
                 procedureParameters(object),
                 procedureBody(object)));
  }
  else {
    display(object);
  }
};

var theGlobalEnvironment = setupEnvironment();

deriverLoop();
