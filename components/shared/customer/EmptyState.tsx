import Link from "next/link";
import { Package } from "lucide-react";

export function EmptyState() {
  return (
    <div className="rounded-2xl border border-border bg-card p-10 text-center">
      <Package
        size={28}
        className="mx-auto text-primary"
      />

      <h2 className="mt-4 text-lg font-semibold">
        No rentals yet
      </h2>

      <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-muted-foreground">
        Browse our equipment collection and find
        something you need for your next project.
      </p>

      <Link
        href="/gear"
        className="mt-5 inline-flex rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground"
      >
        Browse gear
      </Link>
    </div>
  );
}