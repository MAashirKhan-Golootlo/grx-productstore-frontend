import axiosInstance from '../../axios.config';
import { CreateTenantDto, Tenant, UpdateTenantDto } from '@/types/tenant';

export const tenantService = {
  async getAll(): Promise<Tenant[]> {
    return (await axiosInstance.get('/tenants')) as unknown as Tenant[];
  },

  async getById(id: string): Promise<Tenant> {
    return (await axiosInstance.get(`/tenants/${id}`)) as unknown as Tenant;
  },

  async create(data: CreateTenantDto): Promise<Tenant> {
    return (await axiosInstance.post('/tenants', data)) as unknown as Tenant;
  },

  async update(id: string, data: UpdateTenantDto): Promise<Tenant> {
    return (await axiosInstance.patch(`/tenants/${id}`, data)) as unknown as Tenant;
  },
};
