import { Observable, from } from 'rxjs';

export interface TaskService {
  executeTaskQueryCount$: <E>(query: any, queryParams: any) => Observable<E> | Promise<E>;
  // executeTaskQuery$: <E>(query: any, queryParams: any) => Observable<E> | Promise<E>;
}

export function executeTaskQueryCount$(query: any, queryParams: any) {
  const requestInit = {
    method: 'POST',
    body: JSON.stringify(query),
  };
  return from(fetch('/task/count'+queryParams, requestInit));
}

// function executeTaskQuery$<E>(query: any, queryParams: any) {
//   return restClient.post<E>("/task/count" + queryParams, query);
// }

// export function taskServiceFactory(restClient: RestClient): TaskService {
//   return {
//     executeTaskQueryCount$: (query: any, queryParams: any) => executeTaskQueryCount$(query, queryParams),
//     // executeTaskQuery$: (query: any, queryParams: any) => executeTaskQuery$(query, queryParams, restClient),
//   };
// }
