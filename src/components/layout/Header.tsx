'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { logout } from '@/redux/slices/authSlice';

const AUTH_ROUTES = new Set(['/login', '/signup']);

export function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const { isAuthenticated, isLoading } = useAppSelector((state) => state.auth);

  const isAuthRoute = AUTH_ROUTES.has(pathname ?? '');

  const handleLogout = async () => {
    await dispatch(logout()).unwrap();
    router.replace('/login');
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="container flex h-14 items-center mx-auto px-4">
        <div className="mr-4 flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <span className="font-bold sm:inline-block">ProductStore</span>
          </Link>
        </div>
        {!isAuthRoute && (
          <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
            <nav className="flex items-center space-x-2">
              {isAuthenticated ? (
                <Button variant="destructive" onClick={handleLogout} disabled={isLoading}>
                  {isLoading ? 'Logging out...' : 'Logout'}
                </Button>
              ) : (
                <>
                  <Button variant="ghost" asChild>
                    <Link href="/login">Login</Link>
                  </Button>
                  <Button variant="default" asChild>
                    <Link href="/signup">Sign Up</Link>
                  </Button>
                </>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
