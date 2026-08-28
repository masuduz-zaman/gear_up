"use client";

import Link from "next/link";

import { StatusBadge } from "./StatusBadge";
import { Rental } from "@/lib/customer";

type Props = {
  rentals: Rental[];
};

function formatDate(date: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  }).format(new Date(date));
}

export function RecentRentals({
  rentals,
}: Props) {
  return (
    <section className="mt-8">
      <div className="flex items-end justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold tracking-tight">
            Recent rentals
          </h2>

          <p className="mt-1 text-sm text-muted-foreground">
            Your latest rental activity.
          </p>
        </div>

        <Link
          href="/dashboard/customer/rentals"
          className="hidden text-sm font-semibold text-primary hover:underline sm:block"
        >
          View all
        </Link>
      </div>

      <div className="mt-4 overflow-hidden rounded-2xl border border-border bg-card">
        <div className="hidden grid-cols-[1.5fr_0.9fr_1.3fr_0.7fr_0.8fr_0.6fr] gap-4 border-b border-border bg-muted/40 px-5 py-3 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground md:grid">
          <span>Item</span>
          <span>Rental ID</span>
          <span>Rental period</span>
          <span>Amount</span>
          <span>Status</span>
          <span />
        </div>

        <div className="divide-y divide-border">
          {rentals.map((rental) => (
            <div
              key={rental.id}
              className="grid gap-3 px-5 py-4 md:grid-cols-[1.5fr_0.9fr_1.3fr_0.7fr_0.8fr_0.6fr] md:items-center md:gap-4"
            >
              <div>
                <p className="font-medium">
                  {rental.gearItem.name}
                </p>

                <p className="text-xs text-muted-foreground md:hidden">
                  {rental.id}
                </p>
              </div>

              <span className="hidden text-sm text-muted-foreground md:block">
                {rental.id}
              </span>

              <span className="hidden text-sm text-muted-foreground md:block">
                {formatDate(rental.startDate)}
                {" — "}
                {formatDate(rental.endDate)}
              </span>

              <span className="text-sm font-medium">
                ${rental.totalPrice}
              </span>

              <span>
                <StatusBadge
                  status={rental.orderStatus}
                />
              </span>

              <Link
                href={`/dashboard/customer/rentals/${rental.id}`}
                className="text-sm font-semibold text-primary hover:underline"
              >
                Details
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}