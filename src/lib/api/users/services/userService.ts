import axiosInstance from '../../axios.config';
import { ManagedUser, CreateUserDto, UpdateUserDto } from '@/types/user';

export const userService = {
  async getAll(): Promise<ManagedUser[]> {
    const data = (await axiosInstance.get('/users')) as unknown as ManagedUser[];
    return data.map((item) => ({
      ...item,
      name: item.fullName,
      isActive: item.status === 'active',
    }));
  },

  async getById(id: string): Promise<ManagedUser> {
    const data = (await axiosInstance.get(`/users/${id}`)) as unknown as ManagedUser;
    return {
      ...data,
      name: data.fullName,
      isActive: data.status === 'active',
    };
  },

  async create(data: CreateUserDto): Promise<ManagedUser> {
    const payload = {
      email: data.email,
      fullName: data.fullName ?? data.name ?? '',
      password: data.password ?? '',
    };
    const created = (await axiosInstance.post('/users', payload)) as unknown as ManagedUser;
    return {
      ...created,
      name: created.fullName,
      isActive: created.status === 'active',
    };
  },

  async update(id: string, data: UpdateUserDto): Promise<ManagedUser> {
    const payload = {
      email: data.email,
      fullName: data.fullName ?? data.name,
    };
    const updated = (await axiosInstance.patch(`/users/${id}`, payload)) as unknown as ManagedUser;
    return {
      ...updated,
      name: updated.fullName,
      isActive: updated.status === 'active',
    };
  },
};
