import type { Partner } from '../partner';
import type { Product } from '../product';
import type { Tenant } from '../tenant';

export interface PartnerProduct {
  id: string;
  partnerId: string;
  productId: string;
  tenantId?: string;
  allocatedStock: number;
  availableStock: number;
  partnerPrice: number;
  currency: string;
  partner?: Partner;
  product?: Product;
  tenant?: Tenant;
  createdAt: string;
  updatedAt: string;
}

export interface CreatePartnerProductDto {
  partnerId: string;
  productId: string;
  tenantId?: string;
  allocatedStock: number;
  partnerPrice: number;
  currency: string;
}

export interface UpdatePartnerProductDto extends Partial<CreatePartnerProductDto> {}
