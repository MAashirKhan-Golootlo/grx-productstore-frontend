export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  isActive: boolean;
  productCount?: number;
  createdAt: string;
  updatedAt: string;
}

export interface CreateCategoryDto {
  name: string;
  slug: string;
  description?: string;
  isActive: boolean;
}

export interface UpdateCategoryDto extends Partial<CreateCategoryDto> {}
