import { KeyPredicate } from './variable-criteria.predicate';
import { VariableCriteria, QueryOperator } from '../../service/rest/rest.interface';
import { ResultFilter } from '../query/query.builder.interface';

/**
 * Holds the the variable criterias and the keys
 * which have not been mapped to criterias
 */
export interface CriteriasAndKeys {
  criterias: VariableCriteria[];
  keysLeft: string[];
}

export type ValuePredicateFactory = (variables: Object) => KeyPredicate;
export type VariableMapper = (variables: Object) => (key: string) => VariableCriteria | VariableCriteria[];
export type CriteriaBuilder = (variables: Object, preBuilts?: CriteriasAndKeys) => CriteriasAndKeys;

/**
 * Returns a criteria builder which takes a variable object and pre built
 * CriteriasAndKeys from last call to only filter criterias not already considered
 * @param keyPredicates a list of key predicates to apply
 * @param valuePredicates a list of value predicates to apply
 * @param mapFn a function to map the resulting key value pairs to a VariableCriteria
 */
export function criteriaBuilderFactory(
  keyPredicates: KeyPredicate[],
  valuePredicates: ValuePredicateFactory[],
  mapFn: VariableMapper,
) {
  return (variables: Object, preBuilts?: CriteriasAndKeys) =>
    buildCriterias(variables, keyPredicates, valuePredicates, mapFn, preBuilts);
}

/**
 * Builds a CriteriasAndKeys object with the given builders and variables
 * @param builders list of criteria builders
 * @param variables the object to transform
 */
export function buildVariablesAndKeys<E extends {[key: string]: string}, F extends ResultFilter<E>>(
  builders: CriteriaBuilder[],
  variables: F,
  referenceEnum: E,
): CriteriasAndKeys {
  const critsAndKeys: CriteriasAndKeys = builders.reduce(
    (preBuilts, build) => build(variables, preBuilts),
    undefined as any,
  );
  if (variables.reference !== undefined && variables.reference.name !== undefined) {
    critsAndKeys.criterias.push({
      name: referenceEnum[variables.reference.name as string],
      operator: 'eq',
      value: variables.reference.value,
    });
  }
  return critsAndKeys;
}

/**
 * Maps primitive values to VariableCriterias
 * @param variables holding values of type string | boolean | number
 */
export function primitiveMapper(variables: {[key: string]: string}): (key: string) => VariableCriteria {
  return (key: string) => ({
    name: key,
    operator: 'eq',
    value: variables[key],
  });
}

/**
 * Maps list values to VariableCriterias.
 * @param variables holding values of type Array<string>
 */
export function multiValueMapper(variables: {[key: string]: (string | number)[]}): (key: string) => VariableCriteria[] {
  return (key: string) => {
    const vals = variables[key];
    return vals.filter(val => val !== 'All').map(
      val =>
        ({
          name: key,
          operator: 'eq',
          value: val,
        } as VariableCriteria),
    );
  };
}

/**
 * Creates VariableCriterias considering from and to keywords
 * in the key setting the operator to the respective value of
 * either gteq or lteq.
 * @param variables holding values of type Date
 */
export function dateMapper(variables: {[key: string]: Date}) {
  return (key: string) => {
    const val: Date = variables[key];
    let operator: QueryOperator = 'eq';
    if (key.startsWith('from') === true) {
      operator = 'gteq';
    } else if (key.startsWith('to') === true) {
      operator = 'lteq';
    }
    return {
      name: key,
      operator: operator,
      value: val.toISOString(),
    } as VariableCriteria;
  };
}

function buildCriterias(
  variables: Object,
  keyPredicates: KeyPredicate[],
  valuePredicates: ValuePredicateFactory[],
  mapFn: VariableMapper,
  preBuilts?: CriteriasAndKeys,
): CriteriasAndKeys {
  // TODO: refactor to use objects instead of keys
  // tslint:disable-next-line:no-use-before-declare
  const { keys, criterias: lastCriterias } = initializeKeysAndCrits(variables, preBuilts);
  const [matchingKeys, otherKeys] = mapReduceValidKeys(keys, keyPredicates);
  const reducedVariables = matchingKeys.reduce(reduceVariables(variables), {});
  const [validKeys, other] = mapReduceValidValues(reducedVariables, valuePredicates);
  const crits = validKeys.map(mapFn(reducedVariables));
  return {
    criterias: mergeCriterias(lastCriterias, crits),
    keysLeft: [...otherKeys, ...other],
  };
}

function mapReduceValidKeys(keys: string[], keyPredicates: KeyPredicate[]): string[][] {
  return keys.reduce(
    ([match, miss], key) => {
      let isMatch = true;
      keyPredicates.forEach(predicate => (isMatch = predicate(key) && isMatch));
      return isMatch ? [[...match, key], miss] : [match, [...miss, key]];
    },
    [[], []] as string[][],
  );
}

function mapReduceValidValues(variables: Object, valuePredicates: ValuePredicateFactory[]): string[][] {
  return Object.keys(variables).reduce(
    ([match, miss], key) => {
      let isMatch = true;
      valuePredicates.forEach(predicate => (isMatch = predicate(variables)(key) && isMatch));
      return isMatch ? [[...match, key], miss] : [match, [...miss, key]];
    },
    [[], []] as string[][],
  );
}

function initializeKeysAndCrits(variables: Object, preBuilts?: CriteriasAndKeys) {
  let keys;
  let criterias: VariableCriteria[] = [];
  if (preBuilts === undefined) {
    keys = Object.keys(variables);
  } else {
    keys = preBuilts.keysLeft;
    criterias = preBuilts.criterias;
  }
  return { keys, criterias };
}

function reduceVariables(variables: {[key: string]: any}) {
  return (reducedVars: Object, nextKey: string) => {
    const obj: {[key: string]: any} = {};
    obj[nextKey] = variables[nextKey];
    return { ...reducedVars, ...obj };
  };
}

function mergeCriterias(criterias: VariableCriteria[], newCrits: (VariableCriteria | VariableCriteria[])[]) {
  let next: VariableCriteria[] = [];
  if (newCrits[0] !== undefined && newCrits[0].constructor === Array) {
    next = criterias.concat(
      (newCrits as VariableCriteria[][]).reduce((prev, multiCrits) => prev.concat(multiCrits), []),
    );
  } else if (criterias !== undefined) {
    next = criterias.concat(newCrits as VariableCriteria[]);
  }
  return next;
}
