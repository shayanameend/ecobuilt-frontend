"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { AxiosError, default as axios } from "axios";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
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
import { apiRoutes, authRoutes } from "~/lib/routes";
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

async function updatePassword({
  password,
}: zod.infer<typeof UpdatePasswordFormSchema>) {
  const response = await axios.post(
    apiRoutes.auth.updatePassword(),
    { password },
    {
      headers: {
        authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    },
  );

  return response.data;
}

export function UpdatePasswordSection() {
  const router = useRouter();

  const form = useForm<zod.infer<typeof UpdatePasswordFormSchema>>({
    resolver: zodResolver(UpdatePasswordFormSchema),
    defaultValues: {
      password: "",
    },
  });

  const updatePasswordMutation = useMutation({
    mutationFn: updatePassword,
    onSuccess: ({ info }) => {
      toast.success(info.message);

      sessionStorage.removeItem("token");

      router.push(authRoutes.signIn.url());
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

  const onSubmit = async (data: zod.infer<typeof UpdatePasswordFormSchema>) => {
    updatePasswordMutation.mutate(data);
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
          <div className={cn("flex gap-2 items-start")}>
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
