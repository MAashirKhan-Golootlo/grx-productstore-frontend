'use client';

import { useAppDispatch, useAppSelector } from '@/redux/store';
import {
  fetchPartnerProductById,
  updatePartnerProduct,
  createPartnerProduct,
} from '@/redux/slices/partnerProductSlice';
import { fetchPartners } from '@/redux/slices/partnerSlice';
import { fetchProducts } from '@/redux/slices/productSlice';
import { fetchTenants } from '@/redux/slices/tenantSlice';
import { PartnerProductFormData } from '@/lib/validation';
import { useEffect } from 'react';

export function usePartnerProductEditor(id?: string) {
  const dispatch = useAppDispatch();
  const {
    selected: partnerProduct,
    isLoading,
    error,
  } = useAppSelector((state) => state.partnerProducts);
  const { items: partners } = useAppSelector((state) => state.partners);
  const { items: products } = useAppSelector((state) => state.products);
  const { items: tenants } = useAppSelector((state) => state.tenants);

  useEffect(() => {
    if (id) {
      dispatch(fetchPartnerProductById(id));
    }
    dispatch(fetchPartners());
    dispatch(fetchProducts());
    dispatch(fetchTenants());
  }, [dispatch, id]);

  const update = async (data: PartnerProductFormData) => {
    if (!id) return;
    const payload = {
      ...data,
      tenantId: !data.tenantId || data.tenantId === '__none__' ? undefined : data.tenantId,
    };
    return await dispatch(updatePartnerProduct({ id, data: payload })).unwrap();
  };

  const create = async (data: PartnerProductFormData) => {
    const payload = {
      ...data,
      tenantId: !data.tenantId || data.tenantId === '__none__' ? undefined : data.tenantId,
    };
    return await dispatch(createPartnerProduct(payload)).unwrap();
  };

  return {
    partnerProduct,
    partners,
    products,
    tenants,
    isLoading,
    isSubmitting: isLoading,
    error,
    update,
    create,
  };
}
