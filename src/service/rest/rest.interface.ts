export interface QueryParams {
  firstResult: number;
  maxResults: number;
}

export interface Countable {
  count: number;
}

export interface ValueInfo {
  objectTypeName: string;
  serializationDataFormat: string;
}

/**
 * Representation of a variable instance.
 * Supply a Key and a Lookuptype for strong typings.
 */
export interface ObjectValue<K extends keyof L = any, L = any> {
  name: K;
  value: L[K];
  type: string;
  /**
   * Has to be set if type is not a primitive
   */
  valueInfo?: ValueInfo;
}

export type QueryOperator = 'eq' | 'neq' | 'gt' | 'gteq' | 'lt' | 'lteq' | 'like';
export interface VariableCriteria {
  name: string;
  operator: QueryOperator;
  value: string | number | boolean;
}

export type SortOrder = 'asc' | 'desc';
export interface SortingCriteria<B, P> {
  sortBy: B;
  sortOrder: SortOrder;
  parameters?: P;
}

// TODO: refactor to proper place
export interface VariableQuery {
  variableName?: string;
  variableNameLike?: string;
  processInstanceIdIn?: string[];
  executionIdIn?: string[];
  caseInstanceId?: string;
  caseExecutionIdIn?: string[];
  taskIdIn?: string[];
  activityInstanceIdIn?: string[];
  tenantIdIn?: string[];
}

export type ProcessInstanceState =
  | 'ACTIVE'
  | 'SUSPENDED'
  | 'COMPLETED'
  | 'EXTERNALLY_TERMINATED'
  | 'INTERNALLY_TERMINATED';
