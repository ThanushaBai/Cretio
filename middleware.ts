import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const token = request.cookies.get("token")?.value;

  // Public paths that don't require authentication
  const publicPaths = [
    '/pricing',
    '/contact'
  ];

  const isDashboardRoute = path.startsWith('/dashboard');
  const isPublicPath = publicPaths.includes(path);

  // If accessing a dashboard route and not authenticated, redirect to login
  if (isDashboardRoute && !token) {
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }

  // If accessing a public path and authenticated, redirect to dashboard
  if (isPublicPath && token) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  // Otherwise, allow
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/auth/login',
    '/auth/signup',
    '/',
    '/pricing',
    '/contact'
  ]
};