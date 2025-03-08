"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { AxiosError, default as axios } from "axios";
import { Loader2Icon } from "lucide-react";
import { default as Link } from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as zod from "zod";

import { OtpType } from "~/../types";
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

const ForgotPasswordFormSchema = zod.object({
  email: zod
    .string({
      message: "Email is required",
    })
    .email({
      message: "Invalid email",
    }),
});

async function forgotPassword({
  email,
}: zod.infer<typeof ForgotPasswordFormSchema>) {
  const response = await axios.post(apiRoutes.auth.forgotPassword(), {
    email,
  });

  return response.data;
}

export function ForgotPasswordSection() {
  const router = useRouter();

  const form = useForm<zod.infer<typeof ForgotPasswordFormSchema>>({
    resolver: zodResolver(ForgotPasswordFormSchema),
    defaultValues: {
      email: "",
    },
  });

  const forgotPasswordMutation = useMutation({
    mutationFn: forgotPassword,
    onSuccess: ({ data, info }) => {
      toast.success(info.message);

      sessionStorage.setItem("token", data.token);

      router.push(`${appRoutes.auth.verifyOtp.url()}?type=${OtpType.RESET}`);
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

  const onSubmit = (data: zod.infer<typeof ForgotPasswordFormSchema>) => {
    forgotPasswordMutation.mutate(data);
  };

  return (
    <div className={cn("flex-1 py-4 px-8 space-y-8 self-center")}>
      <Form {...form}>
        <div className={cn("space-y-2 text-center")}>
          <h2
            className={cn("text-black/75 text-3xl font-bold", domine.className)}
          >
            Forgot Password
          </h2>
          <p className={"ml-1 text-muted-foreground text-base font-medium"}>
            Enter your email address and we'll send you a link to reset your
            password. You'll be back to using your account in no time.
          </p>
        </div>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className={cn("space-y-6")}
        >
          <div className={cn("flex gap-2 items-start")}>
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
          <div className={cn("space-x-4")}>
            <Button
              variant="default"
              size="lg"
              className={cn("w-full")}
              type="submit"
              disabled={forgotPasswordMutation.isPending}
            >
              {forgotPasswordMutation.isPending && (
                <Loader2Icon className={cn("animate-spin")} />
              )}
              <span>Forgot Password</span>
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
                href={appRoutes.auth.signUp.url()}
                className={cn("text-primary")}
              >
                Sign Up
              </Link>
            </p>
          </div>
        </form>
      </Form>
    </div>
  );
}
