import { ClockIcon } from "lucide-react";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { cn } from "~/lib/utils";

export function WhatSection() {
  return (
    <section
      className={cn(
        "py-16 px-24 flex flex-row gap-12 items-center justify-center",
      )}
    >
      <div className={cn("flex-1 -mt-36 py-4 px-8 space-y-4")}>
        <div className={cn("space-y-4")}>
          <Badge variant="outline">WHAT WE OFFER</Badge>
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
      <div className={cn("flex-1 py-4 px-8 grid grid-cols-2 gap-4")}>
        <Card>
          <CardHeader>
            <ClockIcon size={36} className={cn("text-primary/70")} />
          </CardHeader>
          <CardContent className={cn("space-y-2")}>
            <CardTitle>Save Time</CardTitle>
            <CardDescription>
              Stop spending hours on the phone asking for availability or price.
              Click a button and the quotes are coming your way. We saved our
              contractors 35% of shopping time.
            </CardDescription>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <ClockIcon size={36} className={cn("text-primary/70")} />
          </CardHeader>
          <CardContent className={cn("space-y-2")}>
            <CardTitle>Save Time</CardTitle>
            <CardDescription>
              Stop spending hours on the phone asking for availability or price.
              Click a button and the quotes are coming your way. We saved our
              contractors 35% of shopping time.
            </CardDescription>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <ClockIcon size={36} className={cn("text-primary/70")} />
          </CardHeader>
          <CardContent className={cn("space-y-2")}>
            <CardTitle>Save Time</CardTitle>
            <CardDescription>
              Stop spending hours on the phone asking for availability or price.
              Click a button and the quotes are coming your way. We saved our
              contractors 35% of shopping time.
            </CardDescription>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <ClockIcon size={36} className={cn("text-primary/70")} />
          </CardHeader>
          <CardContent className={cn("space-y-2")}>
            <CardTitle>Save Time</CardTitle>
            <CardDescription>
              Stop spending hours on the phone asking for availability or price.
              Click a button and the quotes are coming your way. We saved our
              contractors 35% of shopping time.
            </CardDescription>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
