"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { default as Link } from "next/link";
import { useForm } from "react-hook-form";
import * as zod from "zod";

import { createToken } from "~/auth/server";
import { Button } from "~/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { domine } from "~/lib/fonts";
import { authRoutes } from "~/lib/routes";
import { cn } from "~/lib/utils";

const SignInFormSchema = zod.object({
  email: zod
    .string({
      message: "Email is required",
    })
    .email({
      message: "Invalid email",
    }),
  password: zod
    .string({
      message: "Password is required",
    })
    .nonempty({
      message: "Password is required",
    }),
  role: zod.enum(["ADMIN", "USER"], {
    message: "Invalid Role",
  }),
});

export function SignInSection() {
  const form = useForm<zod.infer<typeof SignInFormSchema>>({
    resolver: zodResolver(SignInFormSchema),
    defaultValues: {
      email: "",
      password: "",
      role: "USER",
    },
  });

  const onSubmit = async (data: zod.infer<typeof SignInFormSchema>) => {
    await createToken(data);
  };

  return (
    <section
      className={cn(
        "py-14 px-24 min-h-[calc(100svh_-_7rem)] flex gap-12 justify-center",
      )}
    >
      <div className={cn("flex-1 py-4 px-8 space-y-8 self-center")}>
        <Form {...form}>
          <div className={cn("space-y-2 text-center")}>
            <h2
              className={cn(
                "text-black/75 text-3xl font-bold",
                domine.className,
              )}
            >
              Sign In
            </h2>
            <p className={"ml-1 text-muted-foreground text-base font-medium"}>
              Welcome back! Sign in to access exclusive features and content.
              Let's get you logged in so you can continue where you left off.
            </p>
          </div>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className={cn("space-y-6")}
          >
            <div className={cn("flex gap-2 items-center")}>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className={cn("flex-1")}>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="john@domain.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className={cn("flex gap-2 items-center")}>
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className={cn("flex-1")}>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input placeholder="********" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className={cn("space-x-4")}>
              <Button variant="default" size="lg" className={cn("w-full")}>
                Sign In
              </Button>
            </div>
            <div>
              <p
                className={cn(
                  "text-muted-foreground text-center text-base font-medium",
                )}
              >
                Don't have an account?{" "}
                <Link
                  href={authRoutes.signUp.url()}
                  className={cn("text-primary")}
                >
                  Sign Up
                </Link>
              </p>
            </div>
          </form>
        </Form>
      </div>
      <div className={cn("flex-[2] my-4 mx-2 rounded-lg overflow-hidden")}>
        <iframe
          title="Karachi Map"
          width="100%"
          height="100%"
          loading="eager"
          allowFullScreen
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d28957.771190613975!2d66.98163558916015!3d24.86073427376307!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3eb33ed9687e92ff%3A0x28e36b26b2a65ba9!2sKarachi%2C%20Pakistan!5e0!3m2!1sen!2s!4v1709290441230!5m2!1sen!2s"
        />
      </div>
    </section>
  );
}
