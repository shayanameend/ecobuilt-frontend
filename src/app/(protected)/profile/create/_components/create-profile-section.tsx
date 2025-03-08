"use client";

import type { ChangeEvent } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { AxiosError, default as axios } from "axios";
import { Camera } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as zod from "zod";

import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
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
import { supportedCities, supportedRoles } from "~/lib/constants";
import { domine } from "~/lib/fonts";
import { apiRoutes, appRoutes } from "~/lib/routes";
import { cn } from "~/lib/utils";

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
    picture: zod.any().refine((file) => file !== undefined, {
      message: "Picture is required",
    }),
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

async function createProfile({
  data,
  token,
}: {
  data: FormData;
  token: string;
}) {
  const response = await axios.post(apiRoutes.profile.root(), data, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
}

export function CreateProfileSection() {
  const router = useRouter();

  const [profileImage, setProfileImage] = useState<string | undefined>(
    undefined,
  );

  const { data: session } = useSession();

  const form = useForm<zod.infer<typeof CreateProfileFormSchema>>({
    resolver: zodResolver(CreateProfileFormSchema),
    defaultValues: {
      picture: undefined,
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

  const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      form.setValue("picture", file);

      const reader = new FileReader();

      reader.onload = () => {
        setProfileImage(reader.result as string);
      };

      reader.readAsDataURL(file);
    }
  };

  const createProfileMutation = useMutation({
    mutationFn: (data: FormData) =>
      createProfile({
        data,
        token: session?.user.access as string,
      }),
    onSuccess: ({ info }) => {
      toast.success(info.message);

      router.push(appRoutes.nav.root.url());
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.info.message);
      }
    },
    onSettled: () => {
      setProfileImage(undefined);

      form.reset();
    },
  });

  const onSubmit = (data: zod.infer<typeof CreateProfileFormSchema>) => {
    const formData = new FormData();

    // biome-ignore lint/complexity/noForEach: <>
    Object.entries(data).forEach(([key, value]) => {
      if (value !== undefined) {
        if (key === "picture" && value instanceof File) {
          formData.append(key, value);
        } else {
          formData.append(key, String(value));
        }
      }
    });

    createProfileMutation.mutate(formData);
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
          <div
            className={cn(
              "relative top-4 flex flex-col gap-2 items-center justify-center",
            )}
          >
            <div className="relative group">
              <Avatar className={cn("size-32 border-2 border-primary/20")}>
                <AvatarImage src={profileImage} />
                <AvatarFallback>
                  {form.watch("name")
                    ? form
                        .watch("name")
                        .split(" ")
                        .map((part) => part.charAt(0).toUpperCase())
                        .join("")
                    : "JD"}
                </AvatarFallback>
              </Avatar>

              <label
                htmlFor="profile-image-upload"
                className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 rounded-full cursor-pointer transition-opacity"
              >
                <Camera className="h-8 w-8 text-white" />
              </label>
            </div>

            <Input
              id="profile-image-upload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageUpload}
            />

            <FormField
              control={form.control}
              name="picture"
              render={({ field: { value, ...field } }) => (
                <FormItem>
                  <FormMessage className="text-center" />
                </FormItem>
              )}
            />
          </div>
          <div className={cn("flex gap-2 items-start")}>
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
            <div className={cn("flex gap-2 items-start")}>
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
          <div className={cn("flex gap-2 items-start")}>
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
              <div className={cn("flex gap-2 items-start")}>
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
              <div className={cn("flex gap-2 items-start")}>
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
              <div className={cn("flex gap-2 items-start")}>
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
              <div className={cn("flex gap-2 items-start")}>
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
