import type { NextAuthConfig } from "next-auth";

import Credentials from "next-auth/providers/credentials";

import { authRoutes } from "~/lib/routes";

const authConfig: NextAuthConfig = {
  pages: {
    signIn: authRoutes.signIn.url(),
    error: authRoutes.error.url(),
  },
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        role: { label: "Role", type: "text" },
      },
      async authorize(credentials) {
        if (!credentials.email || !credentials.role) {
          throw new Error("Email and Role are required!");
        }

        return credentials as {
          email: string;
          role: string;
        };
      },
    }),
  ],
};

export { authConfig };
