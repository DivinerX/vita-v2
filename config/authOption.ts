import { env } from "@/env";
import { supabase } from "@/config/supabase";
import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  secret: env.NEXTAUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const { data, error } = await supabase.auth.signInWithPassword({
          email: credentials.email,
          password: credentials.password,
        });
        console.log("data from credentials", data)
        if (error || !data.user) {
          console.log("error from credentials", error)
          return null;
        }
        return {
          id: data.user.id,
          email: data.user.email,
          displayName: data.user.user_metadata.name,
        };
      }
    })
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (!account || !user) return false;

      if (account.provider === 'google') {
        const { data, error } = await supabase.auth.signInWithIdToken({
          provider: 'google',
          token: account.id_token!,
          access_token: account.access_token
        });
        console.log("data from google", data)

        if (error) {
          console.error('Supabase sign in error:', error);
          return false;
        }
      }

      return true;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub;
        if (token.accessToken) {
          session.accessToken = token.accessToken as string;
        }
      }
      return session;
    },
    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },
  },
  pages: {
    signIn: "/signin",
    signOut: "/signout",
  },
};