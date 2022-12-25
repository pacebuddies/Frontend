import NextAuth from 'next-auth';
import StravaProvider from 'next-auth/providers/strava';

export default NextAuth({
  providers: [
    StravaProvider({
      clientId: process.env['STRAVA_CLIENT_ID']!,
      clientSecret: process.env['STRAVA_CLIENT_SECRET']!,
      authorization: {
        params: {
          scope: process.env['STRAVA_CLIENT_SCOPE'],
        },
      },
    }),
  ],

  pages: {
    signIn: '/signin',
  },
  callbacks: {
    async redirect({ baseUrl }) {
      return baseUrl;
    },
    async jwt({ token }) {
      return token;
    },
    // async session({ session, token, user }) {
    //   // Send properties to the client, like an access_token and user id from a provider.
    //   session.accessToken = token.accessToken
    //   session.user.id = token.id
    //
    //   return session
    // }
  },
});
