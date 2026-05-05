import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAppSelector } from '@/redux/hooks';

export const useAuthRedirect = (redirectTo: string = '/', redirectIfAuth: boolean = true) => {
  const router = useRouter();
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (redirectIfAuth && isAuthenticated) {
      router.push(redirectTo);
    }
    if (!redirectIfAuth && !isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, redirectIfAuth, redirectTo, router]);
};
