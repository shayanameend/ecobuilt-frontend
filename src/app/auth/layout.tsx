import type { PropsWithChildren } from "react";

import { cn } from "~/lib/utils";

export default function AuthLayout({ children }: Readonly<PropsWithChildren>) {
  return (
    <main>
      <section
        className={cn(
          "py-14 px-24 min-h-[calc(100svh_-_7rem)] flex gap-12 justify-center",
        )}
      >
        {children}
        <div className={cn("flex-[2] my-4 mx-2 rounded-lg overflow-hidden")}>
          <iframe
            title="Karachi Map"
            width="100%"
            height="100%"
            loading="eager"
            allowFullScreen
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d28957.771190613975!2d66.98163558916015!3d24.86073427376307!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3eb33ed9687e92ff%3A0x28e36b26b2a65ba9!2sKarachi%2C%20Pakistan!5e0!3m2!1sen!2s!4v1709290441230!5m2!1sen!2s"
          />
        </div>
      </section>
    </main>
  );
}
