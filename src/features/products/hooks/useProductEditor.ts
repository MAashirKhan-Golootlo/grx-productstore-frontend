'use client';

import { useCallback, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { createProduct, fetchProductById, updateProduct } from '@/redux/slices/productSlice';
import { fetchCategories } from '@/redux/slices/categorySlice';
import type { ProductFormData } from '@/lib/validation';

export function useProductEditor(id?: string) {
  const dispatch = useAppDispatch();
  const { selected, isListLoading, isFormSubmitting, error } = useAppSelector(
    (state) => state.products
  );
  const { items: categories, isListLoading: isCategoriesLoading } = useAppSelector(
    (state) => state.categories
  );

  useEffect(() => {
    dispatch(fetchCategories());
    if (!id) {
      return;
    }
    dispatch(fetchProductById(id));
  }, [dispatch, id]);

  const create = useCallback(
    async (data: ProductFormData) =>
      dispatch(
        createProduct({
          ...data,
          basePrice: data.price,
        })
      ).unwrap(),
    [dispatch]
  );

  const update = useCallback(
    async (data: ProductFormData) => {
      if (!id) {
        throw new Error('Product id is required to update.');
      }
      return dispatch(
        updateProduct({
          id,
          data: {
            ...data,
            basePrice: data.price,
          },
        })
      ).unwrap();
    },
    [dispatch, id]
  );

  return {
    product: selected,
    categories,
    isLoading: isListLoading,
    isCategoriesLoading,
    isSubmitting: isFormSubmitting,
    error,
    create,
    update,
  };
}
