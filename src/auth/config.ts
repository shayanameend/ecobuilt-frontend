import type { NextAuthConfig } from "next-auth";

import Credentials from "next-auth/providers/credentials";

const authConfig: NextAuthConfig = {
  providers: [
    Credentials({
      async authorize(credentials) {
        return null;
      },
    }),
  ],
};

export { authConfig };
