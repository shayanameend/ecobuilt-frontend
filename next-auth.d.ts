import NextAuth, { type DefaultSession } from "next-auth";

export type ExtendedUser = DefaultSession["user"] & {
  role?: "SUPER ADMIN" | "ADMIN" | "USER" | "VENDOR";
};

declare module "next-auth" {
  interface Session {
    user: ExtendedUser;
  }
}
