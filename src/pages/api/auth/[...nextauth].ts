import type { NextAuthOptions, Session, TokenSet } from 'next-auth';
import NextAuth from 'next-auth';
import { JWT } from 'next-auth/jwt';
import StravaProvider from 'next-auth/providers/strava';
import { stravaOauthApi } from '../../../instances/axiosConfigured';

async function refreshAccessToken(token: JWT): Promise<JWT> {
  try {
    const refreshedTokens: TokenSet = await stravaOauthApi
      .post('/token', {
        client_id: process.env['STRAVA_CLIENT_ID'],
        client_secret: process.env['STRAVA_CLIENT_SECRET'],
        grant_type: 'refresh_token',
        refresh_token: token.refresh_token,
      })
      .then((response) => response.data)
      .catch((error) => console.log(error));

    return {
      ...token,
      access_token: refreshedTokens.access_token!,
      refresh_token: refreshedTokens.refresh_token!,
      expires_at: refreshedTokens.expires_at!,
      error: 'NoError',
    };
  } catch (error) {
    console.log(error);
    return {
      ...token,
      error: 'RefreshAccessTokenError',
    };
  }
}

export const authOptions: NextAuthOptions = {
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
    signIn: '/',
  },
  secret: process.env['NEXTAUTH_SECRET'],
  callbacks: {
    // Redirects user on sigIn to his home page
    async redirect({ baseUrl }): Promise<string> {
      return baseUrl + '/home';
    },
    // https://authjs.dev/guides/basics/refresh-token-rotation tylko nie dla authjs :upsidedown:
    async jwt({ token, account }): Promise<JWT> {
      if (account) {
        return {
          access_token: account.access_token!,
          expires_at: account.expires_at!,
          refresh_token: account.refresh_token!,
          id: account.providerAccountId,
        };
      } else if (Date.now() < token.expires_at * 1000) {
        return token;
      } else {
        return refreshAccessToken(token);
      }
    },
    async session({ session, token }): Promise<Session> {
      // Send properties to the client, like an access_token
      session.accessToken = token.access_token;
      session.id = token.id;
      return session;
    },
  },
};

export default NextAuth(authOptions);
