"use client";

import { useEffect, useState } from "react";


import { RentalCard } from "./RentalCard";
import { LoadingSkeleton } from "./LoadingSkeleton";
import { EmptyState } from "./EmptyState";
import { RentalError } from "./RentalError";
import { Rental } from "@/lib/customer";
import { getMyRentals } from "@/service/rental.service";

export function CustomerRentalsPage() {
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

  if (loading) {
    return (
      <main className="mx-auto max-w-[1400px] px-5 py-8 md:px-8">
        <LoadingSkeleton />
      </main>
    );
  }

  if (error) {
    return (
      <main className="mx-auto max-w-[1400px] px-5 py-8 md:px-8">
        <RentalError
          message={error}
          onRetry={loadRentals}
        />
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-[1400px] px-5 py-8 md:px-8">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight">
          My rentals
        </h1>

        <p className="mt-2 text-sm text-muted-foreground">
          Manage all of your rental orders.
        </p>
      </div>

      {rentals.length === 0 ? (
        <div className="mt-8">
          <EmptyState />
        </div>
      ) : (
        <div className="mt-8 space-y-3">
          {rentals.map((rental) => (
            <RentalCard
              key={rental.id}
              rental={rental}
            />
          ))}
        </div>
      )}
    </main>
  );
}