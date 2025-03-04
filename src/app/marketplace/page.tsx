"use client";

import type { FormEvent } from "react";

import { ChevronDown, ChevronUp, SearchIcon } from "lucide-react";
import { default as Link } from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useState } from "react";

import {
  Product,
  categories,
  products,
  vendors,
} from "~/app/marketplace/_components/product";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
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
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentCategory = searchParams.get("category") || "";
  const currentVendor = searchParams.get("vendor") || "";
  const currentSort = searchParams.get("sort") || "relevance";
  const currentSearch = searchParams.get("search") || "";
  const currentMinPrice = searchParams.get("minPrice") || "";
  const currentMaxPrice = searchParams.get("maxPrice") || "";

  const [searchInput, setSearchInput] = useState(currentSearch);
  const [minPrice, setMinPrice] = useState(currentMinPrice);
  const [maxPrice, setMaxPrice] = useState(currentMaxPrice);
  const [showAllCategories, setShowAllCategories] = useState(false);
  const [showAllVendors, setShowAllVendors] = useState(false);

  const toggleCategories = () => setShowAllCategories(!showAllCategories);
  const toggleVendors = () => setShowAllVendors(!showAllVendors);

  const limitedCategories = showAllCategories
    ? categories
    : categories.slice(0, 5);
  const limitedVendors = showAllVendors ? vendors : vendors.slice(0, 5);

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value) {
        params.set(name, value);
      } else {
        params.delete(name);
      }
      return params.toString();
    },
    [searchParams],
  );

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams.toString());
    params.set("search", searchInput);
    params.delete("page");
    router.push(`${pathname}?${params.toString()}`);
  };

  const handleSortChange = (value: string) => {
    router.push(`${pathname}?${createQueryString("sort", value)}`);
  };

  const applyPriceFilter = () => {
    const params = new URLSearchParams(searchParams.toString());
    if (minPrice) params.set("minPrice", minPrice);
    else params.delete("minPrice");

    if (maxPrice) params.set("maxPrice", maxPrice);
    else params.delete("maxPrice");

    params.delete("page");
    router.push(`${pathname}?${params.toString()}`);
  };

  const resetPriceFilter = () => {
    setMinPrice("");
    setMaxPrice("");
    const params = new URLSearchParams(searchParams.toString());
    params.delete("minPrice");
    params.delete("maxPrice");
    params.delete("page");
    router.push(`${pathname}?${params.toString()}`);
  };

  const filteredProducts = products.filter((product) => {
    if (currentMinPrice && product.price < Number.parseFloat(currentMinPrice)) {
      return false;
    }
    if (currentMaxPrice && product.price > Number.parseFloat(currentMaxPrice)) {
      return false;
    }
    return true;
  });

  return (
    <>
      <main className={cn("pt-6 pb-12 px-24 min-h-[calc(100svh_-_8rem)] flex")}>
        <aside className="py-2 w-64 pr-8 flex flex-col gap-6 border-r border-muted">
          <nav className={cn("space-y-6")}>
            <div>
              <h3
                className={cn("text-base font-semibold mb-3", domine.className)}
              >
                Categories
              </h3>
              <ul className="space-y-1.5 text-sm">
                {limitedCategories.map((category) => (
                  <li key={category.id}>
                    <Link
                      href={`${pathname}?${createQueryString("category", currentCategory === category.id ? "" : category.id)}`}
                      className={cn(
                        "text-muted-foreground hover:text-foreground transition-colors duration-200 flex items-center gap-2",
                        currentCategory === category.id &&
                          "font-bold text-foreground",
                      )}
                    >
                      {category.name}
                    </Link>
                  </li>
                ))}
              </ul>
              {categories.length > 5 && (
                <Button
                  variant="ghost"
                  className="flex items-center gap-1 text-xs mt-2 -ml-1 p-0 px-1 h-auto text-muted-foreground hover:text-foreground"
                  onClick={toggleCategories}
                >
                  {showAllCategories ? (
                    <>
                      <span>Show Less</span>
                      <ChevronUp className="h-4 w-4 mt-0.5" />
                    </>
                  ) : (
                    <>
                      <span>Show More</span>
                      <ChevronDown className="h-4 w-4 mt-0.5" />
                    </>
                  )}
                </Button>
              )}
            </div>
            <div>
              <h3
                className={cn("text-base font-semibold mb-3", domine.className)}
              >
                Vendors
              </h3>
              <ul className="space-y-1.5 text-sm">
                {limitedVendors.map((vendor) => (
                  <li key={vendor.id}>
                    <Link
                      href={`${pathname}?${createQueryString("vendor", currentVendor === vendor.id ? "" : vendor.id)}`}
                      className={cn(
                        "text-muted-foreground hover:text-foreground transition-colors duration-200 flex items-center gap-2",
                        currentVendor === vendor.id &&
                          "font-bold text-foreground",
                      )}
                    >
                      {vendor.name}
                    </Link>
                  </li>
                ))}
              </ul>
              {vendors.length > 5 && (
                <Button
                  variant="ghost"
                  className="flex items-center gap-1 text-xs mt-2 -ml-1 p-0 px-1 h-auto text-muted-foreground hover:text-foreground"
                  onClick={toggleVendors}
                >
                  {showAllVendors ? (
                    <>
                      <span>Show Less</span>
                      <ChevronUp className="h-4 w-4 mt-0.5" />
                    </>
                  ) : (
                    <>
                      <span>Show More</span>
                      <ChevronDown className="h-4 w-4 mt-0.5" />
                    </>
                  )}
                </Button>
              )}
            </div>
            <div>
              <h3
                className={cn("text-base font-semibold mb-3", domine.className)}
              >
                Price
              </h3>
              <div className="space-y-3 -ml-2">
                <div className="flex items-center gap-2">
                  <Input
                    type="number"
                    placeholder="Min"
                    className="h-8 text-sm"
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                    min="0"
                  />
                  <span className="text-muted-foreground">-</span>
                  <Input
                    type="number"
                    placeholder="Max"
                    className="h-8 text-sm"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                    min={minPrice || "0"}
                  />
                </div>
                <div className="flex gap-2">
                  <Button
                    onClick={resetPriceFilter}
                    size="sm"
                    variant="outline"
                    className="text-xs"
                  >
                    Reset
                  </Button>
                  <Button
                    onClick={applyPriceFilter}
                    size="sm"
                    className="text-xs flex-1"
                  >
                    Apply
                  </Button>
                </div>
              </div>
            </div>
          </nav>
        </aside>
        <section className={cn("flex-1 flex flex-col gap-12")}>
          <div className={cn("flex justify-between items-start gap-12")}>
            <div className={cn("flex-[2]")}>
              <h2 className={cn("text-4xl font-bold", domine.className)}>
                Building Supplies
              </h2>
            </div>
            <form
              onSubmit={handleSearch}
              className={cn(
                "flex-1 flex items-center gap-2 border border-foreground/30 rounded-lg",
              )}
            >
              <Input
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="What are you looking for?"
                className={cn(
                  "border-none focus-visible:ring-0 focus-visible:ring-offset-0",
                )}
              />
              <Button type="submit" size="icon">
                <SearchIcon size={24} />
              </Button>
            </form>
          </div>
          <div className={cn("flex-1 space-y-4")}>
            <div
              className={cn(
                "flex justify-between items-center gap-4 text-foreground/65 text-sm font-medium",
              )}
            >
              <p>
                Showing {filteredProducts.length} results
                {(currentMinPrice || currentMaxPrice) && (
                  <span className="ml-1">
                    {currentMinPrice && `from $${currentMinPrice}`}
                    {currentMinPrice && currentMaxPrice && " "}
                    {currentMaxPrice && `to $${currentMaxPrice}`}
                  </span>
                )}
              </p>
              <Select value={currentSort} onValueChange={handleSortChange}>
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
            <div
              className={cn(
                "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-8",
              )}
            >
              {filteredProducts.map((product) => (
                <Product key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
