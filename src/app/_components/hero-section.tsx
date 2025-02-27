import { assets } from "~/assets";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { cn } from "~/lib/utils";

export function HeroSection() {
  return (
    <section
      className={cn(
        "py-4 px-24 min-h-[calc(100svh_-_7rem)] flex gap-12 items-center justify-center",
      )}
    >
      <div className={cn("flex-1 -mt-20 py-4 px-8 space-y-12")}>
        <div className={cn("space-y-4")}>
          <Badge variant="outline">WHO ARE WE</Badge>
          <h2 className={"text-black/75 text-5xl font-bold"}>
            Cost-effective solutions for the construction sector.
          </h2>
          <p className={"text-muted-foreground text-lg font-medium"}>
            Connect with trusted vendors and contractors to reduce waste, cut
            costs and contribute to a greener future.
          </p>
        </div>
        <div className={cn("space-x-4")}>
          <Button variant="secondary" size="lg">
            Learn More
          </Button>
          <Button variant="default" size="lg">
            Get Started
          </Button>
        </div>
      </div>
      <div className={cn("flex-1 -mt-24 py-4 px-8")}>
        <img
          src={assets.heroSectionBanner.asset.src}
          alt={assets.heroSectionBanner.alt}
          className={cn("object-cover")}
        />
      </div>
    </section>
  );
}
