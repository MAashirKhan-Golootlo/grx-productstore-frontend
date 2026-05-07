import axiosInstance from '../../axios.config';
import {
  CreateTenantDto,
  CreateTenantResponse,
  Tenant,
  TenantIntegrationCredentials,
  UpdateTenantDto,
} from '@/types/tenant';

export const tenantService = {
  async getAll(): Promise<Tenant[]> {
    return (await axiosInstance.get('/tenants')) as unknown as Tenant[];
  },

  async getById(id: number): Promise<Tenant> {
    return (await axiosInstance.get(`/tenants/${id}`)) as unknown as Tenant;
  },

  async create(data: CreateTenantDto): Promise<CreateTenantResponse> {
    return (await axiosInstance.post('/tenants', data)) as unknown as CreateTenantResponse;
  },

  async update(id: number, data: UpdateTenantDto): Promise<Tenant> {
    return (await axiosInstance.patch(`/tenants/${id}`, data)) as unknown as Tenant;
  },

  async getIntegrationCredentials(id: number): Promise<TenantIntegrationCredentials> {
    return (await axiosInstance.get(
      `/tenants/${id}/integration-credentials`,
    )) as unknown as TenantIntegrationCredentials;
  },
};
