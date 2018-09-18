import 'jasmine';
import { Observable, of } from 'rxjs';
import { RestClient } from './rest.client';

/**
 * Basic test for the restClient interface.
 * Describes how to implement a rest client for use with this library.
 */
describe('Rest Client', () => {
  describe('with Promise', () => {
    it('should return a Promise of given type', () => {
      // Given
      const client: RestClient = new MockClientPromise(true);

      // When
      const response = client.get<boolean>('mock/endpoint');

      // Then
      // put the type guard in an if clause
      expect(response instanceof Promise).toBeTruthy('Object should be of type Promise!');
    });
  });
  describe('with Observable', () => {
    it('should return an Observable of given type', () => {
      // Given
      const client: RestClient = new MockClientObservable(true);

      // When
      const response$ = client.get<boolean>('mock/endpoint');

      // Then
      // put the type guard in an if clause
      expect(response$ instanceof Observable).toBeTruthy('Object should be of type Observable!');
    });
  });
});

class MockClientPromise implements RestClient {
  constructor(public returnValue: any) {}
  public get<T>() {
    return Promise.resolve<T>(this.returnValue as T);
  }
  public post<T>() {
    return Promise.resolve<T>(this.returnValue as T);
  }
  public put<T>() {
    return Promise.resolve<T>(this.returnValue as T);
  }
  public delete<T>() {
    return Promise.resolve<T>(this.returnValue as T);
  }
}

class MockClientObservable implements RestClient {
  constructor(public returnValue: any) {}
  public get<T>() {
    return of(this.returnValue as T);
  }
  public post<T>() {
    return of(this.returnValue as T);
  }
  public put<T>() {
    return of(this.returnValue as T);
  }
  public delete<T>() {
    return of(this.returnValue as T);
  }
}
