"use client";

import Link from "next/link";
import {
  CalendarClock,
  Package,
} from "lucide-react";

import { StatusBadge } from "./StatusBadge";
import { Rental } from "@/lib/customer";

type Props = {
  rental: Rental;
};

function formatDate(date: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  }).format(new Date(date));
}

export function RentalCard({ rental }: Props) {
  return (
    <article className="flex flex-col gap-4 rounded-2xl border border-border bg-card p-4 sm:flex-row sm:items-center">
      <div className="grid size-16 shrink-0 place-items-center rounded-xl bg-accent text-primary">
        <Package size={26} />
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <h3 className="font-semibold">
            {rental.gearItem.name}
          </h3>

          <StatusBadge
            status={rental.orderStatus}
          />
        </div>

        <p className="mt-1 text-xs text-muted-foreground">
          {rental.gearItem.brand} · {rental.id}
        </p>

        <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-xs text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <CalendarClock size={13} />

            {formatDate(rental.startDate)}

            {" — "}

            {formatDate(rental.endDate)}
          </span>
        </div>
      </div>

      <div className="flex items-center justify-between gap-4 border-t border-border pt-3 sm:block sm:border-0 sm:pt-0 sm:text-right">
        <p className="font-semibold">
          ${rental.totalPrice}
          <span className="text-xs font-normal text-muted-foreground">
            {" "}
            total
          </span>
        </p>

        <Link
          href={`/dashboard/customer/rentals/${rental.id}`}
          className="mt-2 inline-flex rounded-lg border border-border px-3 py-2 text-xs font-semibold hover:bg-muted"
        >
          View rental
        </Link>
      </div>
    </article>
  );
}