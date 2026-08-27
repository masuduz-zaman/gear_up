"use client";

import { Search } from "lucide-react";

import type { OrderStatus } from "@/lib/provider/types";

type OrderFiltersProps = {
  query: string;
  status: string;
  onQueryChange: (
    value: string,
  ) => void;
  onStatusChange: (
    value: string,
  ) => void;
};

const statuses: OrderStatus[] = [
  "PLACED",
  "CONFIRMED",
  "PAID",
  "PICKED_UP",
  "RETURNED",
  "CANCELLED",
];

export default function OrderFilters({
  query,
  status,
  onQueryChange,
  onStatusChange,
}: OrderFiltersProps) {
  return (
    <div className="mt-8 flex flex-col gap-3 md:flex-row">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

        <input
          value={query}
          onChange={(event) =>
            onQueryChange(
              event.target.value,
            )
          }
          placeholder="Search orders, customers, or gear"
          className="h-11 w-full rounded-xl border border-input bg-card pl-10 pr-4 text-sm outline-none focus:ring-4 focus:ring-primary/20"
        />
      </div>

      <select
        value={status}
        onChange={(event) =>
          onStatusChange(
            event.target.value,
          )
        }
        className="h-11 rounded-xl border border-input bg-card px-4 text-sm"
      >
        <option value="ALL">
          All statuses
        </option>

        {statuses.map((item) => (
          <option
            key={item}
            value={item}
          >
            {item.replace("_", " ")}
          </option>
        ))}
      </select>
    </div>
  );
}