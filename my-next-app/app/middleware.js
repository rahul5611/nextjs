// middleware.js
import { NextResponse } from 'next/server';

export function middleware(request) {
  const isAuth = request.cookies.get('auth');
  const protectedRoutes = ['/dashboard'];

  if (protectedRoutes.includes(request.nextUrl.pathname) && !isAuth) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
}
