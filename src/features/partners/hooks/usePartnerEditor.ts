'use client';

import { useAppDispatch, useAppSelector } from '@/redux/store';
import { fetchPartnerById, updatePartner, createPartner } from '@/redux/slices/partnerSlice';
import { PartnerFormData } from '@/lib/validation';
import { useEffect } from 'react';

export function usePartnerEditor(id?: string) {
  const dispatch = useAppDispatch();
  const { selected: partner, isLoading, error } = useAppSelector((state) => state.partners);

  useEffect(() => {
    if (id) {
      dispatch(fetchPartnerById(id));
    }
  }, [dispatch, id]);

  const update = async (data: PartnerFormData) => {
    if (!id) return;
    return await dispatch(updatePartner({ id, data })).unwrap();
  };

  const create = async (data: PartnerFormData) => {
    return await dispatch(createPartner(data)).unwrap();
  };

  return {
    partner,
    isLoading,
    isSubmitting: isLoading,
    error,
    update,
    create,
  };
}
