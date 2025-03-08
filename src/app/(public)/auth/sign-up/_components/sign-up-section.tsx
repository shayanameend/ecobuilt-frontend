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
});

async function signUp({ email, password }: zod.infer<typeof SignUpFormSchema>) {
  const response = await axios.post(apiRoutes.auth.signUp(), {
    email,
    password,
  });

  return response.data;
}

export function SignUpSection() {
  const router = useRouter();

  const form = useForm<zod.infer<typeof SignUpFormSchema>>({
    resolver: zodResolver(SignUpFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const signUpMutation = useMutation({
    mutationFn: signUp,
    onSuccess: ({ data, info }) => {
      toast.success(info.message);

      sessionStorage.setItem("token", data.token);

      router.push(`${appRoutes.auth.verifyOtp.url()}?type=${OtpType.VERIFY}`);
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

  const onSubmit = (data: zod.infer<typeof SignUpFormSchema>) => {
    signUpMutation.mutate(data);
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
                    <Input type="password" placeholder="********" {...field} />
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
              disabled={signUpMutation.isPending}
            >
              {signUpMutation.isPending && (
                <Loader2Icon className={cn("animate-spin")} />
              )}
              <span>Sign Up</span>
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
                href={appRoutes.auth.signIn.url()}
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
