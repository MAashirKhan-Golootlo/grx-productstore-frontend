import type { RecordStatus } from '../auth';
import type { Category } from '../category';

export interface Product {
  id: string;
  sku: string;
  name: string;
  description?: string;
  imageUrl?: string;
  basePrice: number;
  price?: number;
  currency: string;
  status: RecordStatus;
  isActive?: boolean;
  stock?: number;
  images?: (string | undefined)[];
  categoryId: string;
  category?: Category;
  createdAt: string;
  updatedAt: string;
}

export interface CreateProductDto {
  sku: string;
  name: string;
  description?: string;
  imageUrl?: string;
  basePrice: number;
  price?: number;
  currency: string;
  categoryId: string;
}

export interface UpdateProductDto extends Partial<CreateProductDto> {}
