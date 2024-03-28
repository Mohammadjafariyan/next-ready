import { NextAuthOptions, Session } from 'next-auth';
import { JWT } from 'next-auth/jwt';
import Credentials from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import directusRest from '@/lib/directus';
import { withToken, readMe } from '@directus/sdk';

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),

    Credentials({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: 'Credentials',
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        mobile: { label: 'mobile', type: 'text', placeholder: 'jsmith' },
        username: { label: 'Username', type: 'text', placeholder: 'jsmith' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize (credentials, req) {
        // You need to provide your own logic here that takes the credentials
        // submitted and returns either a object representing a user or value
        // that is false/null if the credentials are invalid.
        // e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
        // You can also use the `req` object to obtain additional parameters
        // (i.e., the request IP address)
        /*  if (!credentials?.username || !credentials?.password) {
          return null;
        } */

        console.log('------------------------------------------------------');
        console.log('credentials login', credentials, req);
        console.log('------------------------------------------------------');
        /* 
        let result: void | AuthenticationData = await directus.login(
          credentials?.username,
          credentials?.password,
        );

        console.log('------------------------------------------------------');
        console.log('login result', result);
        console.log('------------------------------------------------------');

        const user = await directus.request(readMe());

        console.log('------------------------------------------------------');
        console.log('user', user);
        console.log('------------------------------------------------------');

        // If no error and we have user data, return it
        if (user) {
          return user;
        } */
        // Return null if user data could not be retrieved
        return null;
      },
    }),
  ],
  callbacks: {
    async jwt ({
      token,
      user,
      account,
    }: {
      token: JWT;
      user: any;
      account: any;
    }) {
      if (account && user) {
        const userData = await directusRest.request(
          withToken(
            user.data.access_token as string,
            readMe({
              fields: ['id', 'first_name', 'last_name'],
            }),
          ),
        );
        return {
          ...token,
          accessToken: user.data.access_token,
          refreshToken: user.data.refresh_token,
          user: userData,
        };
      }
      return token;
    },
    async session ({ session, token }: { session: Session; token: any }) {
      console.log(session, token);
      if (session && session.user) {
        /*  session.user.accessToken = token.accessToken;
        session.user.refreshToken = token.refreshToken; */
        session.user = token.user;
      }

      return session;
    },
  },
};
