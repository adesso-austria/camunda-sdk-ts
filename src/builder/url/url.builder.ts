// TODO: refactor to hold camunda endpoints here
export interface ViaPaths {
  dms: string;
  wf: string;
}
export type UrlBuilder = (endpointPath: string) => string;

/**
 * Returns a URL builder function with the supplied context
 * @param context the endpoint context
 */
export function getBuilder(context: keyof ViaPaths): UrlBuilder {
  const contextPaths: ViaPaths = {
    dms: "/alfresco",
    wf: "/workflow-engine/rest/engine/default",
  };
  return buildUrl(contextPaths[context]);
}

export function withQueryParams(url: string, params: {[key: string]: string}): string {
  const encodedParams = Object.keys(params).map((key) => encodeURIComponent(key) + "=" + encodeURIComponent(params[key]));
  return url + "?" + encodedParams.join("&");
}

/**
 * Overload for buildUrl currying
 * @param context the endpoint context
 * @param path relative url to an endpoint
 */
export function buildUrl(context: string, path: string): string;

/**
 * Overload for buildUrl currying
 * @param context the context to supply
 */
export function buildUrl(context: string): UrlBuilder;

/**
 * Builds a path for REST endpoints or
 * a URL builder for the given context if no path is supplied
 */
export function buildUrl(context: string, path?: string): string | UrlBuilder {
  if (path === undefined) {
    return(endpointPath: string) => context + normalizeUrl(endpointPath);
  } else {
    return(context + normalizeUrl(path));
  }
}

/**
 * Normalizes a URL path
 * @param url the URL to normalize
 */
function normalizeUrl(url: string) {
  let path = url;
  if (path.startsWith("/") === false) {
    path = "/" + path;
  }
  if (path.endsWith("/") === true) {
    path = path.substr(0, path.length - 1);
  }
  return path;
}
