'use client';

import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { fetchCategories } from '@/redux/slices/categorySlice';

export function useCategoriesList() {
  const dispatch = useAppDispatch();
  const { items, isListLoading, error } = useAppSelector((state) => state.categories);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const refresh = () => dispatch(fetchCategories());

  return {
    items,
    isLoading: isListLoading,
    error,
    refresh,
  };
}
