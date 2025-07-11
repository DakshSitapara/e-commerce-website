import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const privateRoutes = ["/shop", "/account", "/cart","/wishlist", "/checkout", "/billing"];
  const isAuthenticated = request.cookies.get('authenticated')?.value === 'true';
  const pathname = request.nextUrl.pathname;

  if (isAuthenticated && privateRoutes.includes(pathname)) {
    const response = NextResponse.next();
    response.cookies.set('lastPrivateRoute', pathname, { path: '/' });
    return response;
  }

  if (privateRoutes.includes(pathname) && !isAuthenticated) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  if (isAuthenticated && !privateRoutes.includes(pathname)) {
    const lastPrivateRoute = request.cookies.get('lastPrivateRoute')?.value || '/shop';
    return NextResponse.redirect(new URL(lastPrivateRoute, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/shop', '/account', '/cart','/wishlist', '/checkout', '/billing', '/login', '/register'],
};