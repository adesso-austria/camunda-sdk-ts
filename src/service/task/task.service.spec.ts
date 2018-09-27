import 'jasmine';
import { connect } from '../rest/connector';
import { TaskQuery } from './task.interface';
import { TaskService as Task, ITaskService } from './task.service';
import { Countable } from '../rest/rest.interface';
import { Observable } from 'rxjs';


// const connector: ConnectorFn<Countable, TaskQuery, QueryParams> = connect;
class TaskService implements ITaskService {
  executeTaskQueryCount(query: TaskQuery): Observable<Countable> | Promise<Countable> {
    return connect('POST', Task.executeTaskQueryCount)(query);
  }
}

describe('Task Service', () => {
  describe('Factory', () => {
    fit('should return a task service', () => {
      // Given
      // const taskService = taskServiceFactory(mockRestClient as RestClient);
      const taskService = new TaskService();
      taskService.executeTaskQueryCount({});
      // Then
      // expect(taskService).toBeTruthy();
    });
  });
});
