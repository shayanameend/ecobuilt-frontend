"use server";

import { signIn, signOut, update } from "~/auth";

async function createToken(user: {
  email: string;
  role: "ADMIN" | "USER";
}) {
  return await signIn("credentials", user);
}

async function updateToken(user: {
  email: string;
  role: "ADMIN" | "USER";
}) {
  return await update({ user });
}

async function deleteToken() {
  return await signOut();
}

export { createToken, updateToken, deleteToken };
