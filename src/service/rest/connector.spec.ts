import 'jasmine';
import 'rxjs/add/observable/of';
import { Observable } from 'rxjs';
import { connectorConfig, connectedFn, createInstance } from './connector';
import { TaskService, ITaskService } from '../task/task.service';

function mockClient<T>(url: string, options?: any) {
  console.log("OVERRIDING CLIENT FN!!!", url, options);
  return Observable.of({} as T);
}

describe('Connector', () => {
  describe('connectedFn', () => {
    it('should return a task service', () => {
      // Given
      const spyClient = jasmine.createSpy('ClientFn', mockClient);
      connectorConfig.clientFn = spyClient;
      const taskService = {
        getTasksCountPost: connectedFn(TaskService.getTasksCountPost),
      };
      
      // When
      taskService.getTasksCountPost({
        request: {
          active: true,
        },
      });

      // Then
      expect(spyClient).toHaveBeenCalledWith('/task/count', { method: 'POST', body: { active: true }});
    });
  });
  describe('createInstance', () => {
    it('should return an instance with all connected methods of the given class', () => {
      // Given
      const spyClient = jasmine.createSpy('ClientFn', mockClient);
      connectorConfig.clientFn = spyClient;
      const taskService: ITaskService = createInstance(TaskService);

      // When
      const nsKeys = Object.keys(TaskService);

      // Then
      expect(Object.keys(taskService).length).toEqual(nsKeys.length);

      // And
      taskService.getTasksCountPost({
        request: {
          active: true,
        },
      });

      // Then
      expect(spyClient).toHaveBeenCalledWith('/task/count', { method: 'POST', body: { active: true }});
    });
  });
});
