import NextAuth from 'next-auth';
import { JWT } from 'next-auth/jwt';
import StravaProvider from 'next-auth/providers/strava';
import stravaApi from '../../../instances/axiosConfigured';
import type { NextAuthOptions } from 'next-auth'
// const GOOGLE_AUTHORIZATION_URL =
//   'https://accounts.google.com/o/oauth2/v2/auth?' +
//   new URLSearchParams({
//     prompt: 'consent',
//     access_type: 'offline',
//     response_type: 'code',
//   });
//
// /**
//  * Takes a token, and returns a new token with updated
//  * `accessToken` and `accessTokenExpires`. If an error occurs,
//  * returns the old token and an error property
//  */
// async function refreshAccessToken(token: JWT) {
//   try {
//     const url =
//       'https://oauth2.googleapis.com/token?' +
//       new URLSearchParams({
//         client_id: process.env.GOOGLE_CLIENT_ID,
//         client_secret: process.env.GOOGLE_CLIENT_SECRET,
//         grant_type: 'refresh_token',
//         refresh_token: token.refreshToken,
//       });
//
//     const response = await fetch(url, {
//       headers: {
//         'Content-Type': 'application/x-www-form-urlencoded',
//       },
//       method: 'POST',
//     });
//
//     const refreshedTokens = await response.json();
//
//     if (!response.ok) {
//       throw refreshedTokens;
//     }
//
//     return {
//       ...token,
//       accessToken: refreshedTokens.access_token,
//       accessTokenExpires: Date.now() + refreshedTokens.expires_at * 1000,
//       refreshToken: refreshedTokens.refresh_token ?? token.refreshToken, // Fall back to old refresh token
//     };
//   } catch (error) {
//     console.log(error);
//
//     return {
//       ...token,
//       error: 'RefreshAccessTokenError',
//     };
//   }
// }
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
    signIn: '/signin',
  },
  callbacks: {
    async redirect({ baseUrl }) {
      return baseUrl;
    },
    async jwt({ token, user, account }): Promise<JWT> {
      if (user) {
        token.idToken = user.id;
      }
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },
    async session({ session, token }) {
      // Send properties to the client, like an access_token
      session.accessToken = token.accessToken;
      return session;
    },
  },
};

export default NextAuth(authOptions);
