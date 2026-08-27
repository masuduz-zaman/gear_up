"use client";

import { Search } from "lucide-react";

type GearSearchProps = {
  value: string;
  onChange: (value: string) => void;
};

export default function GearSearch({
  value,
  onChange,
}: GearSearchProps) {
  return (
    <div className="relative max-w-sm flex-1">
      <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

      <input
        value={value}
        onChange={(event) =>
          onChange(event.target.value)
        }
        placeholder="Search gear"
        className="h-11 w-full rounded-xl border border-input bg-card pl-10 pr-4 text-sm outline-none ring-primary/20 focus:ring-4"
      />
    </div>
  );
}