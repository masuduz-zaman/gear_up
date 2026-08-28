"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  CalendarDays,
  Package,
  UserRound,
} from "lucide-react";


import { StatusBadge } from "./StatusBadge";
import { getRentalById } from "@/service/rental.service";

type Rental = Awaited<ReturnType<typeof getRentalById>>;

type Props = {
  rentalId: string;
};

function formatDate(date: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date(date));
}

export function RentalDetails({
  rentalId,
}: Props) {
  const [rental, setRental] =
    useState<Rental | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState<string | null>(null);

  useEffect(() => {
    async function loadRental() {
      try {
        setLoading(true);
        setError(null);

        const data =
          await getRentalById(rentalId);

        setRental(data);
      } catch (error) {
        setError(
          error instanceof Error
            ? error.message
            : "Failed to load rental"
        );
      } finally {
        setLoading(false);
      }
    }

    loadRental();
  }, [rentalId]);

  if (loading) {
    return (
      <main className="mx-auto max-w-4xl px-5 py-8">
        <div className="h-10 w-64 animate-pulse rounded-lg bg-muted" />

        <div className="mt-6 h-96 animate-pulse rounded-2xl bg-muted" />
      </main>
    );
  }

  if (error) {
    return (
      <main className="mx-auto max-w-4xl px-5 py-8">
        <div className="rounded-2xl border border-border bg-card p-8 text-center">
          <h1 className="font-semibold">
            Unable to load rental
          </h1>

          <p className="mt-2 text-sm text-muted-foreground">
            {error}
          </p>

          <Link
            href="/dashboard/customer/rentals"
            className="mt-5 inline-flex rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground"
          >
            Back to rentals
          </Link>
        </div>
      </main>
    );
  }

  if (!rental) {
    return (
      <main className="mx-auto max-w-4xl px-5 py-8">
        <p>Rental not found.</p>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-4xl px-5 py-8 md:py-10">
      <Link
        href="/dashboard/customer/rentals"
        className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft size={16} />
        Back to rentals
      </Link>

      <div className="mt-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
        <div>
          <p className="text-sm text-muted-foreground">
            Rental #{rental.id}
          </p>

          <h1 className="mt-1 text-3xl font-semibold tracking-tight">
            {rental.gearItem.name}
          </h1>

          <p className="mt-2 text-sm text-muted-foreground">
            {rental.gearItem.brand}
          </p>
        </div>

        <StatusBadge
          status={rental.OrderStatus}
        />
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl border border-border bg-card p-6">
          <div className="flex items-center gap-3">
            <span className="grid size-10 place-items-center rounded-xl bg-accent text-primary">
              <CalendarDays size={19} />
            </span>

            <div>
              <p className="text-sm text-muted-foreground">
                Rental period
              </p>

              <p className="mt-1 font-semibold">
                {formatDate(rental.startDate)}
              </p>

              <p className="text-sm text-muted-foreground">
                to {formatDate(rental.endDate)}
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-card p-6">
          <div className="flex items-center gap-3">
            <span className="grid size-10 place-items-center rounded-xl bg-accent text-primary">
              <Package size={19} />
            </span>

            <div>
              <p className="text-sm text-muted-foreground">
                Total amount
              </p>

              <p className="mt-1 text-xl font-semibold">
                ${rental.totalPrice}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 rounded-2xl border border-border bg-card p-6">
        <div className="flex items-center gap-3">
          <span className="grid size-10 place-items-center rounded-xl bg-accent text-primary">
            <UserRound size={19} />
          </span>

          <div>
            <p className="text-sm text-muted-foreground">
              Provider
            </p>

            <p className="mt-1 font-semibold">
              {rental.gearItem.provider.name}
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}