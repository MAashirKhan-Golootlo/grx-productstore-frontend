import { Category } from '../category';

export interface Product {
  id: string;
  name: string;
  sku: string;
  description?: string;
  price: number;
  stock: number;
  isActive: boolean;
  categoryId: string;
  category?: Category;
  images: string[];
  createdAt: string;
  updatedAt: string;
}

export interface CreateProductDto {
  name: string;
  sku: string;
  description?: string;
  price: number;
  stock: number;
  isActive: boolean;
  categoryId: string;
  images?: string[];
}

export interface UpdateProductDto extends Partial<CreateProductDto> {}
