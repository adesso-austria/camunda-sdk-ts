export interface HALResource<E> {
  _links: HALLinks;
  _embedded: E;
}
export interface LinkObject {
  href: string;
}
export interface HALLinks {
  self: LinkObject;
  [links: string]: LinkObject;
}
export type HALResponse<T, E> = T & HALResource<E>;
