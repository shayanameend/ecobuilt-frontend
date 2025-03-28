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
import { appRoutes } from "~/lib/routes";
import { cn } from "~/lib/utils";

export function WhatSection() {
  return (
    <section
      className={cn(
        "py-16 md:px-24 flex flex-col md:flex-row-reverse gap-12 items-center justify-center",
      )}
    >
      <div className={cn("flex-1 -mt-8 py-4 px-8 space-y-8")}>
        <div className={cn("space-y-4")}>
          <Badge variant="outline">WHAT WE OFFER</Badge>
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
          <Link href={appRoutes.nav.marketplace.url()}>
            <Button variant="default" size="lg">
            Explore Recycled Materials
            </Button>
          </Link>
        </div>
      </div>
      <div className={cn("flex-1 py-4 px-8 grid md:grid-cols-2 gap-4")}>
        <Card>
          <CardHeader className={cn("p-4")}>
            <RecycleIcon size={36} className={cn("text-primary/70")} />
          </CardHeader>
          <CardContent className={cn("space-y-2 p-4 pt-0")}>
            <CardTitle className={cn("text-lg")}>
              Sustainability First
            </CardTitle>
            <CardDescription className={cn("text-sm")}>
              We help businesses make eco-conscious decisions by giving
              discarded materials a second life.
            </CardDescription>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className={cn("p-4")}>
            <MonitorSmartphoneIcon
              size={36}
              className={cn("text-primary/70")}
            />
          </CardHeader>
          <CardContent className={cn("space-y-2 p-4 pt-0")}>
            <CardTitle className={cn("text-lg")}>
              Tech-Driven Platform
            </CardTitle>
            <CardDescription className={cn("text-sm")}>
              Our intuitive marketplace features real-time inventory updates,
              secure payments, and AI-powered recommendations.
            </CardDescription>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className={cn("p-4")}>
            <LockIcon size={36} className={cn("text-primary/70")} />
          </CardHeader>
          <CardContent className={cn("space-y-2 p-4 pt-0")}>
            <CardTitle className={cn("text-lg")}>Verified Suppliers</CardTitle>
            <CardDescription className={cn("text-sm")}>
              We use blockchain technology to verify suppliers and ensure
              transparency in every deal.
            </CardDescription>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className={cn("p-4")}>
            <CircleDollarSignIcon size={36} className={cn("text-primary/70")} />
          </CardHeader>
          <CardContent className={cn("space-y-2 p-4 pt-0")}>
            <CardTitle className={cn("text-lg")}>Cost Savings </CardTitle>
            <CardDescription className={cn("text-sm")}>
              Buyers access affordable materials, while suppliers monetize waste
              — creating a win-win ecosystem.
            </CardDescription>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
