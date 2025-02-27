"use client";

import { SearchIcon, ShoppingCartIcon, XIcon } from "lucide-react";
import { default as Image } from "next/image";
import { default as Link } from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { assets } from "~/assets";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { authRoutes, navRoutes } from "~/lib/routes";
import { cn } from "~/lib/utils";

export function RootHeader() {
  const pathname = usePathname();

  const searchInputRef = useRef<HTMLInputElement>(null);

  const [isSearching, setIsSearching] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const navLinks = Object.values({
    home: {
      label: "Home",
      url: () => "/",
    },
    ...navRoutes,
  });

  useEffect(() => {
    if (isSearching) {
      searchInputRef.current?.focus();
    }
  }, [isSearching]);

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
            className={cn("h-20 w-auto")}
          />
        </Link>
        <Input
          onKeyUp={(event) => {
            if (event.key === "Escape") {
              setIsSearching(false);
              setSearchQuery("");
            }
          }}
          onChange={(event) => {
            setSearchQuery(event.target.value);
          }}
          value={searchQuery}
          ref={searchInputRef}
          placeholder="Search..."
          className={cn("max-w-md h-9", !isSearching && "hidden")}
        />
        <ul className={cn("flex gap-4 items-center", isSearching && "hidden")}>
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
          <Button
            onClick={() => {
              setIsSearching((prev) => !prev);
            }}
            size="icon"
            variant="ghost"
            className={cn(
              "size-10 [&_svg]:size-5",
              isSearching && "[&_svg]:size-5",
            )}
          >
            {isSearching ? <XIcon /> : <SearchIcon />}
          </Button>
          <Button
            size="icon"
            variant="ghost"
            className={cn("size-10 [&_svg]:size-5")}
          >
            <ShoppingCartIcon />
          </Button>
          <Button className={cn("ml-4")}>
            <Link href={authRoutes.signIn.url()}>
              {authRoutes.signIn.label}
            </Link>
          </Button>
        </ul>
      </nav>
    </header>
  );
}
