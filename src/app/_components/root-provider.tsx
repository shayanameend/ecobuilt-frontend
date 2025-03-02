"use client";

import type { PropsWithChildren } from "react";

import { SessionProvider } from "next-auth/react";

export function RootProvider({ children }: Readonly<PropsWithChildren>) {
  return <SessionProvider>{children}</SessionProvider>;
}
