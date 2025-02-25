import type { Metadata } from "next";
import type { PropsWithChildren } from "react";

import { MessageCircleIcon } from "lucide-react";

import { RootHeader } from "~/app/_components/root-header";
import { Button } from "~/components/ui/button";
import { cn } from "~/lib/utils";

import "~/styles/globals.css";

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
