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
    async signIn() {
      return true;
    },
    async session({ token, session }) {
      if (token.email && session.user) {
        session.user.email = token.email as string;
        session.user.role = token.role as "ADMIN" | "USER";
      }

      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.email = user.email;

        if ("role" in user) {
          token.role = user.role;
        }
      }

      return token;
    },
  },
  session: { strategy: "jwt" },
  ...authConfig,
});
