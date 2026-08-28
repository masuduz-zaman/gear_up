"use client";

import { useEffect, useState } from "react";
import {
  ClipboardList,
  Clock3,
  CreditCard,
  PackageCheck,
  Package,
} from "lucide-react";
import Link from "next/link";


import { DashboardHeader } from "./DashboardHeader";
import { StatCard } from "./StatCard";
import { RentalCard } from "./RentalCard";
import { RecentRentals } from "./RecentRentals";
import { LoadingSkeleton } from "./LoadingSkeleton";
import { EmptyState } from "./EmptyState";
import { RentalError } from "./RentalError";
import { DashboardSidebar } from "./CustomerSidebar";
import { Rental } from "@/lib/customer";
import { getMyRentals } from "@/service/rental.service";

export function CustomerDashboard() {
  const [menuOpen, setMenuOpen] =
    useState(false);

  const [rentals, setRentals] = useState<Rental[]>(
    []
  );

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState<string | null>(null);

  const loadRentals = async () => {
    try {
      setLoading(true);
      setError(null);

      const data = await getMyRentals();

      setRentals(data);
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Failed to load rentals"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRentals();
  }, []);

  const activeRentals = rentals.filter(
    (rental) =>
      rental.orderStatus === "PAID" ||
      rental.orderStatus === "PICKED_UP"
  );

  const upcomingRentals = rentals.filter(
    (rental) =>
      rental.orderStatus === "PLACED" ||
      rental.orderStatus === "PENDING" ||
      rental.orderStatus === "CONFIRMED"
  );

  const totalSpent = rentals.reduce(
    (total, rental) =>
      total + Number(rental.totalPrice || 0),
    0
  );

  return (
    <div className="min-h-screen overflow-x-hidden bg-background text-foreground">
      <DashboardSidebar
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
      />

      <div className="lg:pl-64">
        <DashboardHeader
          onMenu={() => setMenuOpen(true)}
        />

        <main className="mx-auto max-w-[1400px] px-5 py-8 md:px-8 lg:py-10">
          {loading ? (
            <LoadingSkeleton />
          ) : error ? (
            <RentalError
              message={error}
              onRetry={loadRentals}
            />
          ) : (
            <>
              <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Customer Dashboard
                  </p>

                  <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
                    Welcome back
                  </h1>

                  <p className="mt-2 text-sm text-muted-foreground sm:text-base">
                    Here&apos;s an overview of your
                    rentals and recent activity.
                  </p>
                </div>

                <Link
                  href="/gear"
                  className="inline-flex w-fit items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm hover:bg-primary/90"
                >
                  <Package size={16} />
                  Browse gear
                </Link>
              </div>

              <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                <StatCard
                  label="Active rentals"
                  value={String(
                    activeRentals.length
                  )}
                  icon={PackageCheck}
                  note="Currently on rent"
                  accent="bg-primary/10 text-primary"
                />

                <StatCard
                  label="Upcoming rentals"
                  value={String(
                    upcomingRentals.length
                  )}
                  icon={Clock3}
                  note="Upcoming orders"
                  accent="bg-amber-100 text-amber-800"
                />

                <StatCard
                  label="Total rentals"
                  value={String(rentals.length)}
                  icon={ClipboardList}
                  note="All time orders"
                  accent="bg-sky-100 text-sky-800"
                />

                <StatCard
                  label="Total spent"
                  value={`$${totalSpent}`}
                  icon={CreditCard}
                  note="Across all rentals"
                  accent="bg-muted text-muted-foreground"
                />
              </div>

              <section className="mt-10">
                <div>
                  <h2 className="text-lg font-semibold tracking-tight">
                    Current rentals
                  </h2>

                  <p className="mt-1 text-sm text-muted-foreground">
                    Items you&apos;re currently renting.
                  </p>
                </div>

                <div className="mt-4 space-y-3">
                  {activeRentals.length === 0 ? (
                    <EmptyState />
                  ) : (
                    activeRentals
                      .slice(0, 2)
                      .map((rental) => (
                        <RentalCard
                          rental={rental}
                          key={rental.id}
                        />
                      ))
                  )}
                </div>
              </section>

              <div className="mt-8 flex items-center gap-4 rounded-2xl border border-primary/15 bg-accent px-5 py-4">
                <span className="hidden size-10 shrink-0 place-items-center rounded-xl bg-card text-primary sm:grid">
                  <Package size={19} />
                </span>

                <div className="flex-1">
                  <h2 className="font-semibold">
                    Looking for something?
                  </h2>

                  <p className="mt-1 text-sm text-muted-foreground">
                    Explore available equipment for
                    your next project.
                  </p>
                </div>

                <Link
                  href="/gear"
                  className="shrink-0 rounded-xl bg-primary px-3.5 py-2.5 text-xs font-semibold text-primary-foreground hover:bg-primary/90"
                >
                  Browse gear
                </Link>
              </div>

              {rentals.length > 0 && (
                <RecentRentals
                  rentals={rentals.slice(0, 5)}
                />
              )}
            </>
          )}
        </main>
      </div>
    </div>
  );
}