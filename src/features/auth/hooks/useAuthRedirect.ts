'use client';
import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useAppSelector } from '@/redux/hooks';

export const useAuthRedirect = (redirectTo: string = '/', redirectIfAuth: boolean = true) => {
  const router = useRouter();
  const pathname = usePathname();
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (redirectIfAuth && isAuthenticated) {
      router.replace(redirectTo);
    }
    if (!redirectIfAuth && !isAuthenticated) {
      router.replace(`/login?next=${encodeURIComponent(pathname)}`);
    }
  }, [isAuthenticated, pathname, redirectIfAuth, redirectTo, router]);
};
