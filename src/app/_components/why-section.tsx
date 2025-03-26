import { default as Link } from "next/link";

import { assets } from "~/assets";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { domine } from "~/lib/fonts";
import { appRoutes } from "~/lib/routes";
import { cn } from "~/lib/utils";

export function WhySection() {
  return (
    <section
      className={cn(
        "py-4 md:pb-32 md:px-24 flex flex-row-reverse gap-12 items-center justify-center",
      )}
    >
      <div className={cn("flex-1 -mt-10 py-4 px-8 space-y-8")}>
        <div className={cn("space-y-4")}>
          <Badge variant="outline">WHY CHOOSE US</Badge>
          <h2
            className={cn(
              "text-black/75 text-4xl md:text-5xl font-bold",
              domine.className,
            )}
          >
            We Work For You!
          </h2>
          <p className={"ml-1 text-muted-foreground text-lg font-medium"}>
          EcoBuilt Connect brings you a trusted marketplace for 
          recycled building materials. Our streamlined process
           and commitment to green practices ensure you get 
           the best value while supporting a more sustainable future.
          </p>
        </div>
        <div className={cn("space-x-4")}>
          <Link href={appRoutes.nav.marketplace.url()}>
            <Button variant="default" size="lg">
            Browse Recycled Materials Now
            </Button>
          </Link>
        </div>
      </div>
      <div className={cn("flex-1 -m-24 py-4 px-24 hidden md:block")}>
        <img
          src={assets.whySectionBanner.asset.src}
          alt={assets.whySectionBanner.alt}
          className={cn("object-cover")}
        />
      </div>
    </section>
  );
}
