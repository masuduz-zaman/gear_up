"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Filter,
  Heart,
  Menu,
  Search,
  SlidersHorizontal,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

const categories = [
  "All Gear",
  "Cameras",
  "Lenses",
  "Audio",
  "Lighting",
  "Drones",
  "Accessories",
];
const gear = [
  {
    id: "sony-a7iv",
    name: "Sony A7 IV",
    category: "Cameras",
    price: 42,
    rating: 4.9,
    reviews: 128,
    badge: "Popular",
    image:
      "https://images.unsplash.com/photo-1606986628253-9a2b1d3a8a92?auto=format&fit=crop&w=800&q=85",
    description: "Full-frame mirrorless camera with 33MP sensor.",
  },
  {
    id: "canon-r5",
    name: "Canon EOS R5",
    category: "Cameras",
    price: 55,
    rating: 4.8,
    reviews: 94,
    badge: "New",
    image:
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=85",
    description: "High-resolution hybrid camera for cinematic work.",
  },
  {
    id: "sigma-24-70",
    name: "Sigma 24-70mm f/2.8",
    category: "Lenses",
    price: 28,
    rating: 4.9,
    reviews: 76,
    badge: "",
    image:
      "https://images.unsplash.com/photo-1606986628253-9a2b1d3a8a92?auto=format&fit=crop&w=800&q=85",
    description: "Versatile professional zoom lens.",
  },
  {
    id: "rode-nt1",
    name: "RØDE NT1 5th Gen",
    category: "Audio",
    price: 18,
    rating: 4.7,
    reviews: 62,
    badge: "",
    image:
      "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=800&q=85",
    description: "Studio condenser microphone with ultra-low noise.",
  },
  {
    id: "dji-mini-4",
    name: "DJI Mini 4 Pro",
    category: "Drones",
    price: 65,
    rating: 4.9,
    reviews: 51,
    badge: "Popular",
    image:
      "https://images.unsplash.com/photo-1473968512647-3e447244af8f?auto=format&fit=crop&w=800&q=85",
    description: "Lightweight 4K drone with omnidirectional sensing.",
  },
  {
    id: "aputure-600d",
    name: "Aputure 600D Pro",
    category: "Lighting",
    price: 38,
    rating: 4.8,
    reviews: 43,
    badge: "",
    image:
      "https://images.unsplash.com/photo-1589871973318-9ca1258faa55?auto=format&fit=crop&w=800&q=85",
    description: "Daylight point-source LED for powerful key light.",
  },
  {
    id: "zoom-h6",
    name: "Zoom H6 Recorder",
    category: "Audio",
    price: 22,
    rating: 4.8,
    reviews: 37,
    badge: "",
    image:
      "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=800&q=85",
    description: "Portable 6-track recorder for location sound.",
  },
  {
    id: "sony-85mm",
    name: "Sony 85mm f/1.4 GM",
    category: "Lenses",
    price: 32,
    rating: 4.9,
    reviews: 88,
    badge: "",
    image:
      "https://images.unsplash.com/photo-1512790182412-b19e6d62bc39?auto=format&fit=crop&w=800&q=85",
    description: "Portrait prime with beautiful bokeh.",
  },
];

function Logo() {
  return (
    <Link
      href="/"
      className="flex items-center gap-2 font-semibold tracking-tight text-primary"
    >
      <span className="grid size-8 place-items-center rounded-lg bg-primary text-primary-foreground text-sm">
        G
      </span>
      <span className="text-xl">GearUp</span>
    </Link>
  );
}

