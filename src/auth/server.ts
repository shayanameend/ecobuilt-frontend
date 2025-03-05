"use server";

import { signIn, signOut, update } from "~/auth";

async function createToken(user: {
  email: string;
  role?: "SUPER ADMIN" | "ADMIN" | "USER" | "VENDOR";
}) {
  return await signIn("credentials", user);
}

async function updateToken(user: {
  email: string;
  role?: "SUPER ADMIN" | "ADMIN" | "USER" | "VENDOR";
}) {
  return await update({ user });
}

async function deleteToken() {
  return await signOut();
}

export { createToken, updateToken, deleteToken };
