import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  const token = request.cookies.get('session_token')?.value;

  const isAuthRoute = pathname === '/login' || pathname === '/signup';
  const isProtectedRoute =
    pathname === '/' ||
    pathname.startsWith('/categories') ||
    pathname.startsWith('/products') ||
    pathname.startsWith('/users') ||
    pathname.startsWith('/orders') ||
    pathname.startsWith('/tenants') ||
    pathname.startsWith('/partners') ||
    pathname.startsWith('/partner-products');

  if (isProtectedRoute && !token) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('next', `${pathname}${search}`);
    return NextResponse.redirect(loginUrl);
  }

  if (isAuthRoute && token) {
    const nextParam = request.nextUrl.searchParams.get('next');
    const destination = nextParam && nextParam.startsWith('/') ? nextParam : '/';
    return NextResponse.redirect(new URL(destination, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};

