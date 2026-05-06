import axiosInstance from '../../axios.config';
import { CreatePartnerDto, Partner, UpdatePartnerDto } from '@/types/partner';

export const partnerService = {
  async getAll(): Promise<Partner[]> {
    return (await axiosInstance.get('/partners')) as unknown as Partner[];
  },

  async getById(id: string): Promise<Partner> {
    return (await axiosInstance.get(`/partners/${id}`)) as unknown as Partner;
  },

  async create(data: CreatePartnerDto): Promise<Partner> {
    return (await axiosInstance.post('/partners', data)) as unknown as Partner;
  },

  async update(id: string, data: UpdatePartnerDto): Promise<Partner> {
    return (await axiosInstance.patch(`/partners/${id}`, data)) as unknown as Partner;
  },
};
