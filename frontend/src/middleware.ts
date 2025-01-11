import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token');
  const isAuthPage = request.nextUrl.pathname.startsWith('/auth/');
  const isProtectedRoute = request.nextUrl.pathname.startsWith('/profile') || 
                          request.nextUrl.pathname.startsWith('/reservations') ||
                          request.nextUrl.pathname.startsWith('/admin');

  // Kullanıcı giriş yapmış ve auth sayfalarına erişmeye çalışıyorsa
  if (token && isAuthPage) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  // Kullanıcı giriş yapmamış ve korumalı sayfalara erişmeye çalışıyorsa
  if (!token && isProtectedRoute) {
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/profile/:path*',
    '/reservations/:path*',
    '/admin/:path*',
    '/auth/:path*'
  ]
}; 