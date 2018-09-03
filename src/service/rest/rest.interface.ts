/**
 * Permitted query operator
 */
export type QueryOperator = 'eq' | 'neq' | 'gt' | 'gteq' | 'lt' | 'lteq' | 'like';

/**
 * Permitted sort order
 */
export type SortOrder = 'asc' | 'desc';

/**
 * Valid process instance state
 */
export type ProcessInstanceState =
  | 'ACTIVE'
  | 'SUSPENDED'
  | 'COMPLETED'
  | 'EXTERNALLY_TERMINATED'
  | 'INTERNALLY_TERMINATED';

/**
 * Added to responses as result count
 */
export interface Countable {
  count: number;
}

/**
 * Meta information for object values
 */
export interface ValueInfo {
  objectTypeName: string;
  serializationDataFormat: string;
}

/**
 * DTO for variable values
 */
export interface ObjectValue<T = string | number | boolean | Object> {
  name: string;
  value: T;
  type: string;
  valueInfo: ValueInfo;
}

/**
 * Object to query for certain variable states
 */
export interface VariableCriteria {
  name: string;
  operator: QueryOperator;
  value: string | number | boolean;
}

/**
 * Sets sort by and sort order
 */
export interface SortingCriteria<B, P = never> {
  sortBy: B;
  sortOrder: SortOrder;
  parameters?: P;
}

/**
 * Object for result pagination
 */
export interface QueryParams {
  firstResult: number;
  maxResults: number;
}

/**
 * Base class for all queries
 */
export interface SortableQuery<B, P = never> {
  sorting?: SortingCriteria<B, P>[];
}
