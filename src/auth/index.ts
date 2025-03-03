import { default as NextAuth } from "next-auth";

import { authConfig } from "~/auth/config";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
  unstable_update: update,
} = NextAuth({
  ...authConfig,
  session: { strategy: "jwt" },
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
});
