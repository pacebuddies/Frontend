import NextAuth from 'next-auth';
import StravaProvider from 'next-auth/providers/strava';

export default NextAuth({
  providers: [
    StravaProvider({
      clientId: '97926',
      clientSecret: 'b311304ac9e469ccc742d359d6c9ddbeede1dd01',
      authorization: {
        params: {
          scope:
            'read,read_all,profile:read_all,activity:read,activity:read_all',
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
  },
});
