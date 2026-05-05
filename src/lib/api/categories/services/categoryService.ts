import axiosInstance from '../../axios.config';
import { Category, CreateCategoryDto, UpdateCategoryDto } from '@/types/category';

export const categoryService = {
  async getAll(): Promise<Category[]> {
    const response = await axiosInstance.get('/categories');
    return response.data;
  },

  async getById(id: string): Promise<Category> {
    const response = await axiosInstance.get(`/categories/${id}`);
    return response.data;
  },

  async create(data: CreateCategoryDto): Promise<Category> {
    const response = await axiosInstance.post('/categories', data);
    return response.data;
  },

  async update(id: string, data: UpdateCategoryDto): Promise<Category> {
    const response = await axiosInstance.patch(`/categories/${id}`, data);
    return response.data;
  },

  async delete(id: string): Promise<void> {
    await axiosInstance.delete(`/categories/${id}`);
  },
};
