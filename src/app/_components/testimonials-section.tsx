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

export function TestimonialsSection() {
  return (
    <section
      className={cn(
        "py-8 px-24 flex flex-col gap-12 items-center justify-center",
      )}
    >
      <div className={cn("text-center space-y-4")}>
        <Badge variant="outline">Testimonials</Badge>
        <h2
          className={cn(
            "max-w-screen-sm mx-auto text-black/75 text-5xl font-bold",
            domine.className,
          )}
        >
          Hear from Our Satisfied Customers!
        </h2>
        <p
          className={
            "max-w-screen-lg mx-auto text-muted-foreground text-lg font-medium"
          }
        >
          Our clients love the convenience and savings we provide. Read their
          testimonials to see how we've helped them streamline their
          construction material purchases.
        </p>
      </div>
      <div
        className={cn(
          "max-w-screen-lg flex md:flex-row flex-wrap gap-4 justify-center items-center",
        )}
      >
        <Card className={cn("space-x-4 shadow-sm flex flex-row items-center")}>
          <CardHeader className={cn("p-2")}>
            <img
              src={assets.johnDoe.asset.src}
              alt={assets.johnDoe.alt}
              className={cn("size-24 rounded-full")}
            />
          </CardHeader>
          <CardContent className={cn("space-y-2 p-2")}>
            <CardTitle>
              <h3 className={cn("text-xl font-semibold")}>
                {assets.johnDoe.alt}
              </h3>
            </CardTitle>
            <CardDescription className={cn("max-w-64")}>
              "EcoBuilt has transformed the way we source materials. The
              platform is user-friendly and the savings are incredible!"
            </CardDescription>
          </CardContent>
        </Card>
        <Card className={cn("space-x-4 shadow-sm flex flex-row items-center")}>
          <CardHeader className={cn("p-2")}>
            <img
              src={assets.janeDoe.asset.src}
              alt={assets.janeDoe.alt}
              className={cn("size-24 rounded-full")}
            />
          </CardHeader>
          <CardContent className={cn("space-y-2 p-2")}>
            <CardTitle>
              <h3 className={cn("text-xl font-semibold")}>
                {assets.janeDoe.alt}
              </h3>
            </CardTitle>
            <CardDescription className={cn("max-w-64")}>
              "EcoBuilt has transformed the way we source materials. The
              platform is user-friendly and the savings are incredible!"
            </CardDescription>
          </CardContent>
        </Card>
        <Card className={cn("space-x-4 shadow-sm flex flex-row items-center")}>
          <CardHeader className={cn("p-2")}>
            <img
              src={assets.johnSmith.asset.src}
              alt={assets.johnSmith.alt}
              className={cn("size-24 rounded-full")}
            />
          </CardHeader>
          <CardContent className={cn("space-y-2 p-2")}>
            <CardTitle>
              <h3 className={cn("text-xl font-semibold")}>
                {assets.johnSmith.alt}
              </h3>
            </CardTitle>
            <CardDescription className={cn("max-w-64")}>
              "EcoBuilt has transformed the way we source materials. The
              platform is user-friendly and the savings are incredible!"
            </CardDescription>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
