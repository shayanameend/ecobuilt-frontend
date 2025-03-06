"use server";

import { signIn, signOut, update } from "~/auth";

async function createToken(user: {
  email: string;
  token: string;
}) {
  return await signIn("credentials", user);
}

async function updateToken(user: {
  email: string;
  token: string;
}) {
  return await update({ user });
}

async function deleteToken() {
  return await signOut();
}

export { createToken, updateToken, deleteToken };
