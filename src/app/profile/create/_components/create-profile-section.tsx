"use client";

import { zodResolver } from "@hookform/resolvers/zod";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { Textarea } from "~/components/ui/textarea";
import { domine } from "~/lib/fonts";
import { cn } from "~/lib/utils";

const CreateProfileFormSchema = zod.object({
  fullName: zod
    .string({
      message: "Full Name is required",
    })
    .min(3, {
      message: "Full Name should be at least 3 characters",
    }),
  role: zod.enum(["ADMIN", "USER", "VENDOR"], {
    message: "Role can be either ADMIN, USER or VENDOR",
  }),
  phone: zod
    .string({
      message: "Phone is required",
    })
    .min(10, {
      message: "Phone should be at least 10 characters",
    }),
  postalCode: zod
    .string({
      message: "Postal Code is required",
    })
    .min(6, {
      message: "Postal Code should be at least 6 characters",
    }),
  city: zod
    .string({
      message: "City is required",
    })
    .min(3, {
      message: "City should be at least 3 characters",
    }),
  shippingDestination: zod
    .string({
      message: "Shipping Destination is required",
    })
    .min(10, {
      message: "Shipping Destination should be at least 10 characters",
    }),
});

export function CreateProfileSection() {
  const form = useForm<zod.infer<typeof CreateProfileFormSchema>>({
    resolver: zodResolver(CreateProfileFormSchema),
    defaultValues: {
      fullName: "",
      role: "USER",
    },
  });

  const onSubmit = async (data: zod.infer<typeof CreateProfileFormSchema>) => {
    console.log({ data });
  };

  return (
    <div className={cn("flex-1 py-4 px-8 space-y-8 self-center")}>
      <Form {...form}>
        <div className={cn("space-y-2 text-center")}>
          <h2
            className={cn("text-black/75 text-3xl font-bold", domine.className)}
          >
            Create Profile
          </h2>
          <p className={"ml-1 text-muted-foreground text-base font-medium"}>
            Set up your profile to personalize your experience. Tell us about
            yourself and get started with our platform.
          </p>
        </div>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className={cn("space-y-6")}
        >
          <div className={cn("flex gap-2 items-center")}>
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem className={cn("flex-1")}>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className={cn("flex gap-2 items-center")}>
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem className={cn("w-32")}>
                  <FormLabel>Role</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className={cn("")}>
                        <SelectValue placeholder="Select Role" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="USER">User</SelectItem>
                      <SelectItem value="VENDOR">Vendor</SelectItem>
                      <SelectItem value="ADMIN">Admin</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem className={cn("flex-1")}>
                  <FormLabel>Phone</FormLabel>
                  <FormControl>
                    <Input placeholder="1234567890" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          {form.watch("role") === "USER" && (
            <>
              <div className={cn("flex gap-2 items-center")}>
                <FormField
                  control={form.control}
                  name="postalCode"
                  render={({ field }) => (
                    <FormItem className={cn("w-32")}>
                      <FormLabel>Postal Code</FormLabel>
                      <FormControl>
                        <Input placeholder="Postal Code" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem className={cn("flex-1")}>
                      <FormLabel>City</FormLabel>
                      <FormControl>
                        <Input placeholder="City" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className={cn("flex gap-2 items-center")}>
                <FormField
                  control={form.control}
                  name="shippingDestination"
                  render={({ field }) => (
                    <FormItem className={cn("flex-1")}>
                      <FormLabel>Shipping Destination</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="1234 Main St"
                          {...field}
                          className={cn("resize-none")}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </>
          )}
          {form.watch("role") === "VENDOR" && <div />}
          {form.watch("role") === "ADMIN" && <div />}
          <div className={cn("flex gap-2 items-center")} />
          <div className={cn("space-x-4")}>
            <Button variant="default" size="lg" className={cn("w-full")}>
              Create Profile
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
