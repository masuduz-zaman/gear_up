"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Package, Plus } from "lucide-react";

import {
  getProviderGear,
} from "@/lib/provider/api";

import {
  normalizeGear,
} from "@/lib/provider/normalize";

import type { Gear } from "@/lib/provider/types";

import ProviderShell from "../ProviderShell";
import GearList from "./GearList";
import GearSearch from "./GearSearch";
import LoadingRows from "../../LoadingRows";
import EmptyState from "../../EmptyState";


export default function ProviderGearPage() {
  const [gear, setGear] = useState<Gear[]>(
    [],
  );

  const [query, setQuery] =
    useState("");

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState(false);

  useEffect(() => {
    getProviderGear()
      .then(normalizeGear)
      .then(setGear)
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  const filteredGear = useMemo(() => {
    const search = query
      .trim()
      .toLowerCase();

    if (!search) {
      return gear;
    }

    return gear.filter((item) =>
      `${item.name} ${item.categoryId}`
        .toLowerCase()
        .includes(search),
    );
  }, [gear, query]);

  return (
    <ProviderShell title="My Gear">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight">
          My Gear
        </h1>

        <p className="mt-2 text-sm text-muted-foreground">
          Manage the equipment you offer
          for rent.
        </p>
      </div>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <GearSearch
          value={query}
          onChange={setQuery}
        />

        <Link
          href="/dashboard/provider/gear/new"
          className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-primary px-4 text-sm font-semibold text-primary-foreground"
        >
          <Plus className="size-4" />
          Add Gear
        </Link>
      </div>

      {error && (
        <div className="mt-5 rounded-xl border border-destructive/30 bg-destructive/5 p-4 text-sm text-destructive">
          Unable to load your gear.
        </div>
      )}

      <section className="mt-5 overflow-hidden rounded-2xl border border-border bg-card">
        {loading ? (
          <div className="p-5">
            <LoadingRows count={5} />
          </div>
        ) : filteredGear.length ? (
          <GearList
            gear={filteredGear}
          />
        ) : (
          <EmptyState
            icon={Package}
            title={
              query
                ? "No matching gear"
                : "No gear yet"
            }
            description={
              query
                ? "Try changing your search."
                : "Add equipment so customers can rent it."
            }
            href={
              query
                ? undefined
                : "/dashboard/provider/gear/new"
            }
            label={
              query
                ? undefined
                : "Add Gear"
            }
          />
        )}
      </section>
    </ProviderShell>
  );
}