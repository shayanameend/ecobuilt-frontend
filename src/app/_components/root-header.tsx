"use client";

import { ShoppingCartIcon } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import { default as Link } from "next/link";
import { usePathname } from "next/navigation";

import { assets } from "~/assets";
import { Button } from "~/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import { appRoutes } from "~/lib/routes";
import { cn } from "~/lib/utils";

export function RootHeader() {
  const { data: session } = useSession();

  const pathname = usePathname();

  const navLinks = [
    appRoutes.nav.root,
    appRoutes.nav.marketplace,
    appRoutes.nav.vendors,
    appRoutes.nav.community,
    appRoutes.nav.contact,
  ];

  return (
    <header className={cn("py-4 px-8 sticky top-0 z-10 bg-white")}>
      <nav
        className={cn(
          "max-w-screen-xl mx-auto flex justify-between items-center",
        )}
      >
        <Link href="/">
          <img
            src={assets.logo.asset.src}
            alt={assets.logo.alt}
            className={cn("h-16 md:h-24 w-auto")}
          />
        </Link>
        <ul className={cn("hidden md:flex gap-4 items-center")}>
          {navLinks.map((route) => (
            <li key={route.label}>
              <Link href={route.url()}>
                <Button
                  size="sm"
                  variant="ghost"
                  className={cn(
                    pathname === "/" && route.url() === "/" && "bg-accent",
                    route.url() !== "/" &&
                      pathname.startsWith(route.url()) &&
                      "bg-accent",
                  )}
                >
                  {route.label}
                </Button>
              </Link>
            </li>
          ))}
        </ul>
        <ul className={cn("flex gap-2 items-center")}>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                size="icon"
                variant="ghost"
                className={cn("size-10 [&_svg]:size-5")}
              >
                <ShoppingCartIcon />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-64">
              <h4 className="font-medium leading-none">Your Cart</h4>
              <p className="text-sm text-muted-foreground">
                No products in the cart.
              </p>
            </PopoverContent>
          </Popover>
          {session?.user ? (
            <Button
              size="sm"
              variant="secondary"
              onClick={async () => {
                await signOut();
              }}
            >
              Sign Out
            </Button>
          ) : (
            <Button className={cn("ml-4")}>
              <Link href={appRoutes.auth.signUp.url()}>Join Us</Link>
            </Button>
          )}
        </ul>
      </nav>
    </header>
  );
}
