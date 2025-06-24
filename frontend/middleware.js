import { NextResponse } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export async function middleware(request) {
    const accessToken = request.cookies.get('access_token');
    if( !accessToken ) {
        return NextResponse.redirect(new URL('/login', request.url));
    }
  return NextResponse.redirect(new URL('/home', request.url))
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/forgot-password/', '/reset-password', '/profile'],
}