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
import { apiRoutes, authRoutes } from "~/lib/routes";
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
});

async function signIn({ email, password }: zod.infer<typeof SignInFormSchema>) {
  const response = await axios.post(apiRoutes.auth.signIn(), {
    email,
    password,
  });

  return response.data;
}

export function SignInSection() {
  const router = useRouter();

  const form = useForm<zod.infer<typeof SignInFormSchema>>({
    resolver: zodResolver(SignInFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const signInMutation = useMutation({
    mutationFn: signIn,
    onSuccess: ({ data, info }) => {
      toast.success(info.message);

      switch (info.message) {
        case "OTP Sent Successfully!":
          sessionStorage.setItem("token", data.token);

          router.push(
            `${authRoutes.verifyOtp.url()}?email=${form.getValues("email")}&type=VERIFY_EMAIL`,
          );
          break;
        case "Sign In Successfull!":
          sessionStorage.removeItem("token");

          createToken({ email: form.getValues("email"), token: data.token });
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

  const onSubmit = (data: zod.infer<typeof SignInFormSchema>) => {
    signInMutation.mutate(data);
  };

  return (
    <div className={cn("flex-1 py-4 px-8 space-y-8 self-center")}>
      <Form {...form}>
        <div className={cn("space-y-2 text-center")}>
          <h2
            className={cn("text-black/75 text-3xl font-bold", domine.className)}
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
          <div className={cn("flex gap-2 items-start")}>
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
            <Button
              variant="default"
              size="lg"
              className={cn("w-full")}
              type="submit"
              disabled={signInMutation.isPending}
            >
              {signInMutation.isPending && (
                <Loader2Icon className={cn("animate-spin")} />
              )}
              <span>Sign In</span>
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
  );
}
