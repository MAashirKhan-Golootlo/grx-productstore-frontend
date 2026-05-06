import type { RecordStatus } from '../auth';

export interface Category {
  id: string;
  slug: string;
  name: string;
  status: RecordStatus;
  description?: string;
  isActive?: boolean;
  productCount?: number;
  createdAt: string;
  updatedAt: string;
}

export interface CreateCategoryDto {
  slug: string;
  name: string;
}

export interface UpdateCategoryDto extends Partial<CreateCategoryDto> {}
