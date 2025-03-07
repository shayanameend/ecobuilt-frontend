"use server";

import { signIn, signOut, update } from "~/auth";

import type { DecodedUser } from "../../types";

async function createToken(user: DecodedUser) {
  return await signIn("credentials", user);
}

async function updateToken(user: DecodedUser) {
  return await update({ user });
}

async function deleteToken() {
  return await signOut();
}

export { createToken, updateToken, deleteToken };
