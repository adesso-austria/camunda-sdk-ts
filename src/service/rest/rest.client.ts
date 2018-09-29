import { Observable } from "rxjs";

export interface Header {
  [key: string]: string
}
export interface RestClient {
  get<T = any>(url: string, options?: RequestOptions): Promise<T> | Observable<T>,
  post<T = any>(url: string, options?: RequestOptions): Promise<T> | Observable<T>,
  put<T = any>(url: string, options?: RequestOptions): Promise<T> | Observable<T>,
  delete<T = any>(url: string, options?: RequestOptions): Promise<T> | Observable<T>,
}

export interface RequestOptions {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  authToken?: string;
  tenant?: string;
  headers?: Header[];
  body?: any;
}
// export type KeyMap<K extends string> = {
//   [key in K]?: string;
// }

export const defaultJsonHeaders = {
  "Content-Type": "application/json",
  "Accept": "application/json",
};

export const defaultHalHeaders = {
  "Content-Type": "application/json",
  "Accept": "application/hal+json",
};
