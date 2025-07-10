import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const isAuthenticated = request.cookies.get('isAuthenticated')?.value === 'true';
  const { pathname } = request.nextUrl;

  if (isAuthenticated && (pathname === '/login' || pathname === '/register')) {
    return NextResponse.redirect(new URL('/shop', request.url));
  }
}
export const config = {
  matcher: [
    '/login',
    '/register',
    '/:path*',
  ],
};

