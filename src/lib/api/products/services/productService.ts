import axiosInstance from '../../axios.config';
import { Product, CreateProductDto, UpdateProductDto } from '@/types/product';

export const productService = {
  async getAll(): Promise<Product[]> {
    const response = await axiosInstance.get('/products');
    return response.data;
  },

  async getById(id: string): Promise<Product> {
    const response = await axiosInstance.get(`/products/${id}`);
    return response.data;
  },

  async create(data: CreateProductDto): Promise<Product> {
    const response = await axiosInstance.post('/products', data);
    return response.data;
  },

  async update(id: string, data: UpdateProductDto): Promise<Product> {
    const response = await axiosInstance.patch(`/products/${id}`, data);
    return response.data;
  },

  async delete(id: string): Promise<void> {
    await axiosInstance.delete(`/products/${id}`);
  },
};
