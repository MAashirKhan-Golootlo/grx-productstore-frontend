import type { RecordStatus } from '../auth';

export interface Tenant {
  id: string;
  code: string;
  name: string;
  status: RecordStatus;
  createdAt: string;
  updatedAt: string;
}

export interface CreateTenantDto {
  code: string;
  name: string;
}

export interface UpdateTenantDto extends Partial<CreateTenantDto> {}
