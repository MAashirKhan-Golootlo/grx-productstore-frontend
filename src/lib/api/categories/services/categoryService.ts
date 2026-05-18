import axiosInstance from '../../axios.config';
import { Category, CreateCategoryDto, UpdateCategoryDto } from '@/types/category';

export const categoryService = {
  async getAll(): Promise<Category[]> {
    const data = (await axiosInstance.get('/categories')) as unknown as Category[];
    return data.map((item) => ({
      ...item,
      isActive: item.status === 'active',
    }));
  },

  async getById(id: string): Promise<Category> {
    const data = (await axiosInstance.get(`/categories/${id}`)) as unknown as Category;
    return {
      ...data,
      isActive: data.status === 'active',
    };
  },

  async create(data: CreateCategoryDto): Promise<Category> {
    const payload = {
      slug: data.slug,
      name: data.name,
      imageUrl: data.imageUrl,
    };
    const created = (await axiosInstance.post('/categories', payload)) as unknown as Category;
    return {
      ...created,
      isActive: created.status === 'active',
    };
  },

  async update(id: string, data: UpdateCategoryDto): Promise<Category> {
    const payload = {
      slug: data.slug,
      name: data.name,
      imageUrl: data.imageUrl,
    };
    const updated = (await axiosInstance.patch(`/categories/${id}`, payload)) as unknown as Category;
    return {
      ...updated,
      isActive: updated.status === 'active',
    };
  },
};
