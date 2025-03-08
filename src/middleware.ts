import { default as axios } from "axios";

import { auth } from "~/auth";
import { updateToken } from "~/auth/server";
import { apiRoutes, appRoutes } from "~/lib/routes";

const DEFAULT_LOGIN_REDIRECT = "/";

const API_AUTH_PREFIX = "/api/auth";

const publicLinks = [
  appRoutes.nav.root.url(),
  appRoutes.nav.marketplace.url(),
  appRoutes.nav.vendors.url(),
  appRoutes.nav.community.url(),
  appRoutes.nav.contact.url(),
];

const authLinks = Object.values(appRoutes.auth).map((route) => route.url());

export default auth(async (req) => {
  const { nextUrl } = req;

  const isLoggedIn = !!req.auth;

  const isApiAuthRoute = nextUrl.pathname.startsWith(API_AUTH_PREFIX);
  const isPublicRoute = publicLinks.includes(nextUrl.pathname);
  const isAuthRoute = authLinks.includes(nextUrl.pathname);

  if (isApiAuthRoute) {
    return;
  }

  if (isLoggedIn) {
    const response = await axios.post(
      apiRoutes.auth.refreshToken(),
      {},
      {
        headers: {
          // biome-ignore lint/style/noNonNullAssertion: <>
          Authorization: `Bearer ${req.auth!.user.access}`,
        },
      },
    );

    const { data } = response.data;

    updateToken({ access: data.token, ...data.user });

    const status = data.user.status;
    const isProfileCreated = data.user.role !== "UNSPECIFIED";
    const isDeleted = data.user.isDeleted;

    if (
      isProfileCreated &&
      nextUrl.pathname === appRoutes.profile.create.url()
    ) {
      return Response.redirect(new URL(appRoutes.nav.root.url(), nextUrl));
    }

    if (
      !isProfileCreated &&
      nextUrl.pathname !== appRoutes.profile.create.url()
    ) {
      return Response.redirect(
        new URL(appRoutes.profile.create.url(), nextUrl),
      );
    }

    if (
      status !== "APPROVED" &&
      !isPublicRoute &&
      nextUrl.pathname !== appRoutes.profile.create.url()
    ) {
      return Response.redirect(new URL(appRoutes.nav.contact.url(), nextUrl));
    }

    if (
      isDeleted &&
      !isPublicRoute &&
      nextUrl.pathname !== appRoutes.profile.create.url()
    ) {
      return Response.redirect(new URL(appRoutes.nav.contact.url(), nextUrl));
    }
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
        `${appRoutes.auth.signIn.url()}?callbackUrl=${encodedCallbackUrl}`,
        nextUrl,
      ),
    );
  }

  return;
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
