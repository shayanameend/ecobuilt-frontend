"use client";

import type { OtpType } from "~/../types";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { AxiosError, default as axios } from "axios";
import { Loader2Icon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as zod from "zod";

import { createToken } from "~/auth/client";
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
import { apiRoutes, appRoutes } from "~/lib/routes";
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

async function verifyOtp({
  otp,
  type,
}: zod.infer<typeof VerifyOtpFormSchema> & {
  type: OtpType;
}) {
  const response = await axios.post(
    apiRoutes.auth.verifyOtp(),
    { otp, type },
    {
      headers: {
        authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    },
  );

  return response.data;
}

async function resendOTP({
  type,
}: {
  type: OtpType;
}) {
  const response = await axios.post(
    apiRoutes.auth.resendOtp(),
    { type },
    {
      headers: {
        authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    },
  );

  return response.data;
}

export function VerifyOtpSection({ type }: { type: OtpType }) {
  const router = useRouter();

  const form = useForm<zod.infer<typeof VerifyOtpFormSchema>>({
    resolver: zodResolver(VerifyOtpFormSchema),
    defaultValues: {
      otp: "",
    },
  });

  const verifyOtpMutation = useMutation({
    mutationFn: verifyOtp,
    onSuccess: ({ data, info }) => {
      toast.success(info.message);

      switch (type) {
        case "VERIFY":
          sessionStorage.removeItem("token");

          createToken({ access: data.token, ...data.user });
          break;
        case "RESET":
          router.push(appRoutes.auth.updatePassword.url());
          break;
      }
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.info.message);
      }
    },
    onSettled: () => {
      form.reset();
    },
  });

  const resendOTPMutation = useMutation({
    mutationFn: resendOTP,
    onSuccess: ({ info }) => {
      toast.success(info.message);
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.info.message);
      }
    },
    onSettled: () => {
      form.reset();
    },
  });

  const onSubmit = (data: zod.infer<typeof VerifyOtpFormSchema>) => {
    verifyOtpMutation.mutate({ ...data, type });
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
          <div className={cn("flex gap-2 items-start")}>
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
            <Button
              variant="default"
              size="lg"
              className={cn("w-full")}
              type="submit"
              disabled={verifyOtpMutation.isPending}
            >
              {verifyOtpMutation.isPending && (
                <Loader2Icon className={cn("animate-spin")} />
              )}
              <span>Verify</span>
            </Button>
          </div>
          <div>
            <p className={cn("text-sm text-center text-muted-foreground")}>
              Didn&apos;t get an OTP?{" "}
              <Button
                onClick={() => resendOTPMutation.mutate({ type })}
                type="button"
                variant="link"
                className={cn("p-0 text-inherit underline underline-offset-4")}
              >
                Resend
              </Button>
            </p>
          </div>
        </form>
      </Form>
    </div>
  );
}
