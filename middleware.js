import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(req) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const path = req.nextUrl.pathname;

  // Pattern to match routes with IDs
  const protectedIdRoutes = ['/profile'];

  // Check if path starts with any protected route pattern
  const isProtectedRoute = protectedIdRoutes.some((route) =>
    path.startsWith(route)
  );

  if (isProtectedRoute && !token) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/profile'],
};
