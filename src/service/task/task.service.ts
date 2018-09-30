import { Observable } from 'rxjs';
import { ClientFn, RequestObject } from '../rest/connector';
import { Countable, QueryParams } from '../rest/rest.interface';
import { TaskInstance, TaskQuery, InstanceOperation, VariableUpdate } from './task.interface';

export interface ITaskService {
  getTask(data: RequestObject<string, never>): Observable<TaskInstance>;
  getTasks(data: RequestObject<TaskQuery, never>): Observable<TaskInstance[]>;
  getTasksCount(data: RequestObject<TaskQuery, never>): Observable<Countable>;
  getTasksCountPost(data: RequestObject<TaskQuery, never>): Observable<Countable>;
  getTasksPost(data: RequestObject<TaskQuery>): Observable<TaskInstance[]>;
  complete(data: RequestObject<InstanceOperation<VariableUpdate>, never>): Observable<never>;
  setAssignee(data: RequestObject<InstanceOperation<string>, never>): any;
  
  getFormKey(data: RequestObject<string, never>): any;
  claim(data: RequestObject<string, never>): any;
  unclaim(data: RequestObject<string, never>): any;
  submitForm(data: RequestObject<TaskQuery, never>): any;
  resolve(data: RequestObject<string, never>): any;
  delegate(data: RequestObject<TaskQuery, never>): any;
  getDeployedForm(data: RequestObject<string, never>): any;
  getRenderedForm(data: RequestObject<string, never>): any;
  getTaskFormVariables(data: RequestObject<string, never>): any;
  create(data: RequestObject<TaskInstance, never>): any;
  update(data: RequestObject<TaskQuery, never>): any;
}

export namespace TaskService {
  const endpointPrefix = '/task';
  const defaultParams: QueryParams = {
    firstResult: 0,
    maxResults: 50,
  }

  /**
   * Retrieves the number of tasks that fulfill the given filter. Corresponds to the size of the result set of the Get Tasks (POST) method and takes the same parameters.
   * @param {ClientFn<Countable>} clientFn Function to execute post
   * @param {TaskQuery} query The request body
   * @returns {Observable<Countable> | Promise<Countable>} Count of the possible records returned
   * @async
   */
  export function getTasksCountPost(clientFn: ClientFn<Countable>, data: RequestObject<TaskQuery, never>): Observable<Countable> {
    const url = endpointPrefix+'/count';
    return clientFn(url, {
      body: data.request,
      method: 'POST',
    });
  }

  export function getTasksPost(clientFn: ClientFn<TaskInstance[]>, data: RequestObject<TaskQuery>): Observable<TaskInstance[]> {
    let url = endpointPrefix+'?firstResult=';
    if(data.params) {
      url += data.params.firstResult;
    } else {
      url += defaultParams.firstResult;
    }
    return clientFn(url, {
      body: data.request,
      method: 'POST',
    });
  }

  export function complete(clientFn: ClientFn<never>, data: RequestObject<InstanceOperation<VariableUpdate>, never>): Observable<never> {
    return clientFn(endpointPrefix + '/' + data.request.id + '/complete', {
      method: 'POST',
      body: data.request.data,
    });
  }
}
