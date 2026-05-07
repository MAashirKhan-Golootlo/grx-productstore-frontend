'use client';

import { useAppDispatch, useAppSelector } from '@/redux/store';
import { fetchTenantById, updateTenant, createTenant } from '@/redux/slices/tenantSlice';
import { TenantFormData } from '@/lib/validation';
import { useEffect } from 'react';

export function useTenantEditor(id?: number) {
  const dispatch = useAppDispatch();
  const { selected: tenant, isLoading, error } = useAppSelector((state) => state.tenants);

  useEffect(() => {
    if (id) {
      dispatch(fetchTenantById(id));
    }
  }, [dispatch, id]);

  const update = async (data: TenantFormData) => {
    if (!id) return;
    return await dispatch(updateTenant({ id, data })).unwrap();
  };

  const create = async (data: TenantFormData) => {
    return await dispatch(createTenant(data)).unwrap();
  };

  return {
    tenant,
    isLoading,
    isSubmitting: isLoading,
    error,
    update,
    create,
  };
}
