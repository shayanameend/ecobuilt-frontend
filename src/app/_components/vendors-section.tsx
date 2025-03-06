import { assets } from "~/assets";
import { Badge } from "~/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { domine } from "~/lib/fonts";
import { cn } from "~/lib/utils";

export function VendorsSection() {
  return (
    <section
      className={cn(
        "py-8 pb-14 md:px-24 flex flex-col gap-12 items-center justify-center",
      )}
    >
      <div className={cn("text-center space-y-4")}>
        <Badge variant="outline">Trusted Vendors</Badge>
        <h2
          className={cn(
            "max-w-screen-sm mx-auto text-black/75 text-5xl font-bold",
            domine.className,
          )}
        >
          Meet Our Trusted Vendors!
        </h2>
        <p
          className={
            "max-w-screen-lg mx-auto text-muted-foreground text-lg font-medium"
          }
        >
          Our vendors are carefully selected to ensure the highest quality and
          reliability. Read their testimonials to see how they contribute to our
          success.
        </p>
      </div>
      <div
        className={cn(
          "flex md:flex-row gap-4 flex-wrap justify-center items-center",
        )}
      >
        <Card className={cn("space-x-4 shadow-sm flex flex-row items-center")}>
          <CardHeader className={cn("p-2")}>
            <img
              src={assets.jackReul.asset.src}
              alt={assets.jackReul.alt}
              className={cn("size-16 rounded-full")}
            />
          </CardHeader>
          <CardContent className={cn("space-y-2 p-2")}>
            <CardTitle>
              <h3 className={cn("text-base font-normal")}>
                {assets.jackReul.alt}
              </h3>
            </CardTitle>
            <CardDescription className={cn("max-w-64 text-xs")}>
              "EcoBuilt has transformed the way we source materials.
            </CardDescription>
          </CardContent>
        </Card>
        <Card className={cn("space-x-4 shadow-sm flex flex-row items-center")}>
          <CardHeader className={cn("p-2")}>
            <img
              src={assets.jessyIris.asset.src}
              alt={assets.jessyIris.alt}
              className={cn("size-16 rounded-full")}
            />
          </CardHeader>
          <CardContent className={cn("space-y-2 p-2")}>
            <CardTitle>
              <h3 className={cn("text-base font-normal")}>
                {assets.jessyIris.alt}
              </h3>
            </CardTitle>
            <CardDescription className={cn("max-w-64 text-xs")}>
              "EcoBuilt has transformed the way we source materials.
            </CardDescription>
          </CardContent>
        </Card>
        <Card className={cn("space-x-4 shadow-sm flex flex-row items-center")}>
          <CardHeader className={cn("p-2")}>
            <img
              src={assets.markkeller.asset.src}
              alt={assets.markkeller.alt}
              className={cn("size-16 rounded-full")}
            />
          </CardHeader>
          <CardContent className={cn("space-y-2 p-2")}>
            <CardTitle>
              <h3 className={cn("text-base font-normal")}>
                {assets.markkeller.alt}
              </h3>
            </CardTitle>
            <CardDescription className={cn("max-w-64 text-xs")}>
              "EcoBuilt has transformed the way we source materials.
            </CardDescription>
          </CardContent>
        </Card>
        <Card className={cn("space-x-4 shadow-sm flex flex-row items-center")}>
          <CardHeader className={cn("p-2")}>
            <img
              src={assets.jackReul.asset.src}
              alt={assets.jackReul.alt}
              className={cn("size-16 rounded-full")}
            />
          </CardHeader>
          <CardContent className={cn("space-y-2 p-2")}>
            <CardTitle>
              <h3 className={cn("text-base font-normal")}>
                {assets.jackReul.alt}
              </h3>
            </CardTitle>
            <CardDescription className={cn("max-w-64 text-xs")}>
              "EcoBuilt has transformed the way we source materials.
            </CardDescription>
          </CardContent>
        </Card>
        <Card className={cn("space-x-4 shadow-sm flex flex-row items-center")}>
          <CardHeader className={cn("p-2")}>
            <img
              src={assets.jessyIris.asset.src}
              alt={assets.jessyIris.alt}
              className={cn("size-16 rounded-full")}
            />
          </CardHeader>
          <CardContent className={cn("space-y-2 p-2")}>
            <CardTitle>
              <h3 className={cn("text-base font-normal")}>
                {assets.jessyIris.alt}
              </h3>
            </CardTitle>
            <CardDescription className={cn("max-w-64 text-xs")}>
              "EcoBuilt has transformed the way we source materials.
            </CardDescription>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
