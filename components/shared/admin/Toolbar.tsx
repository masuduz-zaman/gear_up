"use client";

import { Search, SlidersHorizontal, X } from "lucide-react";

export default function Toolbar({
  query,
  setQuery,
  placeholder,
}: {
  query: string;
  setQuery: (v: string) => void;
  placeholder: string;
}) {
  return (
    <div className="mb-5 flex flex-col gap-3 rounded-xl border border-[#e4ebe8] bg-card p-3 sm:flex-row">
  <div className="relative flex-1">
    <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-[#9aa8a3] dark:text-slate-400" />

    <input
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      placeholder={placeholder}
      className="h-10 w-full rounded-lg bg-[#f5f8f6] pl-10 pr-10 text-sm text-[#263a34] outline-none placeholder:text-[#a2afa9] focus:ring-2 focus:ring-[#c6ded5] dark:bg-slate-800 dark:text-white dark:placeholder:text-slate-400 dark:focus:ring-slate-600"
    />

    {query && (
      <button
        onClick={() => setQuery("")}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-[#91a19a] hover:text-[#536961] dark:text-slate-400 dark:hover:text-white"
        aria-label="Clear search"
      >
        <X className="size-4" />
      </button>
    )}
  </div>
</div>

  );
}
