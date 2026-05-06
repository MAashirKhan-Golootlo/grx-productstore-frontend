import type { RecordStatus } from '../auth';

export interface Partner {
  id: string;
  code: string;
  name: string;
  contactEmail: string;
  status: RecordStatus;
  createdAt: string;
  updatedAt: string;
}

export interface CreatePartnerDto {
  code: string;
  name: string;
  contactEmail: string;
}

export interface UpdatePartnerDto extends Partial<CreatePartnerDto> {}
