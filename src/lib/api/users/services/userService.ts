import axiosInstance from '../../axios.config';
import { ManagedUser, CreateUserDto, UpdateUserDto } from '@/types/user';

export const userService = {
  async getAll(): Promise<ManagedUser[]> {
    const response = await axiosInstance.get('/users');
    return response.data;
  },

  async getById(id: string): Promise<ManagedUser> {
    const response = await axiosInstance.get(`/users/${id}`);
    return response.data;
  },

  async create(data: CreateUserDto): Promise<ManagedUser> {
    const response = await axiosInstance.post('/users', data);
    return response.data;
  },

  async update(id: string, data: UpdateUserDto): Promise<ManagedUser> {
    const response = await axiosInstance.patch(`/users/${id}`, data);
    return response.data;
  },
};
