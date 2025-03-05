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

const supportedRoles: [string, ...string[]] = ["ADMIN", "USER", "VENDOR"];
const supportedCities: [string, ...string[]] = [
  "Cape Town",
  "Durban",
  "Johannesburg",
  "Pretoria",
  "Port Elizabeth",
];

const CreateProfileFormSchema = zod
  .object({
    name: zod
      .string({
        message: "Name is required",
      })
      .min(3, {
        message: "Name should be at least 3 characters",
      }),
    description: zod.string().optional(),
    role: zod.enum(supportedRoles, {
      message: "Invalid Role",
    }),
    phone: zod
      .string({
        message: "Phone is required",
      })
      .min(10, {
        message: "Phone should be at least 10 characters",
      }),
    postalCode: zod.string().optional(),
    city: zod.string().optional(),
    deliveryAddress: zod.string().optional(),
    pickupAddress: zod.string().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.role === "USER") {
      if (!data.postalCode || data.postalCode.length < 6) {
        ctx.addIssue({
          code: "custom",
          message: "Postal Code should be at least 6 characters",
          path: ["postalCode"],
        });
      }

      if (!data.city || !supportedCities.includes(data.city)) {
        ctx.addIssue({
          code: "custom",
          message: "Please select a valid city",
          path: ["city"],
        });
      }

      if (!data.deliveryAddress || data.deliveryAddress.length < 10) {
        ctx.addIssue({
          code: "custom",
          message: "Delivery Address should be at least 10 characters",
          path: ["deliveryAddress"],
        });
      }
    }

    if (data.role === "VENDOR") {
      if (!data.description || data.description.length < 10) {
        ctx.addIssue({
          code: "custom",
          message: "Description should be at least 10 characters",
          path: ["description"],
        });
      }

      if (!data.postalCode || data.postalCode.length < 6) {
        ctx.addIssue({
          code: "custom",
          message: "Postal Code should be at least 6 characters",
          path: ["postalCode"],
        });
      }

      if (!data.city || !supportedCities.includes(data.city)) {
        ctx.addIssue({
          code: "custom",
          message: "Please select a valid city",
          path: ["city"],
        });
      }

      if (!data.pickupAddress || data.pickupAddress.length < 10) {
        ctx.addIssue({
          code: "custom",
          message: "Pickup Address should be at least 10 characters",
          path: ["pickupAddress"],
        });
      }
    }
  });

export function CreateProfileSection() {
  const form = useForm<zod.infer<typeof CreateProfileFormSchema>>({
    resolver: zodResolver(CreateProfileFormSchema),
    defaultValues: {
      name: "",
      description: "",
      role: "USER",
      phone: "",
      postalCode: "",
      city: "",
      deliveryAddress: "",
      pickupAddress: "",
    },
    mode: "onChange",
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
              name="name"
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
          {form.watch("role") === "VENDOR" && (
            <div className={cn("flex gap-2 items-center")}>
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem className={cn("flex-1")}>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Tell us about yourself"
                        {...field}
                        className={cn("resize-none")}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          )}
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
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className={cn("")}>
                            <SelectValue placeholder="Select City" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {supportedCities.map((city) => (
                            <SelectItem key={city} value={city}>
                              {city}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className={cn("flex gap-2 items-center")}>
                <FormField
                  control={form.control}
                  name="deliveryAddress"
                  render={({ field }) => (
                    <FormItem className={cn("flex-1")}>
                      <FormLabel>Delivery Address</FormLabel>
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
          {form.watch("role") === "VENDOR" && (
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
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className={cn("")}>
                            <SelectValue placeholder="Select City" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {supportedCities.map((city) => (
                            <SelectItem key={city} value={city}>
                              {city}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className={cn("flex gap-2 items-center")}>
                <FormField
                  control={form.control}
                  name="pickupAddress"
                  render={({ field }) => (
                    <FormItem className={cn("flex-1")}>
                      <FormLabel>Pickup Address</FormLabel>
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
