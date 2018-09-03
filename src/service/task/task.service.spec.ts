import 'jasmine';
import { of } from 'rxjs';
import { taskServiceFactory } from './task.service';
import { RestClient } from '../rest.client';

const mockRestClient = {
  get: () => of(1),
  post: () => of(1),
  put: () => of(1),
  delete: () => of(1),
};

describe('Task Service', () => {
  describe('Factory', () => {
    it('should return a task service', () => {
      // Given
      const taskService = taskServiceFactory(mockRestClient as RestClient);

      // Then
      expect(taskService).toBeTruthy();
    });
  });
});
