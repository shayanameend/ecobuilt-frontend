import {
  CircleDollarSignIcon,
  LockIcon,
  MonitorSmartphoneIcon,
  RecycleIcon,
} from "lucide-react";
import { default as Link } from "next/link";

import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { domine } from "~/lib/fonts";
import { navRoutes } from "~/lib/routes";
import { cn } from "~/lib/utils";

export function TestimonialsSection() {
  return (
    <section
      className={cn(
        "py-16 px-24 flex flex-row gap-12 items-center justify-center",
      )}
    >
      <div className={cn("flex-1 -mt-24 py-4 px-8 space-y-8")}>
        <div className={cn("space-y-4")}>
          <Badge variant="outline">What Our Clients Say</Badge>
          <h2
            className={cn("text-black/75 text-5xl font-bold", domine.className)}
          >
            We Make Your Construction Purchases Easier!
          </h2>
          <p className={"ml-1 text-muted-foreground text-lg font-medium"}>
            We save your time and money when buying construction materials. You
            compare, click, and buy from credible, reliable vendors in your
            area.
          </p>
        </div>
        <div className={cn("space-x-4")}>
          <Link href={navRoutes.marketplace.url()}>
            <Button variant="default" size="lg">
              Go to Marketplace
            </Button>
          </Link>
        </div>
      </div>
      <div className={cn("flex-1 py-4 px-8 grid grid-cols-2 gap-4")}>
        <Card>
          <CardHeader>
            <RecycleIcon size={36} className={cn("text-primary/70")} />
          </CardHeader>
          <CardContent className={cn("space-y-2")}>
            <CardTitle>Sustainability First</CardTitle>
            <CardDescription>
              We help businesses make eco-conscious decisions by giving
              discarded materials a second life.
            </CardDescription>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <MonitorSmartphoneIcon
              size={36}
              className={cn("text-primary/70")}
            />
          </CardHeader>
          <CardContent className={cn("space-y-2")}>
            <CardTitle>Tech-Driven Platform</CardTitle>
            <CardDescription>
              Our intuitive marketplace features real-time inventory updates,
              secure payments, and AI-powered recommendations.
            </CardDescription>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <LockIcon size={36} className={cn("text-primary/70")} />
          </CardHeader>
          <CardContent className={cn("space-y-2")}>
            <CardTitle>Verified Suppliers</CardTitle>
            <CardDescription>
              We use blockchain technology to verify suppliers and ensure
              transparency in every deal.
            </CardDescription>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CircleDollarSignIcon size={36} className={cn("text-primary/70")} />
          </CardHeader>
          <CardContent className={cn("space-y-2")}>
            <CardTitle>Cost Savings </CardTitle>
            <CardDescription>
              Buyers access affordable materials, while suppliers monetize waste
              — creating a win-win ecosystem.
            </CardDescription>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
