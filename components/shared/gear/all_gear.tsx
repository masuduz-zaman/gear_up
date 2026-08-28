"use client";

import { useMemo, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Filter,
  Search,
  SlidersHorizontal,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

import { Category, GearItem } from "@/lib/type";
import { GearFilters } from "./gear_filters";
import { GearCard } from "./gear_card";

interface GearMarketplaceProps {
  initialGear: GearItem[];
  categories: Category[];
}

export function GearMarketplace({
  initialGear,
  categories,
}: GearMarketplaceProps) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All Gear");
  const [availability, setAvailability] =
    useState("All items");
  const [maxPrice, setMaxPrice] = useState(100);
  const [sort, setSort] = useState("Recommended");
  const [liked, setLiked] = useState<string[]>([]);
  const [open, setOpen] = useState(false);

  const gear = initialGear ?? [];
  const categoryList = Array.isArray(categories)
    ? categories
    : [];

  const filtered = useMemo(() => {
    return gear
      .filter((item) => {
        const matchesCategory =
          category === "All Gear" ||
          item.categoryId === category;

        const matchesPrice =
          item.pricePerDay <= maxPrice;

        const searchText = (
          item.name +
          item.description +
          item.brand
        ).toLowerCase();

        const matchesSearch =
          searchText.includes(
            query.toLowerCase(),
          );

        return (
          matchesCategory &&
          matchesPrice &&
          matchesSearch
        );
      })
      .sort((a, b) => {
        if (sort === "Price: low to high") {
          return (
            a.pricePerDay -
            b.pricePerDay
          );
        }

        if (sort === "Price: high to low") {
          return (
            b.pricePerDay -
            a.pricePerDay
          );
        }

        return (
          (b._count?.reviews ?? 0) -
          (a._count?.reviews ?? 0)
        );
      });
  }, [
    gear,
    category,
    maxPrice,
    query,
    sort,
  ]);

  const reset = () => {
    setCategory("All Gear");
    setAvailability("All items");
    setMaxPrice(100);
    setQuery("");
  };

  const toggleLike = (id: string) => {
    setLiked((previous) =>
      previous.includes(id)
        ? previous.filter(
            (itemId) => itemId !== id,
          )
        : [...previous, id],
    );
  };

  const filterCategories: Category[] = [
    {
      id: "all",
      name: "All Gear",
      count: gear.length,
    },
    ...categoryList,
  ];

  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="border-b bg-accent/40">
        <div className="mx-auto max-w-4xl sm:px-6 md:py-16">
          <div className="mt-8 flex max-w-2xl items-center gap-2 rounded-xl border bg-card p-2 shadow-sm">
            <Search className="ml-2 text-muted-foreground" />

            <Input
              value={query}
              onChange={(event) =>
                setQuery(event.target.value)
              }
              placeholder="Search your gear item"
              className="border-0 shadow-none focus-visible:ring-0"
            />

            <Button type="button">
              Search
            </Button>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <div className="flex gap-2 overflow-x-auto pb-2">
          {filterCategories.map((item) => (
            <Button
              key={item.id ?? item.name}
              variant={
                category === item.name
                  ? "default"
                  : "outline"
              }
              size="sm"
              className="shrink-0 rounded-full"
              onClick={() =>
                setCategory(item.name)
              }
            >
              {item.name}
            </Button>
          ))}
        </div>

        <div className="mt-7 flex items-center justify-between gap-3">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight">
              Explore gear
            </h2>

            <p className="mt-1 text-sm text-muted-foreground">
              {filtered.length} items ready for your next
              project
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              className="gap-2 md:hidden"
              onClick={() => setOpen(true)}
            >
              <SlidersHorizontal />
              Filters
            </Button>

            <label className="hidden items-center gap-2 text-sm text-muted-foreground sm:flex">
              Sort by

              <select
                value={sort}
                onChange={(event) =>
                  setSort(event.target.value)
                }
                className="rounded-md border bg-card px-3 py-2 text-foreground"
              >
                <option>
                  Recommended
                </option>
                <option>
                  Price: low to high
                </option>
                <option>
                  Price: high to low
                </option>
              </select>
            </label>
          </div>
        </div>

        <div className="mt-8 grid gap-8 md:grid-cols-[200px_1fr] lg:grid-cols-[220px_1fr]">
          <aside className="hidden rounded-xl border bg-card p-5 md:block">
            <div className="mb-5">
              <p className="font-semibold">
                Filters
              </p>
            </div>

            <GearFilters
              categories={filterCategories}
              category={category}
              setCategory={setCategory}
              availability={availability}
              setAvailability={setAvailability}
              maxPrice={maxPrice}
              setMaxPrice={setMaxPrice}
              onReset={reset}
            />
          </aside>

          <section>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((item) => (
                <GearCard
                  key={item.id}
                  item={item}
                  liked={liked.includes(item.id)}
                  onToggleLike={toggleLike}
                />
              ))}
            </div>

            {filtered.length === 0 && (
              <div className="flex min-h-64 flex-col items-center justify-center rounded-xl border border-dashed p-8 text-center">
                <Filter className="text-muted-foreground" />

                <h3 className="mt-3 font-semibold">
                  No gear matches those filters
                </h3>

                <p className="mt-1 text-sm text-muted-foreground">
                  Try broadening your search or clearing a
                  filter.
                </p>

                <Button
                  variant="outline"
                  className="mt-4"
                  onClick={reset}
                >
                  Clear filters
                </Button>
              </div>
            )}

            <div className="mt-10 flex items-center justify-between border-t pt-5">
              <p className="text-sm text-muted-foreground">
                Showing {filtered.length} of{" "}
                {gear.length} items
              </p>

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  aria-label="Previous page"
                  disabled
                >
                  <ChevronLeft />
                </Button>

                <Button
                  variant="outline"
                  size="icon"
                  aria-label="Next page"
                  disabled
                >
                  <ChevronRight />
                </Button>
              </div>
            </div>
          </section>
        </div>
      </div>

      <Sheet
        open={open}
        onOpenChange={setOpen}
      >
        <SheetContent side="left">
          <SheetHeader>
            <SheetTitle>
              Filters
            </SheetTitle>
          </SheetHeader>

          <div className="px-5 py-6">
            <GearFilters
              categories={filterCategories}
              category={category}
              setCategory={setCategory}
              availability={availability}
              setAvailability={setAvailability}
              maxPrice={maxPrice}
              setMaxPrice={setMaxPrice}
              onReset={reset}
            />

            <Button
              className="mt-6 w-full"
              onClick={() => setOpen(false)}
            >
              Apply filters
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </main>
  );
}
