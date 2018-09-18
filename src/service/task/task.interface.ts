import { SortingCriteria, VariableCriteria } from '../rest/rest.interface';

export type TaskSortKey =
  | 'instanceId'
  | 'caseInstanceId'
  | 'dueDate'
  | 'executionId'
  | 'caseExecutionId'
  | 'assignee'
  | 'created'
  | 'description'
  | 'id'
  | 'name'
  | 'nameCaseInsensitive'
  | 'priority'
  | 'processVariable'
  | 'executionVariable'
  | 'taskVariable'
  | 'caseExecutionVariable'
  | 'caseInstanceVariable';

export interface TaskSortParameter {
  variable: string;
  type: string;
}
export interface TaskSortingCriteria extends SortingCriteria<TaskSortKey, TaskSortParameter> {}

export interface TaskQuery {
  processInstanceId?: string;
  processInstanceBusinessKey?: string;
  processInstanceBusinessKeyExpression?: string;
  processInstanceBusinessKeyIn?: string[];
  processInstanceBusinessKeyLike?: string;
  processInstanceBusinessKeyLikeExpression?: string;
  processDefinitionId?: string;
  processDefinitionKey?: string;
  processDefinitionKeyIn?: string[];
  processDefinitionName?: string;
  processDefinitionNameLike?: string;
  executionId?: string;
  caseInstanceId?: string;
  caseInstanceBusinessKey?: string;
  caseInstanceBusinessKeyLike?: string;
  caseDefinitionId?: string;
  caseDefinitionKey?: string;
  caseDefinitionName?: string;
  caseDefinitionNameLike?: string;
  caseExecutionId?: string;
  activityInstanceIdIn?: string[];
  tenantIdIn?: string[];
  withoutTenantId?: string;
  assignee?: string;
  assigneeExpression?: string;
  assigneeLike?: string;
  assigneeLikeExpression?: string;
  owner?: string;
  ownerExpression?: string;
  candidateGroup?: string;
  candidateGroupExpression?: string;
  withCandidateGroups?: boolean;
  withoutCandidateGroups?: boolean;
  withCandidateUsers?: boolean;
  withoutCandidateUsers?: boolean;
  candidateUser?: string;
  candidateUserExpression?: string;
  includeAssignedTasks?: boolean;
  involvedUser?: string;
  involvedUserExpression?: string;
  assigned?: boolean;
  unassigned?: boolean;
  taskDefinitionKey?: string;
  taskDefinitionKeyIn?: string[];
  taskDefinitionKeyLike?: string;
  name?: string;
  nameNotEqual?: string;
  nameLike?: string;
  nameNotLike?: string;
  description?: string;
  descriptionLike?: string;
  priority?: string;
  maxPriority?: string;
  minPriority?: string;
  dueDate?: string;
  dueAfter?: string;
  dueBefore?: string;
  followUpDate?: string;
  followUpAfter?: string;
  followUpBefore?: string;
  createdOn?: string;
  createdAfter?: string;
  createdBefore?: string;
  delegationState?: 'PENDING' | 'RESOLVED';
  candidateGroups?: string[];
  candidateGroupsExpression?: string;
  active?: boolean;
  suspended?: boolean;
  taskVariables?: VariableCriteria[];
  processVariables?: VariableCriteria[];
  caseInstanceVariables?: VariableCriteria[];
  parentTaskId?: string;
  orQueries?: TaskQuery[];
  sorting?: TaskSortingCriteria[];
}

export interface TaskInstance {
  id: string;
  name: string;
  assignee: string;
  created: Date;
  due: Date;
  followUp: Date;
  delegationState: 'PENDING' | 'RESOLVED';
  description: string;
  executionId: string;
  owner: string;
  parentTaskId: string;
  priority: number;
  processDefinitionId: string;
  processInstanceId: string;
  caseDefinitionId: string;
  caseInstanceId: string;
  caseExecutionId: string;
  taskDefinitionKey: string;
  suspended: boolean;
  formKey: string;
  tenantId: string;
}
