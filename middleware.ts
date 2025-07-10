import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const privateRoutes = ["/shop", "/account", "/cart", "/checkout", "/billing"];
  const isAuthenticated = request.cookies.get('authenticated')?.value === 'true';
  const pathname = request.nextUrl.pathname;

  if (privateRoutes.includes(pathname) && !isAuthenticated) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
  if(!privateRoutes.includes(pathname) && isAuthenticated) {
    return NextResponse.redirect(new URL("/shop", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/shop', '/account', '/cart', '/checkout', '/billing', '/login', '/register'],
};
