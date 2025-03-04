"use client";

import {
  SiFacebook,
  SiInstagram,
  SiX,
  SiYoutube,
} from "@icons-pack/react-simple-icons";
import { MailIcon, MapPinIcon, PhoneIcon } from "lucide-react";
import { default as Link } from "next/link";

import { assets } from "~/assets";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { domine } from "~/lib/fonts";
import { navRoutes } from "~/lib/routes";
import { cn } from "~/lib/utils";

export function RootFooter() {
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
    <footer>
      <div className={cn("py-16 px-24 sticky top-0 z-10 bg-muted/35")}>
        <div className={cn("max-w-screen-xl mx-auto flex justify-between")}>
          <div className={cn("flex flex-col gap-6 items-center")}>
            <Link href="/">
              <img
                src={assets.logo.asset.src}
                alt={assets.logo.alt}
                className={cn("h-28 w-auto")}
              />
            </Link>
            <p
              className={cn(
                "max-w-72 text-foreground/65 font-medium text-center",
              )}
            >
              Connect with trusted vendors and contractors to reduce waste, cut
              costs and contribute to a greener future.
            </p>
            <div className={cn("flex gap-2")}>
              <Input placeholder="john@domain.com" className={cn("w-full")} />

              <Button variant="default" size="sm">
                Subscribe
              </Button>
            </div>
          </div>
          <ul className={cn("space-y-3")}>
            <h3
              className={cn("mb-6 text-foreground text-xl font-medium", domine)}
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
              className={cn("mb-6 text-foreground text-xl font-medium", domine)}
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
            <h3 className={cn("text-foreground text-xl font-medium", domine)}>
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
                <span>+27 64 332 4533</span>
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
                <span className={cn("max-w-48")}>Goodwood, Cape Town</span>
              </Link>
            </li>
            <li>
              <ul className={cn("flex gap-4 ml-1 mt-10")}>
                <li>
                  <Link href="https://web.facebook.com/profile.php?id=61572223574195&rdid=vKHZO4gam7qHEuBX&share_url=https%3A%2F%2Fweb.facebook.com%2Fshare%2F18TaJduJCG%2F%3F_rdc%3D1%26_rdr">
                    <SiFacebook
                      className={cn(
                        "size-6 text-foreground/65 hover:text-primary transition-all duration-300",
                      )}
                    />
                  </Link>
                </li>
                <li>
                  <Link href="https://www.instagram.com/ecobuiltconnect?igsh=MXQwa2V6aGtqdG5rZA==">
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
      </div>
      <div
        className={cn(
          "px-8 py-4 bg-gradient-to-r from-sky-600 to-sky-500 text-primary-foreground",
        )}
      >
        <p className={cn("text-center text-sm")}>
          Copyright &copy; {new Date().getFullYear()} Ecobuilt. All rights
          reserved. <Link href="/privacy-policy">Privacy Policy</Link> |{" "}
          <Link href="/terms-of-service">Terms of Service</Link>
        </p>
      </div>
    </footer>
  );
}
