import { Observable } from "rxjs";
import { RequestOptions } from "./rest.client";
import { QueryParams } from "./rest.interface";

export interface RequestObject<T, P = QueryParams> {
  request: T;
  params?: P;
};
export type ClientFn<T = any> = (url: string, options?: RequestOptions) => Observable<T>;
export type ServiceFn<T, R, P = QueryParams> = (client: ClientFn<T>, data: RequestObject<R, P>) => Observable<T>;
export type UnionServiceFn = ServiceFn<any, any, any> | ServiceFn<any, any, never> | ServiceFn<never, any, never>;
export type ConnectedFn<T, R, P> = (data: RequestObject<R, P>) => Observable<T>;
// export type ConnectorFn<T, R, P> = (method: 'GET' | 'POST', serviceFn: ServiceFn<T, R, P>) => ConnectedFn<T, R, P>;

export interface ConnectorConfig {
  clientFn: ClientFn;
};
export const connectorConfig: ConnectorConfig = {
  clientFn: () => {throw new Error('Client impl has to be provided!')},
};

export function connectedFn<T, R, P>(fn: ServiceFn<T, R, P>): ConnectedFn<T, R, P> {
  if(!connectorConfig.clientFn) throw new Error('Client impl has to be provided');
  return (data: RequestObject<any, any>) => fn(connectorConfig.clientFn, data);
}

export type NsType<T> = {[K in keyof T]: UnionServiceFn};
export function createInstance<NS, T>(namespace: NsType<NS>): T{
  type PartialNs = {[K in keyof NS]?: ConnectedFn<any | never, any, any | never>};
  return (Object.keys(namespace) as (keyof NS)[]).map(funcName => {
    const obj: PartialNs = {};
    obj[funcName] = connectedFn(namespace[funcName] as ServiceFn<any, any, any>);// any not assignable to never
    return obj;
  }).reduce((prev, next) => ({...prev, ...next as any}), {} as any);
}
