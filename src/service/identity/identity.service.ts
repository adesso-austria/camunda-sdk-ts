import { RequestOptions, RestClient } from '../rest/rest.client';

export interface VerificationResult {
  authenticatedUser: string;
  authenticated: boolean;
}

export class IdentityService {

  public readonly endpointPrefix = '/workflow-engine/rest/engine/default/identity';

  constructor(
    private client: RestClient,
  ) { }

  public verify(username: string, password: string) {
    const options: RequestOptions = {
      body: JSON.stringify({username, password}),
      // headers,
    };
    return this.client.post<VerificationResult>(`${this.endpointPrefix}/verify`, options);
  }
}
