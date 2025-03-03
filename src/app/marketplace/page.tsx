import { SearchIcon } from "lucide-react";
import { default as Link } from "next/link";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "~/components/ui/pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { domine } from "~/lib/fonts";
import { cn } from "~/lib/utils";

export default function MarketplacePage() {
  return (
    <>
      <main className={cn("pt-6 pb-12 px-24 min-h-[calc(100svh_-_8rem)] flex")}>
        <aside className={cn("w-64")}>
          <nav>
            <ul />
          </nav>
        </aside>
        <section className={cn("flex-1 flex flex-col gap-4")}>
          <div className={cn("flex justify-between items-center gap-12")}>
            <div className={cn("flex-[2]")}>
              <h2 className={cn("text-4xl font-bold", domine.className)}>
                Building Supplies
              </h2>
            </div>
            <div
              className={cn(
                "flex-1 flex items-center gap-2 border border-foreground/30 rounded-lg",
              )}
            >
              <Input
                placeholder="What are you looking for?"
                className={cn(
                  "border-none focus-visible:ring-0 focus-visible:ring-offset-0",
                )}
              />
              <Button size="icon">
                <SearchIcon size={24} />
              </Button>
            </div>
          </div>
          <div
            className={cn(
              "flex justify-between items-center gap-4 text-foreground/65 text-sm font-medium",
            )}
          >
            <p>Showing 1-24 of 26620 results</p>
            <Select defaultValue="relevance">
              <SelectTrigger
                className={cn(
                  "w-32 border-none focus:ring-0 focus:ring-offset-0",
                )}
              >
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="relevance">Relevance</SelectItem>
                <SelectItem value="popularity">Popularity</SelectItem>
                <SelectItem value="latest">Latest</SelectItem>
                <SelectItem value="oldest">Oldest</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className={cn("flex-1")} />
          <Pagination className={cn("")}>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href="#" />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">1</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#" isActive>
                  2
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">3</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
              <PaginationItem>
                <PaginationNext href="#" />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </section>
      </main>
    </>
  );
}
