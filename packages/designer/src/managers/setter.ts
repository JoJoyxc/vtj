
export const SetterValueTypes: Record<string, string[]> = {
  String: ['StringSetter', 'SelectSetter'],
  Number: ['NumberSetter'],
  Boolean: ['BooleanSetter'],
  Object: ['JSONSetter'],
  Function: ['FunctionSetter'],
  Array: ['JSONSetter'],
  JSFunction: ['FunctionSetter'],
  JSExpression: ['ExpressionSetter']
};
