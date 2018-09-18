import { SortingCriteria, VariableCriteria, IncidentType } from "../rest/rest.interface";

export type ProcessIntanceSortKeyBy = 'instanceId' | 'definitionKey' | 'definitionId' | 'tenantId' | 'businessKey';
export interface ProcessInstanceSortingCriteria extends SortingCriteria<ProcessIntanceSortKeyBy, never> {}

export interface ProcessInstanceQuery {
  processInstanceIds: string[];
  businessKey: string;
  businessKeyLike: string;
  caseInstanceId: string;
  processDefinitionId: string;
  processDefinitionKey: string;
  deploymentId: string;
  superProcessInstance: string;
  subProcessInstance: string;
  superCaseInstance: string;
  subCaseInstance: string;
  active: boolean;
  suspended: boolean;
  incidentId: string;
  incidentType: IncidentType;
  incidentMessage: string;
  incidentMessageLike: string;
  tenantIdIn: string[];
  withoutTenantId: string;
  activityIdIn: string[];
  rootProcessInstances: string;
  variables: VariableCriteria[];
  sorting: ProcessInstanceSortingCriteria[];
}

export interface ProcessInstance {
  id: string;
  definitionId: string;
  businessKey: string;
  caseInstanceId: string;
  ended: boolean;
  suspended: boolean;
  tenantId: string;
}
