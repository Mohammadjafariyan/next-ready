import NextAuth, { NextAuthOptions, Session } from 'next-auth';

import GoogleProvider from 'next-auth/providers/google';
import Credentials from 'next-auth/providers/credentials';
import { AuthenticationData, readMe, withToken } from '@directus/sdk';
import directusRest from '@/lib/directus';
import { JWT } from 'next-auth/jwt';
import directus from '@/lib/directus';
import { authOptions } from './authOptions';

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
