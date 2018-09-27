import { Countable } from '../rest/rest.interface';
import { TaskQuery } from './task.interface';
import { Observable } from 'rxjs';
import { CallFn } from '../rest/connector';

export interface ITaskService {
  executeTaskQueryCount(query: TaskQuery): Observable<Countable> | Promise<Countable>;
}

export namespace TaskService {
  const endpointPrefix = '/task';

  /**
   * Retrieves the number of tasks that fulfill the given filter. Corresponds to the size of the result set of the Get Tasks (POST) method and takes the same parameters.
   * @param {CallFn<Countable>} clientFn Function to execute post
   * @param {TaskQuery} query The request body
   * @returns {Observable<Countable> | Promise<Countable>} Count of the possible records returned
   * @async
   */
  export function executeTaskQueryCount(clientFn: CallFn<Countable>, query: TaskQuery): Observable<Countable> | Promise<Countable> {
    const url = endpointPrefix+'/count';
    return clientFn(url, {
      body: JSON.stringify(query),
    });
  }
}
