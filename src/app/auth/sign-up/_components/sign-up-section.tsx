"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { default as Link } from "next/link";
import { useForm } from "react-hook-form";
import * as zod from "zod";

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

const SignUpFormSchema = zod.object({
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

export function SignUpSection() {
  const form = useForm<zod.infer<typeof SignUpFormSchema>>({
    resolver: zodResolver(SignUpFormSchema),
    defaultValues: {
      email: "",
      password: "",
      role: "USER",
    },
  });

  const onSubmit = async (data: zod.infer<typeof SignUpFormSchema>) => {
    await signIn("credentials", data);
  };

  return (
    <div className={cn("flex-1 py-4 px-8 space-y-8 self-center")}>
      <Form {...form}>
        <div className={cn("space-y-2 text-center")}>
          <h2
            className={cn("text-black/75 text-3xl font-bold", domine.className)}
          >
            Sign Up
          </h2>
          <p className={"ml-1 text-muted-foreground text-base font-medium"}>
            Create an account to start your journey with us. Join our
            marketplace and discover the endless possibilities we offer.
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
              Sign Up
            </Button>
          </div>
          <div>
            <p
              className={cn(
                "text-muted-foreground text-center text-base font-medium",
              )}
            >
              Already have an account?{" "}
              <Link
                href={authRoutes.signIn.url()}
                className={cn("text-primary")}
              >
                Sign In
              </Link>
            </p>
          </div>
        </form>
      </Form>
    </div>
  );
}
