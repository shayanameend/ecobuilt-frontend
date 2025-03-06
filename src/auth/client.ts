import { signIn, signOut } from "next-auth/react";

async function createToken(user: {
  email: string;
  token: string;
}) {
  return await signIn("credentials", user);
}

async function deleteToken() {
  return await signOut();
}

export { createToken, deleteToken };
