'use client';

import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { fetchUserById, updateUser, createUser, clearUserError } from '@/redux/slices/userSlice';
import { UserFormData } from '@/lib/validation';
import { useEffect } from 'react';

export function useUserEditor(id?: string) {
  const dispatch = useAppDispatch();
  const { selected: user, isLoading, error } = useAppSelector((state) => state.users);

  useEffect(() => {
    if (id) {
      dispatch(fetchUserById(id));
    }
    return () => {
      dispatch(clearUserError());
    };
  }, [dispatch, id]);

  const update = async (data: UserFormData) => {
    if (!id) return;
    return await dispatch(updateUser({ id, data })).unwrap();
  };

  const create = async (data: UserFormData) => {
    return await dispatch(createUser(data)).unwrap();
  };

  return {
    user,
    isLoading,
    isSubmitting: isLoading, // Reusing isLoading as submitting state for now
    error,
    update,
    create,
  };
}
