import type { Metadata } from "next";
import type { PropsWithChildren } from "react";

import { MessageCircleIcon } from "lucide-react";

import { RootHeader } from "~/app/_components/root-header";
import { Button } from "~/components/ui/button";

import "~/styles/globals.css";
import { cn } from "~/lib/utils";

export const metadata: Metadata = {
  title: "EcoBuiltConnect",
};

export default function RootLayout({ children }: Readonly<PropsWithChildren>) {
  return (
    <html lang="en">
      <body>
        <RootHeader />
        {children}
        <Button
          size="icon"
          className={cn("fixed bottom-4 right-4 rounded-full")}
        >
          <MessageCircleIcon />
        </Button>
      </body>
    </html>
  );
}
