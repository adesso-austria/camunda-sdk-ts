import { Observable, from } from "rxjs";

export type CallFn<T> = (url: string, options?: any) => Observable<T> | Promise<T>;
export type ServiceFn<T, R, P> = (client: CallFn<T>, request: R, params?: P) => Observable<T> | Promise<T>;
export type ConnectedFn<T, R, P> = (request: R, params?: P) => Observable<T> | Promise<T>;
export type ConnectorFn<T, R, P> = (method: 'GET' | 'POST', serviceFn: ServiceFn<T, R, P>) => ConnectedFn<T, R, P>;

// TODO: inject callFn's, store it as object eg { 'GET': func get() }
export function connect<T, R, P>(method: 'GET' | 'POST', fn: ServiceFn<T, R, P>): ConnectedFn<T, R, P> {
  function get(url: string, options?: any): Observable<T> {
    console.log('get!');
    return from(fetch(url, { method: 'GET', ...options }).then(res => res.json()));
  }
  function post(url: string, options: any) {
    console.log('post!');
    return from(fetch(url, { method: 'POST', ...options }).then(res => res.json()));
  }
  if(method === 'GET') {
    return (request: R, params?: P) => fn(get, request, params);
  }
  return (request: R, params?: P) => fn(post, request, params);

}
