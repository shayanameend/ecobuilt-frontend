"use client";

import type { FormEvent } from "react";

import type { CategoryType, ProductType } from "~/../types";

import { useQuery } from "@tanstack/react-query";
import { default as axios } from "axios";
import {
  ChevronDown,
  ChevronUp,
  SearchIcon,
  PackageOpen,
  Loader2,
} from "lucide-react";
import { useState } from "react";

import { Product } from "~/app/(public)/marketplace/_components/product";
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
import { apiRoutes } from "~/lib/routes";
import { cn } from "~/lib/utils";
import { Skeleton } from "~/components/ui/skeleton";

const SORT_OPTIONS = [
  { value: "POPULARITY", label: "Popularity" },
  { value: "LATEST", label: "Latest" },
  { value: "OLDEST", label: "Oldest" },
];

export function MarketplaceSection() {
  const [categoryId, setCategory] = useState("");
  const [vendorId, setVendor] = useState("");
  const [sort, setSort] = useState(SORT_OPTIONS[0].value);
  const [name, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [minPrice, setMin] = useState("");
  const [maxPrice, setMax] = useState("");
  const [showAllCategories, setShowAllCategories] = useState(false);
  const [showAllVendors, setShowAllVendors] = useState(false);

  const toggleCategories = () => setShowAllCategories(!showAllCategories);
  const toggleVendors = () => setShowAllVendors(!showAllVendors);

  const {
    data: categoriesResponse = {
      data: {
        categories: [],
      },
    },
    isLoading: categoriesLoading,
  } = useQuery<{
    data: {
      categories: CategoryType[];
    };
  }>({
    queryKey: ["categories"],
    queryFn: async () => {
      const response = await axios.get(apiRoutes.category.root());

      return response.data;
    },
  });

  const {
    data: productsResponse = {
      data: {
        products: [],
      },
    },
    isLoading: productsLoading,
    isFetching: productsFetching,
  } = useQuery<{
    data: {
      products: ProductType[];
    };
  }>({
    queryKey: [
      "products",
      categoryId,
      vendorId,
      sort,
      name,
      minPrice,
      maxPrice,
    ],
    queryFn: async () => {
      const params = new URLSearchParams();

      if (sort) params.set("sort", sort);
      if (name) params.set("name", name);
      if (minPrice) params.set("minPrice", minPrice);
      if (maxPrice) params.set("maxPrice", maxPrice);
      if (categoryId) params.set("categoryId", categoryId);
      if (vendorId) params.set("vendorId", vendorId);

      const queryString = params.toString();

      const url = queryString
        ? `${apiRoutes.product.root()}?${queryString}`
        : apiRoutes.product.root();

      const response = await axios.get(url);

      return response.data;
    },
  });

  const limitedCategories = showAllCategories
    ? categoriesResponse.data.categories
    : categoriesResponse.data.categories.slice(0, 5);

  const handleCategoryClick = (category: string) => {
    setCategory(categoryId === category ? "" : category);
  };

  const handleVendorClick = (vendor: string) => {
    setVendor(vendorId === vendor ? "" : vendor);
  };

  const handleSearch = (event: FormEvent) => {
    event.preventDefault();
    setSearch(searchInput);
  };

  const handleSortChange = (value: string) => {
    setSort(value);
  };

  const applyPriceFilter = () => {
    setMin(minPrice);
    setMax(maxPrice);
  };

  const resetPriceFilter = () => {
    setMin("");
    setMax("");
  };

  return (
    <>
      <aside className="py-2 w-64 pr-8 hidden md:flex flex-col gap-6">
        <nav className={cn("space-y-6")}>
          <div>
            <h3 className={cn("text-base font-semibold mb-3")}>Categories</h3>
            {categoriesLoading ? (
              <div className="space-y-2">
                {[...Array(5)].map((_, index) => (
                  // biome-ignore lint/suspicious/noArrayIndexKey: <>
                  <Skeleton key={index} className="h-5 w-full" />
                ))}
              </div>
            ) : limitedCategories.length > 0 ? (
              <ul className="space-y-1.5 text-sm">
                {limitedCategories.map((cat) => (
                  <li key={cat.id}>
                    <button
                      type="button"
                      onClick={() => handleCategoryClick(cat.id)}
                      className={cn(
                        "text-muted-foreground hover:text-foreground transition-colors duration-200",
                        categoryId === cat.id && "font-bold text-foreground",
                      )}
                    >
                      {cat.name}
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-muted-foreground">
                No categories available
              </p>
            )}
            {!categoriesLoading &&
              categoriesResponse.data.categories.length > 5 && (
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
            <h3 className={cn("text-base font-semibold mb-3")}>Price</h3>
            <div className="space-y-3 -ml-2">
              <div className="flex items-center gap-2">
                <Input
                  type="number"
                  placeholder="Min"
                  className="h-8 text-sm"
                  value={minPrice}
                  onChange={(e) => setMin(e.target.value)}
                  min="0"
                  disabled={productsLoading}
                />
                <span className="text-muted-foreground">-</span>
                <Input
                  type="number"
                  placeholder="Max"
                  className="h-8 text-sm"
                  value={maxPrice}
                  onChange={(e) => setMax(e.target.value)}
                  min={minPrice || "0"}
                  disabled={productsLoading}
                />
              </div>
              <div className="flex gap-2">
                <Button
                  onClick={resetPriceFilter}
                  size="sm"
                  variant="outline"
                  className="text-xs"
                  disabled={productsLoading || (!minPrice && !maxPrice)}
                >
                  Reset
                </Button>
                <Button
                  onClick={applyPriceFilter}
                  size="sm"
                  className="text-xs flex-1"
                  disabled={productsLoading}
                >
                  Apply
                </Button>
              </div>
            </div>
          </div>
        </nav>
      </aside>
      <section className={cn("flex-1 flex flex-col gap-12")}>
        <div
          className={cn(
            "flex flex-col-reverse md:flex-row justify-between md:items-start gap-12",
          )}
        >
          <div className={cn("flex-[2]")}>
            {categoriesLoading ? (
              <Skeleton className="h-10 w-64" />
            ) : (
              <h2
                className={cn(
                  "text-3xl md:text-4xl font-bold",
                  domine.className,
                )}
              >
                {categoryId
                  ? categoriesResponse.data.categories.find(
                      (cat) => cat.id === categoryId,
                    )?.name
                  : "Marketplace"}
              </h2>
            )}
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
              disabled={productsLoading}
            />
            <Button type="submit" size="icon" disabled={productsLoading}>
              {productsFetching && !productsLoading ? (
                <Loader2 size={24} className="animate-spin" />
              ) : (
                <SearchIcon size={24} />
              )}
            </Button>
          </form>
        </div>
        <div className={cn("flex-1 space-y-4")}>
          <div
            className={cn(
              "flex justify-between items-center gap-4 text-foreground/65 text-sm font-medium",
            )}
          >
            {productsLoading ? (
              <Skeleton className="h-5 w-48" />
            ) : (
              <p>
                Showing {productsResponse.data.products.length} results
                {(minPrice || maxPrice) && (
                  <span className="ml-1">
                    {minPrice && `from $${minPrice}`}
                    {minPrice && maxPrice && " "}
                    {maxPrice && `to $${maxPrice}`}
                  </span>
                )}
              </p>
            )}
            <Select
              value={sort}
              onValueChange={handleSortChange}
              disabled={productsLoading}
            >
              <SelectTrigger
                className={cn(
                  "w-32 border-none focus:ring-0 focus:ring-offset-0",
                )}
              >
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                {SORT_OPTIONS.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          {productsLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-8">
              {[...Array(6)].map((_, index) => (
                // biome-ignore lint/suspicious/noArrayIndexKey: <>
                <div key={index} className="space-y-3">
                  <Skeleton className="h-48 w-full" />
                  <Skeleton className="h-5 w-3/4" />
                  <Skeleton className="h-4 w-1/4" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
              ))}
            </div>
          ) : productsResponse.data.products.length > 0 ? (
            <div
              className={cn(
                "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-8",
              )}
            >
              {productsResponse.data.products.map((product) => (
                <Product key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <PackageOpen className="h-16 w-16 text-muted-foreground mb-4" />
              <h3 className="text-xl font-medium mb-2">No products found</h3>
              <p className="text-muted-foreground mb-6 max-w-md">
                We couldn't find any products matching your criteria. Try
                adjusting your filters or search terms.
              </p>
              <Button
                onClick={() => {
                  setCategory("");
                  setVendor("");
                  setSearch("");
                  setSearchInput("");
                  setMin("");
                  setMax("");
                  setSort(SORT_OPTIONS[0].value);
                }}
                variant="outline"
              >
                Reset all filters
              </Button>
            </div>
          )}
          {productsFetching && !productsLoading && (
            <div className="flex justify-center py-4">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          )}
        </div>
      </section>
    </>
  );
}
