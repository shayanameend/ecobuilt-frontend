import { default as Image } from "next/image";

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
      <div className={cn("flex-1 -mt-48 py-4 px-8 space-y-4")}>
        <div className={cn("space-y-4")}>
          <Badge variant="outline">WHY CHOOSE US</Badge>
          <h2 className={"text-black/75 text-5xl font-bold"}>
            We Work For You!
          </h2>
          <p className={"text-muted-foreground text-lg font-medium"}>
            We save your time and money when buying construction materials. You
            compare, click, and buy from credible, reliable vendors in your
            area.
          </p>
        </div>
        <div className={cn("space-x-4")}>
          <Button variant="default" size="lg">
            Go to Marketplace
          </Button>
        </div>
      </div>
      <div className={cn("flex-1 -m-24 py-4 px-8")}>
        <Image
          src={assets.workSectionBanner.src}
          alt={assets.workSectionBanner.alt}
          className={cn("object-cover")}
        />
      </div>
    </section>
  );
}
