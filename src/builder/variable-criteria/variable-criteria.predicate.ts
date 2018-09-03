/**
 * Predicate which can be applied to a map of strings.
 *
 * Map has to be of type [key: string]: any
 */
export type KeyPredicate = (key: string) => boolean;

// KEY PREDICATES
/**
 * Skip keys with value "viewOf"
 * @param key the key to inspect
 */
export function skipViewOf(key: string): boolean {
  return key !== 'viewOf';
}

/**
 * Skip keys with value "type"
 * @param key the key to inspect
 */
export function skipType(key: string): boolean {
  return key !== 'type';
}

/**
 * Skip keys with value "processDefinition"
 * @param key the key to inspect
 */
export function skipProcessDefinition(key: string): boolean {
  return key !== 'processDefinition';
}

// VALUE PREDICATES
/**
 * Skip undefined values
 * @param variables the object to filter
 */
export function skipUndefinedValues(variables: {[key: string]: any}): KeyPredicate {
  return (key: string) => variables[key] !== undefined;
}

/**
 * Skip empty string values ""
 * @param variables the object to filter
 */
export function skipEmptyValues(variables: {[key: string]: string}): KeyPredicate {
  return (key: string) => variables[key] !== '';
}

/**
 * Skip string value "All"
 * @param variables the object to filter
 */
export function skipAllValue(variables: {[key: string]: string}): KeyPredicate {
  return (key: string) => variables[key] !== 'All';
}

/**
 * Skip string value "Unassigned"
 * @param variables the object to filter
 */
export function skipUnassignedValue(variables: {[key: string]: string}): KeyPredicate {
  return (key: string) => variables[key] !== 'Unassigned';
}

/**
 * Skip empty array values []
 * @param variables the object to filter
 */
export function skipEmptyArrays(variables: {[key: string]: string[]}): KeyPredicate {
  return (key: string) => variables[key].length > 0;
}

/**
 * Filter primitive values of string|number|boolean
 * @param variables the object to filter
 */
export function onlyPrimitiveValues(variables: {[key: string]: any}): KeyPredicate {
  return (key: string) => ['string', 'number', 'boolean'].includes(typeof variables[key]);
}

/**
 * Filter values of type Array
 * @param variables the object to filter
 */
export function onlyArrayValues(variables: {[key: string]: any}): KeyPredicate {
  return (key: string) => variables[key] instanceof Array;
}

/**
 * Filter values of type Date
 * @param variables the object to filter
 */
export function onlyDateValues(variables: {[key: string]: any}): KeyPredicate {
  return (key: string) => variables[key] instanceof Date;
}
