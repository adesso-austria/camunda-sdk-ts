import 'jasmine';
import 'rxjs/add/observable/of';
import { Observable } from 'rxjs';
import { connectorConfig, connectedFn } from './connector';
import { TaskService } from '../task/task.service';

describe('Connector', () => {
  describe('connectedFn', () => {
    fit('should return a task service', () => {
      // Given
      function mockClient<T>(url: string, options?: any) {
        console.log("OVERRIDING CLIENT FN!!!", url, options);
        return Observable.of({} as T);
      }
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
});
