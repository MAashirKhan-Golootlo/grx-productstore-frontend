'use client';

import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { fetchProducts } from '@/redux/slices/productSlice';

export function useProductsList() {
  const dispatch = useAppDispatch();
  const { items, isListLoading, error } = useAppSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const refresh = () => dispatch(fetchProducts());

  return {
    items,
    isLoading: isListLoading,
    error,
    refresh,
  };
}
