import type { Metadata } from "next";
import type { PropsWithChildren } from "react";

import { MessageCircleIcon } from "lucide-react";

import { RootFooter } from "~/app/_components/root-footer";
import { RootHeader } from "~/app/_components/root-header";
import { Button } from "~/components/ui/button";
import { openSans } from "~/lib/fonts";
import { cn } from "~/lib/utils";
import { RootProvider } from "./_components/root-provider";

import "~/styles/globals.css";

export const metadata: Metadata = {
  title: "EcoBuiltConnect",
};

export default function RootLayout({ children }: Readonly<PropsWithChildren>) {
  return (
    <html lang="en">
      <body className={cn("antialiased", openSans.className)}>
        <RootProvider>
          <RootHeader />
          {children}
          <RootFooter />
          <Button
            size="icon"
            className={cn(
              "fixed bottom-8 right-8 z-50 rounded-full size-12 [&_svg]:size-6",
            )}
          >
            <MessageCircleIcon />
          </Button>
        </RootProvider>
      </body>
    </html>
  );
}
