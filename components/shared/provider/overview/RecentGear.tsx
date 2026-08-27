"use client";

import Link from "next/link";
import { Package, Plus } from "lucide-react";

import type { Gear } from "@/lib/provider/types";
import LoadingRows from "../../LoadingRows";
import EmptyState from "../../EmptyState";
import GearList from "../gear/GearList";



type RecentGearProps = {
  gear: Gear[];
  loading: boolean;
};

export default function RecentGear({
  gear,
  loading,
}: RecentGearProps) {
  return (
    <section className="mt-8 rounded-2xl border border-border bg-card">
      <div className="flex flex-col gap-3 border-b border-border p-5 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="font-semibold">
            My Gear
          </h2>

          <p className="mt-1 text-sm text-muted-foreground">
            Manage the equipment you offer
            for rent.
          </p>
        </div>

        <Link
          href="/dashboard/provider/gear/new"
          className="inline-flex items-center gap-2 self-start text-sm font-semibold text-primary hover:underline"
        >
          <Plus className="size-4" />
          Add Gear
        </Link>
      </div>

      {loading ? (
        <div className="p-5">
          <LoadingRows />
        </div>
      ) : gear.length ? (
        <GearList
          gear={gear.slice(0, 5)}
        />
      ) : (
        <EmptyState
          icon={Package}
          title="No gear yet"
          description="Add your first item to start accepting rentals."
          href="/dashboard/provider/gear/new"
          label="Add Gear"
        />
      )}
    </section>
  );
}