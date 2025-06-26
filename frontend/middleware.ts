import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('refreshToken');
  if (!token) {
    const url = request.nextUrl.clone();
    url.pathname = '/signin';
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/profile', '/dashboard'],
};