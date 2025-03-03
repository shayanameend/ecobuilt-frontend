import NextAuth from "next-auth";

import { authConfig } from "~/auth/config";
import { authRoutes, navRoutes } from "~/lib/routes";

const { auth } = NextAuth(authConfig);

const DEFAULT_LOGIN_REDIRECT = "/";

const API_AUTH_PREFIX = "/api/auth";

const publicLinks = ["/", navRoutes.marketplace.url(), navRoutes.contact.url()];

const authLinks = Object.values(authRoutes).map((route) => route.url());

export default auth((req) => {
  const { nextUrl } = req;

  const isLoggedIn = !!req.auth;

  const isApiAuthRoute = nextUrl.pathname.startsWith(API_AUTH_PREFIX);
  const isPublicRoute = publicLinks.includes(nextUrl.pathname);
  const isAuthRoute = authLinks.includes(nextUrl.pathname);

  if (isApiAuthRoute) {
    return;
  }

  if (isAuthRoute) {
    if (isLoggedIn) {
      const callbackUrl = nextUrl.searchParams.get("callbackUrl");

      if (callbackUrl) {
        return Response.redirect(
          new URL(decodeURIComponent(callbackUrl), nextUrl),
        );
      }

      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }

    return;
  }

  if (!isLoggedIn && !isPublicRoute) {
    let callbackUrl = nextUrl.pathname;
    if (nextUrl.search) {
      callbackUrl += nextUrl.search;
    }

    const encodedCallbackUrl = encodeURIComponent(callbackUrl);

    return Response.redirect(
      new URL(
        `${authRoutes.signIn.url()}?callbackUrl=${encodedCallbackUrl}`,
        nextUrl,
      ),
    );
  }

  return;
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