function FilterPanel({
  category,
  setCategory,
  availability,
  setAvailability,
  maxPrice,
  setMaxPrice,
}: {
  category: string;
  setCategory: (v: string) => void;
  availability: string;
  setAvailability: (v: string) => void;
  maxPrice: number;
  setMaxPrice: (v: number) => void;
}) {
  return (
    <div className="flex flex-col gap-7 text-sm">
      <div className="flex flex-col gap-3">
        <p className="font-semibold">Category</p>
        {categories.slice(1).map((item) => (
          <label
            key={item}
            className="flex items-center gap-3 text-muted-foreground"
          >
            <input
              type="radio"
              name="category"
              checked={category === item}
              onChange={() => setCategory(item)}
              className="accent-primary"
            />
            {item}
            <span className="ml-auto text-xs">
              {gear.filter((g) => g.category === item).length}
            </span>
          </label>
        ))}
      </div>
      <div className="flex flex-col gap-3">
        <p className="font-semibold">Availability</p>
        {["All items", "Available now", "Coming soon"].map((item) => (
          <label
            key={item}
            className="flex items-center gap-3 text-muted-foreground"
          >
            <input
              type="radio"
              name="availability"
              checked={availability === item}
              onChange={() => setAvailability(item)}
              className="accent-primary"
            />
            {item}
          </label>
        ))}
      </div>
      <div className="flex flex-col gap-3">
        <div className="flex justify-between">
          <p className="font-semibold">Daily price</p>
          <span className="text-muted-foreground">${maxPrice}</span>
        </div>
        <input
          aria-label="Maximum daily price"
          type="range"
          min="10"
          max="100"
          value={maxPrice}
          onChange={(e) => setMaxPrice(Number(e.target.value))}
          className="accent-primary"
        />
      </div>
    </div>
  );
}

