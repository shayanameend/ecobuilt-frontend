import type { DefaultSession } from "next-auth";

import type { DecodedUser, Role, UserStatus } from "~/../types";

export type ExtendedUser = DefaultSession["user"] & DecodedUser;

declare module "next-auth" {
  interface Session {
    user: ExtendedUser;
  }
}
