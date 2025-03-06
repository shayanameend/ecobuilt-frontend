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
        "py-8 pb-16 md:px-24 flex flex-col gap-12 items-center justify-center",
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
          See what builders, architects, and sustainability champions are saying
          about EcoBuilt Connect!
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
              src={assets.jackReul.asset.src}
              alt={assets.jackReul.alt}
              className={cn("size-24 rounded-full")}
            />
          </CardHeader>
          <CardContent className={cn("space-y-2 p-2")}>
            <CardTitle>
              <h3 className={cn("text-xl font-semibold")}>
                {assets.jackReul.alt}
              </h3>
            </CardTitle>
            <CardDescription className={cn("max-w-64")}>
              "Finally, a platform that makes finding quality recycled
              construction materials easy and reliable."
            </CardDescription>
          </CardContent>
        </Card>
        <Card className={cn("space-x-4 shadow-sm flex flex-row items-center")}>
          <CardHeader className={cn("p-2")}>
            <img
              src={assets.jessyIris.asset.src}
              alt={assets.jessyIris.alt}
              className={cn("size-24 rounded-full")}
            />
          </CardHeader>
          <CardContent className={cn("space-y-2 p-2")}>
            <CardTitle>
              <h3 className={cn("text-xl font-semibold")}>
                {assets.jessyIris.alt}
              </h3>
            </CardTitle>
            <CardDescription className={cn("max-w-64")}>
              "EcoBuiltConnect helped us cut material costs by 20% while staying
              eco-friendly — a game changer!"
            </CardDescription>
          </CardContent>
        </Card>
        <Card className={cn("space-x-4 shadow-sm flex flex-row items-center")}>
          <CardHeader className={cn("p-2")}>
            <img
              src={assets.markkeller.asset.src}
              alt={assets.markkeller.alt}
              className={cn("size-24 rounded-full")}
            />
          </CardHeader>
          <CardContent className={cn("space-y-2 p-2")}>
            <CardTitle>
              <h3 className={cn("text-xl font-semibold")}>
                {assets.markkeller.alt}
              </h3>
            </CardTitle>
            <CardDescription className={cn("max-w-64")}>
              "EcoBuiltConnect bridges the gap between sustainability and
              affordability!"
            </CardDescription>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
