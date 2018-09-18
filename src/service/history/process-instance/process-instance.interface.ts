import { ProcessInstanceState, SortingCriteria, VariableCriteria, ObjectValue, IncidentType, IncidentStatus } from "../../rest/rest.interface";

export interface HistoricProcessInstance {
  id: string;
  businessKey?: string;
  processDefinitionId: string;
  processDefinitionKey: string;
  processDefinitionName: string;
  processDefinitionVersion: number;
  startTime: Date;
  endTime?: Date;
  durationInMillis?: number;
  startUserId?: string;
  startActivityId: string;
  deleteReason?: string;
  superProcessInstanceId?: string;
  superCaseInstanceId?: string;
  caseInstanceId?: string;
  tenantId?: string;
  state: ProcessInstanceState;
}

export type HistoricSortingKey =
  | 'instanceId'
  | 'definitionId'
  | 'definitionKey'
  | 'definitionName'
  | 'definitionVersion'
  | 'businessKey'
  | 'startTime'
  | 'endTime'
  | 'duration'
  | 'tenantId';

export interface HistoricProcessSortingCriteria extends SortingCriteria<HistoricSortingKey, never> {}

export interface HistoricProcessInstanceQuery {
  processInstanceId?: string;
  processInstanceIds?: string[];
  processInstanceBusinessKey?: string;
  processInstanceBusinessKeyLike?: string;
  superProcessInstanceId?: string;
  subProcessInstanceId?: string;
  superCaseInstanceId?: string;
  subCaseInstanceId?: string;
  caseInstanceId?: string;
  processDefinitionId?: string;
  processDefinitionKey?: string;
  processDefinitionKeyNotIn?: string[];
  processDefinitionName?: string;
  processDefinitionNameLike?: string;
  finished?: boolean;
  unfinished?: boolean;
  withIncidents?: boolean;
  withRootIncidents?: boolean;
  incidentType?: IncidentType;
  incidentStatus?: IncidentStatus;
  incidentMessage?: string;
  incidentMessageLike?: string;
  startedBy?: string;
  startedBefore?: Date;
  startedAfter?: Date;
  finishedBefore?: Date;
  finishedAfter?: Date;
  tenantIdIn?: string[];
  variables?: VariableCriteria[];
  sorting?: HistoricProcessSortingCriteria[];
  executedActivityBefore?: Date;
  executedActivityAfter?: Date;
  executedActivityIdIn?: string[];
  activeActivityIdIn?: string[];
  executedJobBefore?: Date;
  executedJobAfter?: Date;
  active?: boolean;
  suspended?: boolean;
  completed?: boolean;
  externallyTerminated?: boolean;
  internallyTerminated?: boolean;
}

export type HistoricVariableSortByKey = 'instanceId' | 'variableName';
export interface HistoricVariableInstanceSortingCriteria extends SortingCriteria<HistoricVariableSortByKey, never> {}

export interface HistoricVariableInstanceQuery {
  variableName?: string;
  variableNameLike?: string;
  variableValue?: string;
  variableTypeIn?: string[];
  includeDeleted?: boolean;
  processInstanceId?: string;
  processInstanceIdIn?: string[];
  processDefinitionId?: string;
  processDefinitionKey?: string;
  executionIdIn?: string[];
  caseInstanceId?: string;
  caseExecutionIdIn?: string[];
  caseActivityIdIn?: string[];
  taskIdIn?: string[];
  activityInstanceIdIn?: string[];
  tenantIdIn?: string[];
  sorting: HistoricVariableInstanceSortingCriteria[];
}

export interface HistoricVariableInstance<T extends keyof any = any> extends ObjectValue<T> {
  id: string;
  processDefinitionKey: string;
  processDefinitionId: string;
  processInstanceId: string;
  executionId: string;
  activityInstanceId: string;
  caseDefinitionKey: string;
  caseDefinitionId: string;
  caseInstanceId: string;
  caseExecutionId: string;
  taskId: string;
  tenantId: string;
  state: 'CREATED' | 'DELETED';
}
