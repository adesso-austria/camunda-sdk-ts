import { Observable } from "rxjs";
import { QueryParams } from "./rest.interface";
import { RequestOptions } from "./rest.client";

export interface RequestObject<T, P = QueryParams> {
  request: T;
  params?: P;
};
export type ClientFn<T = any> = (url: string, options?: RequestOptions) => Observable<T>;
export type ServiceFn<T, R, P = QueryParams> = (client: ClientFn, data: RequestObject<R, P>) => Observable<T>;
export type ConnectedFn<T, R, P> = (data: RequestObject<R, P>) => Observable<T>;
// export type ConnectorFn<T, R, P> = (method: 'GET' | 'POST', serviceFn: ServiceFn<T, R, P>) => ConnectedFn<T, R, P>;

export interface ConnectorConfig {
  clientFn: ClientFn;
};
export const connectorConfig: ConnectorConfig = {
  clientFn: () => {throw new Error('Client impl has to be provided!')},
};

// = {
//   clientFn: <T>(url: string, options?: any): Observable<T> => {
//     console.log("REQUEST2!!!", url, options);
//     console.log("Calling "+options['method']);
//     return of({} as T);
//   },
// }
export function connectedFn<T, R, P>(fn: ServiceFn<T, R, P>): ConnectedFn<T, R, P> {
  if(!connectorConfig.clientFn) throw new Error('Client impl has to be provided');
  return (data: RequestObject<any, any>) => fn(connectorConfig.clientFn, data);
}

