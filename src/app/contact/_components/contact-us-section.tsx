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
import { Textarea } from "~/components/ui/textarea";
import { googleMap } from "~/lib/constants";
import { domine } from "~/lib/fonts";
import { cn } from "~/lib/utils";

const ContactFormSchema = zod.object({
  name: zod
    .string({
      message: "Name is required",
    })
    .nonempty({
      message: "Name is required",
    }),
  email: zod
    .string({
      message: "Email is required",
    })
    .email({
      message: "Invalid email",
    }),
  phone: zod
    .string({
      message: "Phone is required",
    })
    .nonempty({
      message: "Phone is required",
    }),
  subject: zod
    .string({
      message: "Subject is required",
    })
    .nonempty({
      message: "Subject is required",
    }),
  message: zod
    .string({
      message: "Message is required",
    })
    .nonempty({
      message: "Message is required",
    }),
});

export function ContactUsSection() {
  const form = useForm<zod.infer<typeof ContactFormSchema>>({
    resolver: zodResolver(ContactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    },
  });

  const onSubmit = (data: zod.infer<typeof ContactFormSchema>) => {};

  return (
    <section
      className={cn(
        "py-14 px-24 min-h-[calc(100svh_-_7rem)] flex gap-12 justify-center",
      )}
    >
      <div className={cn("flex-1 py-4 px-8 space-y-12")}>
        <Form {...form}>
          <div className={cn("space-y-2 text-center")}>
            <h2
              className={cn(
                "text-black/75 text-3xl font-bold",
                domine.className,
              )}
            >
              Contact Us
            </h2>
            <p className={"ml-1 text-muted-foreground text-base font-medium"}>
              Interested in partnering with us or learning more? Contact
              EcoBuilt Connect today!
            </p>
          </div>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className={cn("space-y-6")}
          >
            <div className={cn("flex gap-2 items-start")}>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className={cn("flex-1")}>
                    <FormLabel>Your Name</FormLabel>
                    <FormControl>
                      <Input placeholder="John Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem className={cn("flex-1")}>
                    <FormLabel>Your Phone</FormLabel>
                    <FormControl>
                      <Input placeholder="123-456-7890" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className={cn("flex gap-2 items-start")}>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className={cn("flex-1")}>
                    <FormLabel>Your Email</FormLabel>
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
                name="subject"
                render={({ field }) => (
                  <FormItem className={cn("flex-1")}>
                    <FormLabel>Subject</FormLabel>
                    <FormControl>
                      <Input placeholder="Your Subject" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className={cn("flex gap-2 items-start")}>
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem className={cn("flex-1")}>
                    <FormLabel>Message</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Your Message"
                        {...field}
                        className={cn("resize-none")}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className={cn("space-x-4")}>
              <Button variant="default" size="lg" className={cn("w-full")}>
                Send Message
              </Button>
            </div>
          </form>
        </Form>
      </div>
      <div className={cn("flex-[2] my-4 mx-2 rounded-lg overflow-hidden")}>
        <iframe
          title={googleMap.title}
          width="100%"
          height="100%"
          loading="eager"
          allowFullScreen
          src={googleMap.src}
        />
      </div>
    </section>
  );
}
