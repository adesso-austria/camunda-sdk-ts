import { Observable } from "rxjs";

export interface Header {
  [key: string]: string
}
export interface RestClient {
  get<T>(url: string, options?: RequestOptions): Promise<T> | Observable<T>,
  post<T>(url: string, options?: RequestOptions): Promise<T> | Observable<T>,
  put<T>(url: string, options?: RequestOptions): Promise<T> | Observable<T>,
  delete<T>(url: string, options?: RequestOptions): Promise<T> | Observable<T>,
}

export interface RequestOptions {
  authToken?: string;
  tenant?: string;
  headers?: Header[];
  body?: any;
}
export type KeyMap<K extends string> = {
  [key in K]?: string;
}

export const defaultJsonHeaders = {
  "Content-Type": "application/json",
  "Accept": "application/json",
};

export const defaultHalHeaders = {
  "Content-Type": "application/json",
  "Accept": "application/hal+json",
};

export class FetchClient implements RestClient {
  public get<T>(url: string, options: RequestOptions = {}) {
    return fetch(url, { method: 'GET' }).then(res => res.json()).then(json => json as T);
  }
  public post<T>(url: string, options?: RequestOptions): Promise<T> {
    throw new Error("Method not implemented.");
  }
  public put<T>(url: string, options?: RequestOptions): Promise<T> {
    throw new Error("Method not implemented.");
  }
  public delete<T>(url: string, options?: RequestOptions): Promise<T> {
    throw new Error("Method not implemented.");
  }
}
