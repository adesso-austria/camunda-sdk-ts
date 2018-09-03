import { QueryParams } from "./service/rest/rest.interface";

export interface CamundaClientConfiguration {
  baseRequestUrl?: string;
  processEngineName?: string;
  pagination?: {
    enabled: boolean;
    defaultPagination?: QueryParams;
  }
}

export const defaultConfig: CamundaClientConfiguration = {
  baseRequestUrl: '',
  processEngineName: 'default',
  pagination: {
    enabled: true,
    defaultPagination: {
      firstResult: 0,
      maxResults: 15,
    },
  },
}

let globalConfig = defaultConfig;

export function setGlobalConfig(config: CamundaClientConfiguration): void {
  globalConfig = config;
}

export function getGlobalConfig(): CamundaClientConfiguration {
  return globalConfig;
}
