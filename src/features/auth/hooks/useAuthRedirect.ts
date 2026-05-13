'use client';
import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useAppSelector } from '@/redux/hooks';

export const useAuthRedirect = (redirectTo: string = '/', redirectIfAuth: boolean = true) => {
  const router = useRouter();
  const pathname = usePathname();
  const { isAuthenticated, isHydrated } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (!isHydrated) return;
    if (redirectIfAuth && isAuthenticated) {
      router.replace(redirectTo);
    }
    if (!redirectIfAuth && !isAuthenticated) {
      router.replace(`/login?next=${encodeURIComponent(pathname)}`);
    }
  }, [isAuthenticated, isHydrated, pathname, redirectIfAuth, redirectTo, router]);
};
