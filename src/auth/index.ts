import { default as NextAuth } from "next-auth";

import { authConfig } from "~/auth/config";
import { authRoutes } from "~/lib/routes";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
  unstable_update: update,
} = NextAuth({
  pages: {
    signIn: authRoutes.signIn.url(),
    error: authRoutes.error.url(),
  },
  callbacks: {
    async signIn({ user, account }) {
      return true;
    },
    async session({ token, session }) {
      return session;
    },
    async jwt({ token }) {
      return token;
    },
  },
  session: { strategy: "jwt" },
  ...authConfig,
});
