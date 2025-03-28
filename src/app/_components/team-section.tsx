import { default as Link } from "next/link";

import { assets } from "~/assets";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { domine } from "~/lib/fonts";
import { appRoutes } from "~/lib/routes";
import { cn } from "~/lib/utils";

export function TeamSection() {
  return (
    <section
      className={cn(
        "py-24 md:px-24 flex flex-row gap-12 items-center justify-center",
      )}
    >
      <div className={cn("flex-1 -mt-6 py-4 px-8 space-y-8")}>
        <div className={cn("space-y-4")}>
          <Badge variant="outline">Meet Our Mission</Badge>
          <h2
            className={cn("text-black/75 text-5xl font-bold", domine.className)}
          >
            Sell Sustainable Materials!
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
          <Link href={appRoutes.nav.vendors.url()}>
            <Button variant="default" size="lg">
            Contribute to Waste Reduction
            </Button>
          </Link>
        </div>
      </div>
      <div className={cn("flex-1 -m-24 py-4 px-24 hidden md:block")}>
        <img
          src={assets.teamSectionBanner.asset.src}
          alt={assets.teamSectionBanner.alt}
          className={cn("object-cover")}
        />
      </div>
    </section>
  );
}
