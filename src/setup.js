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