export function GearMarketplace() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All Gear");
  const [availability, setAvailability] = useState("All items");
  const [maxPrice, setMaxPrice] = useState(100);
  const [sort, setSort] = useState("Recommended");
  const [liked, setLiked] = useState<string[]>([]);
  const [open, setOpen] = useState(false);
  const filtered = useMemo(
    () =>
      gear
        .filter(
          (item) =>
            (category === "All Gear" || item.category === category) &&
            item.price <= maxPrice &&
            (item.name + item.description + item.category)
              .toLowerCase()
              .includes(query.toLowerCase()),
        )
        .sort((a, b) =>
          sort === "Price: low to high"
            ? a.price - b.price
            : sort === "Price: high to low"
              ? b.price - a.price
              : b.rating - a.rating,
        ),
    [category, maxPrice, query, sort],
  );
  const reset = () => {
    setCategory("All Gear");
    setAvailability("All items");
    setMaxPrice(100);
    setQuery("");
  };
  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="border-b bg-accent/40">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 md:py-16">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-primary">
            Professional gear, without the commitment
          </p>
          <h1 className="max-w-2xl text-balance text-4xl font-semibold tracking-tight text-primary md:text-6xl">
            Make something{" "}
            <span className="text-foreground">worth remembering.</span>
          </h1>
          <p className="mt-5 max-w-xl text-pretty leading-7 text-muted-foreground">
            Rent the tools you need from a community of creators. Flexible
            pickup, transparent pricing, and gear that&apos;s ready when you
            are.
          </p>
          <div className="mt-8 flex max-w-2xl items-center gap-2 rounded-xl border bg-card p-2 shadow-sm">
            <Search className="ml-2 text-muted-foreground" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search cameras, lenses, audio..."
              className="border-0 shadow-none focus-visible:ring-0"
            />
            <Button>Search</Button>
          </div>
        </div>
      </section>
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <div className="flex gap-2 overflow-x-auto pb-2">
          {categories.map((item) => (
            <Button
              key={item}
              variant={category === item ? "default" : "outline"}
              size="sm"
              className="shrink-0 rounded-full"
              onClick={() => setCategory(item)}
            >
              {item}
            </Button>
          ))}
        </div>
        <div className="mt-7 flex items-center justify-between gap-3">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight">
              Explore gear
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              {filtered.length} items ready for your next project
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
                onChange={(e) => setSort(e.target.value)}
                className="rounded-md border bg-card px-3 py-2 text-foreground"
              >
                <option>Recommended</option>
                <option>Price: low to high</option>
                <option>Price: high to low</option>
              </select>
            </label>
          </div>
        </div>
        <div className="mt-8 grid gap-8 md:grid-cols-[200px_1fr] lg:grid-cols-[220px_1fr]">
          <aside className="hidden rounded-xl border bg-card p-5 md:block">
            <div className="mb-5 flex items-center justify-between">
              <p className="font-semibold">Filters</p>
              <button
                onClick={reset}
                className="text-xs text-primary hover:underline"
              >
                Reset
              </button>
            </div>
            <FilterPanel
              {...{
                category,
                setCategory,
                availability,
                setAvailability,
                maxPrice,
                setMaxPrice,
              }}
            />
          </aside>
          <section>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((item) => (
                <article
                  key={item.id}
                  className="group overflow-hidden rounded-xl border bg-card transition-shadow hover:shadow-md"
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    {item.badge && (
                      <Badge className="absolute left-3 top-3">
                        {item.badge}
                      </Badge>
                    )}
                    <button
                      aria-label={`Save ${item.name}`}
                      onClick={() =>
                        setLiked((prev) =>
                          prev.includes(item.id)
                            ? prev.filter((id) => id !== item.id)
                            : [...prev, item.id],
                        )
                      }
                      className="absolute right-3 top-3 grid size-9 place-items-center rounded-full bg-card/90 text-primary shadow-sm"
                    >
                      {liked.includes(item.id) ? (
                        <Heart fill="currentColor" />
                      ) : (
                        <Heart />
                      )}
                    </button>
                  </div>
                  <div className="flex flex-col gap-3 p-4">
                    <div>
                      <p className="text-xs text-muted-foreground">
                        {item.category}
                      </p>
                      <Link
                        href={`/gear/${item.id}`}
                        className="mt-1 block text-lg font-semibold hover:text-primary"
                      >
                        {item.name}
                      </Link>
                      <p className="mt-1 line-clamp-2 text-sm leading-6 text-muted-foreground">
                        {item.description}
                      </p>
                    </div>
                    <div className="flex items-end justify-between border-t pt-3">
                      <div>
                        <span className="text-lg font-semibold text-primary">
                          ${item.price}
                        </span>
                        <span className="text-sm text-muted-foreground">
                          {" "}
                          / day
                        </span>
                        <p className="mt-1 text-xs text-muted-foreground">
                          ★ {item.rating} ({item.reviews})
                        </p>
                      </div>
                      <Link
                        href={`/gear/${item.id}`}
                        className="inline-flex h-8 items-center justify-center rounded-md bg-primary px-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
                      >
                        View details
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
            {filtered.length === 0 && (
              <div className="flex min-h-64 flex-col items-center justify-center rounded-xl border border-dashed p-8 text-center">
                <Filter className="text-muted-foreground" />
                <h3 className="mt-3 font-semibold">
                  No gear matches those filters
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Try broadening your search or clearing a filter.
                </p>
                <Button variant="outline" className="mt-4" onClick={reset}>
                  Clear filters
                </Button>
              </div>
            )}
            <div className="mt-10 flex items-center justify-between border-t pt-5">
              <p className="text-sm text-muted-foreground">
                Showing {filtered.length} of {gear.length} items
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
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="left">
          <SheetHeader>
            <SheetTitle>Filters</SheetTitle>
          </SheetHeader>
          <div className="px-5 py-6">
            <FilterPanel
              {...{
                category,
                setCategory,
                availability,
                setAvailability,
                maxPrice,
                setMaxPrice,
              }}
            />
            <div className="mt-8 flex gap-2">
              <Button variant="outline" onClick={reset}>
                Reset
              </Button>
              <Button onClick={() => setOpen(false)}>Apply filters</Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </main>
  );
}

export function GearDetail({ id }: { id: string }) {
  const item = gear.find((g) => g.id === id) ?? gear[0];
  return (
    <main className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="mx-auto flex h-16 max-w-7xl items-center px-4 sm:px-6">
          <Logo />
        </div>
      </header>
      <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
        <Link href="/gear" className="text-sm text-primary hover:underline">
          ← Back to gear
        </Link>
        <div className="mt-8 grid gap-8 md:grid-cols-2">
          <img
            src={item.image}
            alt={item.name}
            className="aspect-[4/3] w-full rounded-2xl object-cover"
          />
          <div className="flex flex-col justify-center gap-5">
            <Badge className="w-fit">{item.category}</Badge>
            <h1 className="text-4xl font-semibold tracking-tight text-primary">
              {item.name}
            </h1>
            <p className="leading-7 text-muted-foreground">
              {item.description} Rent from a trusted local owner with flexible
              pickup and support throughout your booking.
            </p>
            <p>
              <span className="text-3xl font-semibold text-primary">
                ${item.price}
              </span>{" "}
              <span className="text-muted-foreground">/ day</span>
            </p>
            <Button size="lg">Reserve this gear</Button>
          </div>
        </div>
      </div>
    </main>
  );
}

export { gear };
