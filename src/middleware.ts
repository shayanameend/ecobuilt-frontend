import { Role, UserStatus } from "~/../types";
import { auth } from "~/auth";
import { appRoutes } from "~/lib/routes";

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
    // biome-ignore lint/style/noNonNullAssertion: <>
    const user = req.auth!.user;

    const status = user.status;
    const role = user.role;
    const isDeleted = JSON.parse(
      user.isDeleted as unknown as string,
    ) as boolean;

    const isApproved = status === UserStatus.APPROVED;
    const isProfileCreated = role !== Role.UNSPECIFIED;
    const onProfileCreatePage =
      nextUrl.pathname === appRoutes.profile.create.url();

    if (isProfileCreated && onProfileCreatePage) {
      return Response.redirect(new URL(appRoutes.nav.root.url(), nextUrl));
    }

    if (!isProfileCreated && !onProfileCreatePage) {
      return Response.redirect(
        new URL(appRoutes.profile.create.url(), nextUrl),
      );
    }

    const shouldRedirectToContact =
      !isAuthRoute &&
      !isPublicRoute &&
      !onProfileCreatePage &&
      (!isApproved || isDeleted);

    if (shouldRedirectToContact) {
      return Response.redirect(new URL(appRoutes.nav.contact.url(), nextUrl));
    }

    if (isAuthRoute) {
      const callbackUrl = nextUrl.searchParams.get("callbackUrl");

      return Response.redirect(
        new URL(
          callbackUrl
            ? decodeURIComponent(callbackUrl)
            : DEFAULT_LOGIN_REDIRECT,
          nextUrl,
        ),
      );
    }

    return;
  }

  if (isAuthRoute) {
    return;
  }

  if (!isPublicRoute) {
    let callbackUrl = nextUrl.pathname;

    if (nextUrl.search) {
      callbackUrl += nextUrl.search;
    }

    return Response.redirect(
      new URL(
        `${appRoutes.auth.signIn.url()}?callbackUrl=${encodeURIComponent(callbackUrl)}`,
        nextUrl,
      ),
    );
  }

  return;
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
