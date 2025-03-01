import { default as Link } from "next/link";

import { assets } from "~/assets";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { domine } from "~/lib/fonts";
import { navRoutes } from "~/lib/routes";
import { cn } from "~/lib/utils";

export function TeamSection() {
  return (
    <section
      className={cn(
        "py-24 px-24 flex flex-row gap-12 items-center justify-center",
      )}
    >
      <div className={cn("flex-1 -mt-6 py-4 px-8 space-y-8")}>
        <div className={cn("space-y-4")}>
          <Badge variant="outline">Meet Our Mission</Badge>
          <h2
            className={cn("text-black/75 text-5xl font-bold", domine.className)}
          >
            We Work For You!
          </h2>
          <p className={"ml-1 text-muted-foreground text-lg font-medium"}>
            At EcoBuilt Connect, we are committed to transforming the
            construction industry by reducing waste, fostering sustainability,
            and creating opportunities for a greener future. Our goal is to
            revolutionize the way construction materials are sourced, reused,
            and recycled.
          </p>
        </div>
        <div className={cn("space-x-4")}>
          <Link href={navRoutes.listings.url()}>
            <Button variant="default" size="lg">
              Become a Seller
            </Button>
          </Link>
        </div>
      </div>
      <div className={cn("flex-1 -m-24 py-4 px-24")}>
        <img
          src={assets.teamSectionBanner.asset.src}
          alt={assets.teamSectionBanner.alt}
          className={cn("object-cover")}
        />
      </div>
    </section>
  );
}
