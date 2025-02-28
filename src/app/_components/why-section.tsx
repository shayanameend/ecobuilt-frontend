import { assets } from "~/assets";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { cn } from "~/lib/utils";

export function WhySection() {
  return (
    <section
      className={cn(
        "py-4 pb-16 px-24 flex flex-row-reverse gap-12 items-center justify-center",
      )}
    >
      <div className={cn("flex-1 -mt-10 py-4 px-8 space-y-4")}>
        <div className={cn("space-y-4")}>
          <Badge variant="outline">WHY CHOOSE US</Badge>
          <h2 className={"text-black/75 text-5xl font-bold"}>
            We Work For You!
          </h2>
          <p className={"text-muted-foreground text-lg font-medium"}>
            At EcoBuilt Connect, we are committed to transforming the
            construction industry by reducing waste, fostering sustainability,
            and creating opportunities for a greener future. Our goal is to
            revolutionize the way construction materials are sourced, reused,
            and recycled.
          </p>
        </div>
        <div className={cn("space-x-4")}>
          <Button variant="default" size="lg">
            Become a Seller
          </Button>
        </div>
      </div>
      <div className={cn("flex-1 -m-24 py-4 px-36")}>
        <img
          src={assets.whySectionBanner.asset.src}
          alt={assets.whySectionBanner.alt}
          className={cn("object-cover")}
        />
      </div>
    </section>
  );
}
