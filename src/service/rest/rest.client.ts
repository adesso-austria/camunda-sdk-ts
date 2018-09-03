import { Observable, from } from "rxjs";

export interface Header {
  [key: string]: string
}

export interface Options {
  authToken?: string;
  tenant?: string;
}
export type KeyMap<K extends string> = {
  [key in K]: string;
}

export const defaultJsonHeaders = {
  "Content-Type": "application/json",
  "Accept": "application/json",
};

export const defaultHalHeaders = {
  "Content-Type": "application/json",
  "Accept": "application/hal+json",
};

export function post(url: string, body: any, headers?: any): Observable<Response> {
  const requestHeaders = {
    ...defaultJsonHeaders,
    // ...optionsToHeader(options ? options : {}),
  };
  const request: RequestInit = {
    method: 'POST',
    body,
    headers: requestHeaders,
  };
  return from(fetch(url, request));
}
