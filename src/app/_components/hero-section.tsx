import { default as Link } from "next/link";

import { assets } from "~/assets";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { domine } from "~/lib/fonts";
import { appRoutes } from "~/lib/routes";
import { cn } from "~/lib/utils";

export function HeroSection() {
  return (
    <section
      className={cn(
        "py-4 md:px-24 min-h-[calc(100svh_-_7rem)] flex gap-12 items-center justify-center",
      )}
    >
      <div className={cn("flex-1 -mt-16 md:-mt-20 py-4 px-8 space-y-12")}>
        <div className={cn("space-y-4")}>
          <Badge variant="outline" className={cn("ml-1")}>
            WHO WE ARE
          </Badge>
          <h2
            className={cn(
              "text-black/75 text-5xl md:text-6xl font-bold",
              domine.className,
            )}
          >
            Cost-effective solutions for the construction sector.
          </h2>
          <p className={"ml-1 text-muted-foreground text-lg font-medium"}>
            Connect with trusted vendors and contractors to reduce waste, cut
            costs and contribute to a greener future.
          </p>
        </div>
        <div className={cn("space-x-4")}>
          <Link href={"/"}>
            <Button variant="secondary" size="lg">
              Learn More
            </Button>
          </Link>
          <Link href={appRoutes.nav.marketplace.url()}>
            <Button variant="default" size="lg">
              Get Started
            </Button>
          </Link>
        </div>
      </div>
      <div className={cn("flex-1 -mt-24 py-4 px-2 hidden md:block")}>
        <img
          src={assets.heroSectionBanner.asset.src}
          alt={assets.heroSectionBanner.alt}
          className={cn("object-cover")}
        />
      </div>
    </section>
  );
}
