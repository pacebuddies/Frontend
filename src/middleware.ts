import { withAuth } from 'next-auth/middleware';

export default withAuth({
  secret: process.env['NEXTAUTH_SECRET'],
});
export const config = {
  matcher: [
    '/home/:path*',
    '/profile/:path*',
    '/settings/:path*',
    '/statistics/:path*',
    '/activities/:path*',
  ],
};
