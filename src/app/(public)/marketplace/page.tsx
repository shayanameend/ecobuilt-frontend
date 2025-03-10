import { cn } from "~/lib/utils";
import { MarketplaceSection } from "~/app/(public)/marketplace/_components/marketplace-section";

export default function MarketplacePage() {
  return (
    <>
      <main
        className={cn(
          "pt-6 pb-12 px-8 md:px-24 min-h-[calc(100svh_-_8rem)] flex",
        )}
      >
        <MarketplaceSection />
      </main>
    </>
  );
}
