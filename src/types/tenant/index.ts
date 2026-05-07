import type { RecordStatus } from '../auth';

export interface Tenant {
  id: number;
  code: string;
  name: string;
  status: RecordStatus;
  createdAt: string;
  updatedAt: string;
}

export interface TenantIntegrationCredentials {
  clientId: number;
  clientSecret: string;
}

export interface CreateTenantResponse {
  tenant: Tenant;
  integrationCredentials: TenantIntegrationCredentials;
}

export interface CreateTenantDto {
  code: string;
  name: string;
}

export interface UpdateTenantDto extends Partial<CreateTenantDto> {}
