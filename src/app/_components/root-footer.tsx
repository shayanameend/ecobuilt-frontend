"use client";

import {
  SiFacebook,
  SiInstagram,
  SiX,
  SiYoutube,
} from "@icons-pack/react-simple-icons";
import { MailIcon, MapPinIcon, PhoneIcon } from "lucide-react";
import { default as Link } from "next/link";
import { usePathname } from "next/navigation";

import { assets } from "~/assets";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { navRoutes } from "~/lib/routes";
import { cn } from "~/lib/utils";

export function RootFooter() {
  const pathname = usePathname();

  const navLinks = Object.values({
    home: {
      label: "Home",
      url: () => "/",
    },
    ...navRoutes,
  });

  const listingLinks = [
    {
      label: "Residential Building Supplies",
      url: () => "/",
    },
    {
      label: "Commercial Building Supplies",
      url: () => "/",
    },
    {
      label: "Home Systems & HVAC",
      url: () => "/",
    },
    {
      label: "Interior Essentials & Appliances",
      url: () => "/",
    },
    {
      label: "Landscape & Aggregates",
      url: () => "/",
    },
    {
      label: "Tools & Industry Supplies",
      url: () => "/",
    },
  ];

  return (
    <footer className={cn("py-16 px-24 sticky top-0 z-10 bg-muted")}>
      <div className={cn("max-w-screen-xl mx-auto flex justify-between")}>
        <div className={cn("space-y-6")}>
          <Link href="/">
            <img
              src={assets.logo.asset.src}
              alt={assets.logo.alt}
              className={cn("h-28 w-auto")}
            />
          </Link>
          <p className={cn("max-w-72 text-foreground/65 font-medium")}>
            Connect with trusted vendors and contractors to reduce waste, cut
            costs and contribute to a greener future.
          </p>
          <div className={cn("flex gap-2")}>
            <Input placeholder="me@domain.com" className={cn("w-full")} />
            <Link href={navRoutes.marketplace.url()}>
              <Button variant="default" size="sm">
                Subscribe
              </Button>
            </Link>
          </div>
        </div>
        <ul className={cn("space-y-3")}>
          <h3
            className={cn(
              "mb-6 text-foreground text-lg font-medium uppercase tracking-wider",
            )}
          >
            Our Listings
          </h3>
          {listingLinks.map((route) => (
            <li key={route.label}>
              <Link
                href={route.url()}
                className={cn(
                  "text-foreground/65 hover:text-primary transition-all duration-300",
                )}
              >
                {route.label}
              </Link>
            </li>
          ))}
        </ul>
        <ul className={cn("space-y-3")}>
          <h3
            className={cn(
              "mb-6 text-foreground text-lg font-medium uppercase tracking-wider",
            )}
          >
            Quick Links
          </h3>
          {navLinks.map((route) => (
            <li key={route.label}>
              <Link
                href={route.url()}
                className={cn(
                  "text-foreground/65 hover:text-primary transition-all duration-300",
                )}
              >
                {route.label}
              </Link>
            </li>
          ))}
        </ul>
        <ul className={cn("space-y-6")}>
          <h3
            className={cn(
              "mb-6 text-foreground text-lg font-medium uppercase tracking-wider",
            )}
          >
            Contact Us
          </h3>
          <li>
            <Link
              href="tel:801-998-2063"
              className={cn(
                "flex gap-4 items-center text-foreground/65 hover:text-primary transition-all duration-300",
              )}
            >
              <PhoneIcon className={cn("size-5 text-primary")} />
              <span>801-998-2063</span>
            </Link>
          </li>
          <li>
            <Link
              href="mailto:help@ecobuilt.com"
              className={cn(
                "flex gap-4 items-center text-foreground/65 hover:text-primary transition-all duration-300",
              )}
            >
              <MailIcon className={cn("size-5 text-primary")} />
              <span>help@ecobuilt.com</span>
            </Link>
          </li>
          <li>
            <Link
              href=""
              className={cn(
                "flex gap-4 items-center text-foreground/65 hover:text-primary transition-all duration-300",
              )}
            >
              <MapPinIcon className={cn("size-6 text-primary")} />
              <span className={cn("max-w-48")}>
                9418 S Feulner Road, West Jordan, Utah 84081
              </span>
            </Link>
          </li>
          <li>
            <ul className={cn("flex gap-4 ml-1 mt-10")}>
              <li>
                <Link href="">
                  <SiFacebook
                    className={cn(
                      "size-6 text-foreground/65 hover:text-primary transition-all duration-300",
                    )}
                  />
                </Link>
              </li>
              <li>
                <Link href="">
                  <SiInstagram
                    className={cn(
                      "size-6 text-foreground/65 hover:text-primary transition-all duration-300",
                    )}
                  />
                </Link>
              </li>
              <li>
                <Link href="">
                  <SiYoutube
                    className={cn(
                      "size-6 text-foreground/65 hover:text-primary transition-all duration-300",
                    )}
                  />
                </Link>
              </li>
              <li>
                <Link href="">
                  <SiX
                    className={cn(
                      "size-6 text-foreground/65 hover:text-primary transition-all duration-300",
                    )}
                  />
                </Link>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </footer>
  );
}
