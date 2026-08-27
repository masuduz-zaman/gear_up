"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { Plus } from "lucide-react";

import {
  getProviderGear,
  getProviderOrders,
} from "@/lib/provider/api";

import {
  normalizeGear,
  normalizeOrders,
} from "@/lib/provider/normalize";

import type {
  Gear,
  Order,
} from "@/lib/provider/types";

import ProviderShell from "../ProviderShell";
import OverviewStats from "./OverviewStats";
import RecentGear from "./RecentGear";

export default function ProviderOverview() {
  const [gear, setGear] = useState<Gear[]>(
    [],
  );

  const [orders, setOrders] = useState<Order[]>(
    [],
  );

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState(false);

  const load = useCallback(async () => {
  setLoading(true);
  setError(false);

  try {
  const gearResponse = await getProviderGear();

    const normalizedGear =
      normalizeGear(gearResponse);

    setGear(normalizedGear);

    const orderResponse =
      await getProviderOrders();
    console.log("✅ ORDERS:", orderResponse);

    setOrders(normalizeOrders(orderResponse));
  } catch (error) {
    console.error(
      "❌ PROVIDER ERROR:",
      error,
    );

    setError(true);
  } finally {
    setLoading(false);
  }
}, []);


  useEffect(() => {
    load();
  }, [load]);

  const activeOrders = orders.filter(
    (order) =>
      [
        "CONFIRMED",
        "PAID",
        "PICKED_UP",
      ].includes(order.status),
  ).length;

  const pendingOrders = orders.filter(
    (order) =>
      order.status === "PLACED",
  ).length;

  const availableGear = gear.reduce(
    (total, item) =>
      total +
      (item.stock ?? 0),
    0,
  );

  const today = new Date().toLocaleDateString(
    "en-US",
    {
      weekday: "long",
      month: "long",
      day: "numeric",
    },
  );

  return (
    <ProviderShell title="Overview">
      <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm font-medium text-primary">
            {today}
          </p>

          <h1 className="mt-2 text-3xl font-semibold tracking-tight">
            Good morning, Provider
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
            Manage your gear, track incoming
            orders, and keep your inventory
            ready for customers.
          </p>
        </div>

        <Link
          href="/dashboard/provider/gear/new"
          className="mt-4 inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm hover:bg-primary/90 md:mt-0"
        >
          <Plus className="size-4" />
          Add Gear
        </Link>
      </div>

      {error && (
        <div className="mt-6 flex items-center justify-between rounded-xl border border-destructive/30 bg-destructive/5 p-4 text-sm text-destructive">
          <span>
            Unable to load your provider
            data.
          </span>

          <button
            type="button"
            onClick={load}
            className="font-semibold underline"
          >
            Try Again
          </button>
        </div>
      )}

      <OverviewStats
        loading={loading}
        totalGear={gear.length}
        availableGear={availableGear}
        activeOrders={activeOrders}
        pendingOrders={pendingOrders}
      />

      <RecentGear
        gear={gear}
        loading={loading}
      />
    </ProviderShell>
  );
}