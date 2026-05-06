import axiosInstance from '../../axios.config';
import {
  CreatePartnerProductDto,
  PartnerProduct,
  UpdatePartnerProductDto,
} from '@/types/partner-product';

const mapPartnerProduct = (item: PartnerProduct): PartnerProduct => ({
  ...item,
  partnerPrice: Number(item.partnerPrice),
});

export const partnerProductService = {
  async getAll(): Promise<PartnerProduct[]> {
    const data = (await axiosInstance.get('/partner-products')) as unknown as PartnerProduct[];
    return data.map(mapPartnerProduct);
  },

  async getById(id: string): Promise<PartnerProduct> {
    const data = (await axiosInstance.get(`/partner-products/${id}`)) as unknown as PartnerProduct;
    return mapPartnerProduct(data);
  },

  async create(data: CreatePartnerProductDto): Promise<PartnerProduct> {
    const created = (await axiosInstance.post('/partner-products', data)) as unknown as PartnerProduct;
    return mapPartnerProduct(created);
  },

  async update(id: string, data: UpdatePartnerProductDto): Promise<PartnerProduct> {
    const updated = (await axiosInstance.patch(`/partner-products/${id}`, data)) as unknown as PartnerProduct;
    return mapPartnerProduct(updated);
  },
};
