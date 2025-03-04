"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
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
import { cn } from "~/lib/utils";

const VerifyOtpFormSchema = zod.object({
  otp: zod
    .string({
      message: "OTP is required",
    })
    .nonempty({
      message: "OTP is required",
    })
    .length(6, {
      message: "OTP must be 6 characters long",
    }),
});

export function VerifyOtpSection() {
  const form = useForm<zod.infer<typeof VerifyOtpFormSchema>>({
    resolver: zodResolver(VerifyOtpFormSchema),
    defaultValues: {
      otp: "",
    },
  });

  const onSubmit = async (data: zod.infer<typeof VerifyOtpFormSchema>) => {
    await signIn("credentials", data);
  };

  return (
    <div className={cn("flex-1 py-4 px-8 space-y-8 self-center")}>
      <Form {...form}>
        <div className={cn("space-y-2 text-center")}>
          <h2
            className={cn("text-black/75 text-3xl font-bold", domine.className)}
          >
            Verify OTP
          </h2>
          <p className={"ml-1 text-muted-foreground text-base font-medium"}>
            We've sent a verification code to your email. Please enter the
            6-digit code below to complete the verification process.
          </p>
        </div>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className={cn("space-y-6")}
        >
          <div className={cn("flex gap-2 items-center")}>
            <FormField
              control={form.control}
              name="otp"
              render={({ field }) => (
                <FormItem className={cn("flex-1")}>
                  <FormLabel>OTP Code</FormLabel>
                  <FormControl>
                    <Input placeholder="******" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className={cn("space-x-4")}>
            <Button variant="default" size="lg" className={cn("w-full")}>
              Verify
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
