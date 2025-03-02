import type { NextAuthConfig } from "next-auth";

import Credentials from "next-auth/providers/credentials";

const authConfig: NextAuthConfig = {
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
