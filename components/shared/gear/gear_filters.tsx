"use client";

import { Button } from "@/components/ui/button";
import { Category } from "@/lib/type";

type GearFiltersProps = {
  categories: Category[];
  category: string;
  setCategory: (value: string) => void;
  availability: string;
  setAvailability: (value: string) => void;
  maxPrice: number;
  setMaxPrice: (value: number) => void;
  onReset: () => void;
};

export function GearFilters({
  categories,
  category,
  setCategory,
  availability,
  setAvailability,
  maxPrice,
  setMaxPrice,
  onReset,
}: GearFiltersProps) {
  return (
    <div className="flex flex-col gap-7 text-sm">
      <div className="flex flex-col gap-3">
        <p className="font-semibold">Category</p>

        {categories.map((item) => (
          <label
            key={item.name}
            className="flex items-center gap-3 text-muted-foreground"
          >
            <input
              type="radio"
              name="category"
              checked={category === item.name}
              onChange={() => setCategory(item.name)}
              className="accent-primary"
            />

            {item.name}

            {item.count !== undefined && (
              <span className="ml-auto text-xs">
                {item.count}
              </span>
            )}
          </label>
        ))}
      </div>

      <div className="flex flex-col gap-3">
        <p className="font-semibold">Availability</p>

        {[
          "All items",
          "Available now",
          "Coming soon",
        ].map((item) => (
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

          <span className="text-muted-foreground">
            ${maxPrice}
          </span>
        </div>

        <input
          aria-label="Maximum daily price"
          type="range"
          min="10"
          max="100"
          value={maxPrice}
          onChange={(event) =>
            setMaxPrice(Number(event.target.value))
          }
          className="accent-primary"
        />
      </div>

      <Button
        variant="outline"
        onClick={onReset}
        type="button"
      >
        Reset filters
      </Button>
    </div>
  );
}
