import { signIn, signOut } from "next-auth/react";

import type { DecodedUser } from "../../types";

async function createToken(user: DecodedUser) {
  return await signIn("credentials", user);
}

async function deleteToken() {
  return await signOut();
}

export { createToken, deleteToken };
