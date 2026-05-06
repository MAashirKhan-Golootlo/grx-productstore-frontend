import axiosInstance from '../../axios.config';
import { Product, CreateProductDto, UpdateProductDto } from '@/types/product';

export const productService = {
  async getAll(): Promise<Product[]> {
    const data = (await axiosInstance.get('/products')) as unknown as Product[];
    return data.map((item) => ({
      ...item,
      price: Number(item.basePrice),
      isActive: item.status === 'active',
    }));
  },

  async getById(id: string): Promise<Product> {
    const data = (await axiosInstance.get(`/products/${id}`)) as unknown as Product;
    return {
      ...data,
      price: Number(data.basePrice),
      isActive: data.status === 'active',
    };
  },

  async create(data: CreateProductDto): Promise<Product> {
    const payload = {
      sku: data.sku,
      name: data.name,
      description: data.description,
      imageUrl: data.imageUrl,
      basePrice: data.basePrice ?? data.price ?? 0,
      currency: data.currency,
      categoryId: data.categoryId,
    };
    const created = (await axiosInstance.post('/products', payload)) as unknown as Product;
    return {
      ...created,
      price: Number(created.basePrice),
      isActive: created.status === 'active',
    };
  },

  async update(id: string, data: UpdateProductDto): Promise<Product> {
    const payload = {
      sku: data.sku,
      name: data.name,
      description: data.description,
      imageUrl: data.imageUrl,
      basePrice: data.basePrice ?? data.price,
      currency: data.currency,
      categoryId: data.categoryId,
    };
    const updated = (await axiosInstance.patch(`/products/${id}`, payload)) as unknown as Product;
    return {
      ...updated,
      price: Number(updated.basePrice),
      isActive: updated.status === 'active',
    };
  },

};
