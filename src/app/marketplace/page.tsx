"use client";

import { Suspense } from "react";
import { cn } from "~/lib/utils";
import { MarketplaceSection } from "./_components/marketplace-section";

export default function MarketplacePage() {
  return (
    <>
      <main className={cn("pt-6 pb-12 px-24 min-h-[calc(100svh_-_8rem)] flex")}>
        <Suspense fallback={<p>Loading marketplace items...</p>}>
          <MarketplaceSection />
        </Suspense>
      </main>
    </>
  );
}
