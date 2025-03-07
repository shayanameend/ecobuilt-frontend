import type { DecodedUser } from "../../types";

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
        session.user.access = token.access as DecodedUser["access"];
        session.user.id = token.id as DecodedUser["id"];
        session.user.email = token.email as DecodedUser["email"];
        session.user.status = token.status as DecodedUser["status"];
        session.user.role = token.role as DecodedUser["role"];
        session.user.isVerified = token.isVerified as DecodedUser["isVerified"];
        session.user.isDeleted = token.isDeleted as DecodedUser["isDeleted"];
        session.user.createdAt = new Date(
          token.createdAt as DecodedUser["createdAt"],
        );
        session.user.updatedAt = new Date(
          token.updatedAt as DecodedUser["updatedAt"],
        );
      }

      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        if ("access" in user) {
          token.access = user.access;
        }

        if ("id" in user) {
          token.id = user.id;
        }

        if ("email" in user) {
          token.email = user.email;
        }

        if ("status" in user) {
          token.status = user.status;
        }

        if ("role" in user) {
          token.role = user.role;
        }

        if ("isVerified" in user) {
          token.isVerified = user.isVerified;
        }

        if ("isDeleted" in user) {
          token.isDeleted = user.isDeleted;
        }

        if ("createdAt" in user) {
          token.createdAt = user.createdAt;
        }

        if ("updatedAt" in user) {
          token.updatedAt = user.updatedAt;
        }
      }

      return token;
    },
  },
});
