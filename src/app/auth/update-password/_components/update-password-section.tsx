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

const UpdatePasswordFormSchema = zod.object({
  password: zod
    .string({
      message: "Password is required",
    })
    .min(8, {
      message: "Password must be at least 8 characters",
    })
    .max(32, {
      message: "Password must not exceed 32 characters",
    }),
});

export function UpdatePasswordSection() {
  const form = useForm<zod.infer<typeof UpdatePasswordFormSchema>>({
    resolver: zodResolver(UpdatePasswordFormSchema),
    defaultValues: {
      password: "",
    },
  });

  const onSubmit = async (data: zod.infer<typeof UpdatePasswordFormSchema>) => {
    await signIn("credentials", data);
  };

  return (
    <div className={cn("flex-1 py-4 px-8 space-y-8 self-center")}>
      <Form {...form}>
        <div className={cn("space-y-2 text-center")}>
          <h2
            className={cn("text-black/75 text-3xl font-bold", domine.className)}
          >
            Update Password
          </h2>
          <p className={"ml-1 text-muted-foreground text-base font-medium"}>
            Enter your new password to update your account. Make sure to choose
            a strong password that you haven't used before.
          </p>
        </div>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className={cn("space-y-6")}
        >
          <div className={cn("flex gap-2 items-center")}>
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className={cn("flex-1")}>
                  <FormLabel>New Password</FormLabel>
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
              Update Password
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
