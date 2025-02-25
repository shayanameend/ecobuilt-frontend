"use client";

import { SearchIcon, ShoppingCartIcon } from "lucide-react";
import { default as Image } from "next/image";
import { default as Link } from "next/link";
import { usePathname } from "next/navigation";

import { assets } from "~/assets";
import { Button } from "~/components/ui/button";
import { authRoutes, navRoutes } from "~/lib/routes";
import { cn } from "~/lib/utils";

export function RootHeader() {
  const pathname = usePathname();

  const navLinks = Object.values(navRoutes);

  return (
    <header className={cn("py-4 px-8")}>
      <nav
        className={cn(
          "max-w-screen-xl mx-auto flex justify-between items-center",
        )}
      >
        <Link href="/">
          <Image
            src={assets.logo.src}
            alt={assets.logo.alt}
            className={cn("h-16 w-auto")}
          />
        </Link>
        <ul className={cn("flex gap-4 items-center")}>
          {navLinks.map((route) => (
            <li key={route.label}>
              <Link href={route.url()}>
                <Button
                  variant="ghost"
                  className={cn(pathname.includes(route.url()) && "bg-accent")}
                >
                  {route.label}
                </Button>
              </Link>
            </li>
          ))}
        </ul>
        <ul className={cn("flex gap-2 items-center")}>
          <Button size="icon" variant="ghost">
            <SearchIcon />
          </Button>
          <Button size="icon" variant="ghost">
            <ShoppingCartIcon />
          </Button>
          <Button size="sm">
            <Link href={authRoutes.signIn.url()}>
              {authRoutes.signIn.label}
            </Link>
          </Button>
        </ul>
      </nav>
    </header>
  );
}
