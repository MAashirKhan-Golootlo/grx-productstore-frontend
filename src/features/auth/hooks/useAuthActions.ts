import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { login, register, logout, clearError } from '@/redux/slices/authSlice';
import type { LoginCredentials, RegisterCredentials } from '@/types/auth';
import { useCallback } from 'react';

export const useAuthActions = () => {
  const dispatch = useAppDispatch();
  const { user, isAuthenticated, isLoading, error } = useAppSelector((state) => state.auth);

  const handleLogin = useCallback(
    async (credentials: LoginCredentials) => {
      return dispatch(login(credentials)).unwrap();
    },
    [dispatch]
  );

  const handleRegister = useCallback(
    async (credentials: RegisterCredentials) => {
      return dispatch(register(credentials)).unwrap();
    },
    [dispatch]
  );

  const handleLogout = useCallback(async () => {
    return dispatch(logout()).unwrap();
  }, [dispatch]);

  const handleClearError = useCallback(() => {
    dispatch(clearError());
  }, [dispatch]);

  return {
    user,
    isAuthenticated,
    isLoading,
    error,
    login: handleLogin,
    register: handleRegister,
    logout: handleLogout,
    clearError: handleClearError,
  };
};
