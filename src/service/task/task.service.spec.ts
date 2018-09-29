import 'jasmine';
import { Observable, Observer } from 'rxjs';
import { RequestOptions } from '../rest/rest.client';
import { TaskService } from './task.service';
// class TaskServiceImpl implements ITaskService {
//   public executeTaskQueryCount(data: RequestObject<TaskQuery, never>): Observable<Countable> {
//     return connectedFn(Task.executeTaskQueryCount)(data);
//   }
//   public executeTaskQuery(data: RequestObject<TaskQuery>): Observable<TaskInstance[]> {
//     return connectedFn(Task.executeTaskQuery)(data);
//   }
// }

describe('Task Service', () => {
  xdescribe('executeTaskQueryCount', () => {
    // fit('should return a task service', () => {
    //   connectorConfig.clientFn = <RS>(url: string, options?: any) => {
    //     console.log("OVERRIDING CLIENT FN!!!", url, options);
    //     return of({} as RS);
    //   }
    //   const taskService = new TaskServiceImpl();
    //   taskService.executeTaskQueryCount({request: {}});
    //   taskService.executeTaskQuery({ request: {}, params: {firstResult: 23, maxResults: 1}});
    // });
  });
  xdescribe('executeTaskQuery', () => {
    it('should return a task service', () => {
    });
  });
  describe('complete', () => {
    it('should call the service endpoint', () => {
      // Given
      const complete = TaskService.complete;

      function mockClientFn<T>(url: string, options?: RequestOptions){
        return Observable.create((observer: Observer<T>) => {
          observer.next({url, options} as any);
          observer.complete();
        });
      }
      const mock = jasmine.createSpy('clientFn', mockClientFn);
      // When
      complete(mock, {
        request: {
          id: 'mockId',
          data: {
            variables: { },
          },
        },
      });

      // Then
      expect(mock).toHaveBeenCalled();
      expect(mock).toHaveBeenCalledWith('/task/mockId/complete', {method: 'POST', body: {variables: { }}});
    });
  });
});
