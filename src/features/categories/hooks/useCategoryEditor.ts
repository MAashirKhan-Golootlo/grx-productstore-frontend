'use client';

import { useCallback, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import {
  createCategory,
  fetchCategoryById,
  updateCategory,
} from '@/redux/slices/categorySlice';
import type { CategoryFormData } from '@/lib/validation';

export function useCategoryEditor(id?: string) {
  const dispatch = useAppDispatch();
  const { selected, isListLoading, isFormSubmitting, error } = useAppSelector(
    (state) => state.categories
  );

  useEffect(() => {
    if (!id) {
      return;
    }
    dispatch(fetchCategoryById(id));
  }, [dispatch, id]);

  const create = useCallback(
    async (data: CategoryFormData) => {
      return dispatch(createCategory(data)).unwrap();
    },
    [dispatch]
  );

  const update = useCallback(
    async (payload: CategoryFormData) => {
      if (!id) {
        throw new Error('Category id is required to update.');
      }
      return dispatch(updateCategory({ id, data: payload })).unwrap();
    },
    [dispatch, id]
  );

  return {
    category: selected,
    isLoading: isListLoading,
    isSubmitting: isFormSubmitting,
    error,
    create,
    update,
  };
}
