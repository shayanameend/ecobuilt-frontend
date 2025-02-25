import type { Metadata } from "next";
import type { PropsWithChildren } from "react";

import "~/styles/globals.css";

export const metadata: Metadata = {
  title: "EcoBuiltConnect",
};

export default function RootLayout({ children }: Readonly<PropsWithChildren>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
