"use client";

import { Box, ClipboardList, PackageCheck, SlidersHorizontal, Users } from "lucide-react";
import { useMemo } from "react";
import { Rental, Section } from "@/lib/type";
import Metric from "./Metric";
import Legend from "./Legend";
import RentalRows from "./RentalRows";

export default function Overview({
  onNavigate,
  rentals,
  gearCount,
  usersCount,
}: {
  onNavigate: (section: Section) => void;
  rentals: Rental[];
  gearCount: number;
  usersCount: number;
}) {
  const activeRentalsCount = useMemo(
    () => rentals.filter((r) => r.OrderStatus === "PLACED").length,
    [rentals],
  );

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-1 xl:grid-cols-3">
        <Metric
          label="Active rentals"
          value={String(activeRentalsCount)}
          detail="Currently in use"
          icon={ClipboardList}
          positive
        />

        <Metric
          label="Total gear items"
          value={String(gearCount)}
          detail="Total listed items"
          icon={Box}
        />

        <Metric
          label="Registered users"
          value={String(usersCount)}
          detail="Total registered members"
          icon={Users}
          positive
        />

      </div>

      

      <section className="rounded-xl border border-[#e4ebe8] bg-card">
        <div className="flex items-center justify-between border-b border-[#eef2f0] px-5 py-4 sm:px-6">
          <div>
            <h2 className="font-semibold">Recent rentals</h2>

            <p className="mt-1 text-xs text-[#8a9c95]">
              Latest activity from your workspace
            </p>
          </div>

          <button
            onClick={() => onNavigate("rentals")}
            className="text-xs font-semibold text-[#1f5d4f]"
          >
            See all →
          </button>
        </div>

        <RentalRows rentals={rentals} limit={3} />
      </section>
    </div>
  );
}
