import { from, Observable } from "rxjs";
import { defaultJsonHeaders, Options, Header, KeyMap } from '../rest/rest.client';

const endpointPrefix = '/workflow-engine/rest/engine/default/identity';

const headerKeys: KeyMap<keyof Options> = {
  authToken: "Authorization",
  tenant: "Tenant",
}

function optionsToHeader(options: Options): Header {
  return (Object.keys(options) as (keyof Options)[])
    .filter(key => options[key] !== undefined)
    .map((key) => ({key, headerKey: headerKeys[key]}))
    .map(({key, headerKey}) => {
      const header: {[k: string]: string} = {};
      header[headerKey] = options[key] as string;
      return header;
    })
    .reduce((prev, next) => ({...prev, ...next}), {});
}

export function verify$(username: string, password: string, options?: Options): Observable<Response> {
  const headers = {
    ...defaultJsonHeaders,
    ...optionsToHeader(options ? options : {}),
  };
  const request: RequestInit = {
    method: 'POST',
    body: JSON.stringify({username, password}),
    headers,
  };
  return from(fetch(`${endpointPrefix}/verify`, request));
}
