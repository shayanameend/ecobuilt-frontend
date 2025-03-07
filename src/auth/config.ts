import type { NextAuthConfig } from "next-auth";

import type { DecodedUser } from "~/../types";

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
        access: { label: "Access", type: "text" },
        id: { label: "ID", type: "text" },
        email: { label: "Email", type: "email" },
        status: { label: "Status", type: "text" },
        role: { label: "Role", type: "text" },
        isVerified: { label: "Is Verified", type: "text" },
        isDeleted: { label: "Is Deleted", type: "text" },
        createdAt: { label: "Created At", type: "text" },
        updatedAt: { label: "Updated At", type: "text" },
      },
      async authorize(credentials) {
        if (!credentials.access) {
          throw new Error("Access is required!");
        }

        if (!credentials.id) {
          throw new Error("ID is required!");
        }

        if (!credentials.email) {
          throw new Error("Email is required!");
        }

        if (!credentials.status) {
          throw new Error("Status is required!");
        }

        if (!credentials.role) {
          throw new Error("Role is required!");
        }

        if (!credentials.isVerified) {
          throw new Error("Is Verified is required!");
        }

        if (!credentials.isDeleted) {
          throw new Error("Is Deleted is required!");
        }

        if (!credentials.createdAt) {
          throw new Error("Created At is required!");
        }

        if (!credentials.updatedAt) {
          throw new Error("Updated At is required!");
        }

        return credentials as DecodedUser;
      },
    }),
  ],
};

export { authConfig };
