import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

// middleware on the /home/* path
export const config = {
  matcher: '/home/:function*',
};

export function middleware(request: NextRequest) {
  return NextResponse.next();
  // check if the request has a cookie named 'SESSION'
  if (request.cookies.has('SESSION')) {
    const cookie = request.cookies.get('SESSION')?.value;
    console.log(cookie); // => 'fast'
    return NextResponse.next();
  }
  // if not, redirect to the login page
  const url = request.nextUrl.clone();
  url.pathname = '/';
  return NextResponse.redirect(url);
}
