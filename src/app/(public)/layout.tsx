"use client";

import type { PropsWithChildren } from "react";

import { default as axios } from "axios";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

import { useMutation } from "@tanstack/react-query";
import { createToken } from "~/auth/server";
import { apiRoutes } from "~/lib/routes";

async function refresh(token: string) {
  const response = await axios.post(
    apiRoutes.auth.refreshToken(),
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return response.data;
}

export default function PublicLayout({
  children,
}: Readonly<PropsWithChildren>) {
  const { data: session } = useSession();

  const refreshMutation = useMutation({
    mutationFn: refresh,
    onSuccess: ({ data }) => {
      createToken({ access: data.token, ...data.user });
    },
  });

  useEffect(() => {
    if (session) {
      refreshMutation.mutate(session.user.access);
    }
  }, [session, refreshMutation.mutate]);

  return <>{children}</>;
}
