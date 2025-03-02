"use server";

import { signIn, signOut, update } from "~/auth";

async function saveToken(user: {
  email: string;
  role: "ADMIN" | "BUYER" | "SELLER";
}) {
  return await signIn("credentials", user);
}

async function updateToken(user: {
  email: string;
  role: "ADMIN" | "BUYER" | "SELLER";
}) {
  return await update({ user });
}

async function removeToken() {
  return await signOut();
}

export { saveToken, updateToken, removeToken };
