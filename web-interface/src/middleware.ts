import { auth } from '@/auth';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export default auth((req) => {
  const { nextUrl, auth } = req;
  const isLoggedIn = !!auth;

  // Public routes that don't require authentication
  const isPublicRoute = 
    nextUrl.pathname.startsWith('/auth/') || 
    nextUrl.pathname === '/';

  // API routes should be handled by their own auth logic
  const isApiRoute = nextUrl.pathname.startsWith('/api/');
  
  // Skip middleware for API routes
  if (isApiRoute) {
    return NextResponse.next();
  }

  // If the user is not logged in and trying to access a protected route
  if (!isLoggedIn && !isPublicRoute) {
    return NextResponse.redirect(new URL('/auth/signin', nextUrl.origin));
  }

  // If the user is logged in and trying to access auth pages
  if (isLoggedIn && nextUrl.pathname.startsWith('/auth/')) {
    return NextResponse.redirect(new URL('/conversation', nextUrl.origin));
  }

  return NextResponse.next();
});

// Specify which routes this middleware should run on
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|public).*)',
  ],
}; 