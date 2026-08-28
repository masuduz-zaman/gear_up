"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Bell,
  CalendarClock,
  Check,
  ChevronDown,
  ClipboardList,
  Clock3,
  CreditCard,
  LayoutDashboard,
  LogOut,
  Menu,
  Package,
  PackageCheck,
  Search,
  UserRound,
  X,
} from "lucide-react";

type RentalStatus = "Active" | "Upcoming" | "Due soon" | "Returned";
type PaymentStatus = "Paid" | "Pending" | "Failed" | "Refunded";

type Rental = {
  id: string;
  item: string;
  category: string;
  image: string;
  start: string;
  end: string;
  amount: number;
  rentalStatus: RentalStatus;
  paymentStatus: PaymentStatus;
};

const rentals: Rental[] = [
  {
    id: "GU-28491",
    item: "Professional Drill Kit",
    category: "Power tools",
    image: "🛠️",
    start: "Aug 24, 2026",
    end: "Aug 31, 2026",
    amount: 84,
    rentalStatus: "Active",
    paymentStatus: "Paid",
  },
  {
    id: "GU-28472",
    item: "Compact Excavator",
    category: "Heavy equipment",
    image: "🚜",
    start: "Sep 02, 2026",
    end: "Sep 05, 2026",
    amount: 420,
    rentalStatus: "Upcoming",
    paymentStatus: "Pending",
  },
  {
    id: "GU-28116",
    item: "Cordless Circular Saw",
    category: "Power tools",
    image: "⚙️",
    start: "Jul 18, 2026",
    end: "Jul 20, 2026",
    amount: 62,
    rentalStatus: "Returned",
    paymentStatus: "Paid",
  },
  {
    id: "GU-27988",
    item: "Portable Generator",
    category: "Site equipment",
    image: "🔌",
    start: "Jun 08, 2026",
    end: "Jun 12, 2026",
    amount: 210,
    rentalStatus: "Returned",
    paymentStatus: "Paid",
  },
];

const navGroups = [
  {
    label: "Workspace",
    items: [
      { label: "Overview", icon: LayoutDashboard },
      { label: "My rentals", icon: PackageCheck },
      { label: "Browse gear", icon: Search },
    ],
  },
  { label: "Account", items: [{ label: "Profile", icon: UserRound }] },
];

function Logo() {
  return (
    <Link
      href="/dashboard/customer"
      className="flex items-center gap-2.5 text-lg font-semibold tracking-tight text-primary"
    >
      <span className="grid size-8 place-items-center rounded-xl bg-primary text-primary-foreground">
        <PackageCheck size={18} strokeWidth={2.5} />
      </span>
      GearUp
    </Link>
  );
}

function StatusBadge({ children, tone }: { children: string; tone: string }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${tone}`}
    >
      {children === "Paid" && <Check size={12} strokeWidth={3} />}
      {children}
    </span>
  );
}

function DashboardSidebar({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  return (
    <>
      {open && (
        <button
          aria-label="Close navigation"
          onClick={onClose}
          className="fixed inset-0 z-30 bg-foreground/20 lg:hidden"
        />
      )}
      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-64 flex-col border-r border-border bg-card px-4 py-5 transition-transform lg:translate-x-0 ${open ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex items-center justify-between px-2">
          <Logo />
          <button
            aria-label="Close menu"
            onClick={onClose}
            className="rounded-lg p-2 text-muted-foreground hover:bg-muted lg:hidden"
          >
            <X size={18} />
          </button>
        </div>
        <nav aria-label="Main navigation" className="mt-10 flex-1 space-y-7">
          {navGroups.map((group) => (
            <div key={group.label}>
              <p className="px-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                {group.label}
              </p>
              <div className="mt-2 space-y-1">
                {group.items.map(({ label, icon: Icon }) => (
                  <Link
                    key={label}
                    href={label === "Overview" ? "/dashboard/customer" : "#"}
                    onClick={onClose}
                    className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium ${label === "Overview" ? "bg-accent text-primary" : "text-muted-foreground hover:bg-muted hover:text-foreground"}`}
                  >
                    <Icon size={17} />
                    {label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </nav>
        <button className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground">
          <LogOut size={17} />
          Logout
        </button>
      </aside>
    </>
  );
}

function DashboardHeader({ onMenu }: { onMenu: () => void }) {
  return (
    <header className="sticky top-0 z-20 flex h-[72px] items-center justify-between border-b border-border bg-background/95 px-5 backdrop-blur md:px-8">
      <div className="flex items-center gap-3">
        <button
          aria-label="Open navigation"
          onClick={onMenu}
          className="rounded-lg p-2 text-muted-foreground hover:bg-muted lg:hidden"
        >
          <Menu size={20} />
        </button>
        <div className="hidden items-center gap-2 text-sm text-muted-foreground sm:flex">
          <span>Workspace</span>
          <span>/</span>
          <span className="font-medium text-foreground">Overview</span>
        </div>
        <span className="text-sm font-medium text-foreground sm:hidden">
          Overview
        </span>
      </div>
      <div className="flex items-center gap-3">
        <button
          aria-label="Notifications"
          className="relative rounded-xl p-2.5 text-muted-foreground hover:bg-muted"
        >
          <Bell size={19} />
          <span className="absolute right-2 top-2 size-1.5 rounded-full bg-primary" />
        </button>
        <div className="flex items-center gap-2 border-l border-border pl-3">
          <span className="grid size-9 place-items-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
            MC
          </span>
          <div className="hidden leading-tight sm:block">
            <p className="text-sm font-semibold">Morgan Chen</p>
            <p className="text-xs text-muted-foreground">Customer</p>
          </div>
          <ChevronDown size={15} className="text-muted-foreground" />
        </div>
      </div>
    </header>
  );
}

function StatCard({
  label,
  value,
  icon: Icon,
  note,
  accent,
}: {
  label: string;
  value: string;
  icon: typeof PackageCheck;
  note: string;
  accent: string;
}) {
  return (
    <article className="rounded-2xl border border-border bg-card p-5">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-muted-foreground">{label}</p>
          <p className="mt-2 text-2xl font-semibold tracking-tight text-foreground">
            {value}
          </p>
        </div>
        <span className={`grid size-9 place-items-center rounded-xl ${accent}`}>
          <Icon size={18} />
        </span>
      </div>
      <p className="mt-4 flex items-center gap-1.5 text-xs text-muted-foreground">
        <span className="size-1.5 rounded-full bg-primary" />
        {note}
      </p>
    </article>
  );
}

function paymentTone(status: PaymentStatus) {
  return status === "Paid"
    ? "bg-primary/10 text-primary"
    : status === "Pending"
      ? "bg-amber-100 text-amber-800"
      : status === "Failed"
        ? "bg-red-100 text-red-700"
        : "bg-muted text-muted-foreground";
}
function rentalTone(status: RentalStatus) {
  return status === "Active"
    ? "bg-primary/10 text-primary"
    : status === "Due soon"
      ? "bg-amber-100 text-amber-800"
      : status === "Upcoming"
        ? "bg-sky-100 text-sky-800"
        : "bg-muted text-muted-foreground";
}

function RentalCard({ rental }: { rental: Rental }) {
  const needsPayment =
    rental.paymentStatus === "Pending" || rental.paymentStatus === "Failed";
  return (
    <article className="flex flex-col gap-4 rounded-2xl border border-border bg-card p-4 sm:flex-row sm:items-center">
      <div
        className="grid size-16 shrink-0 place-items-center rounded-xl bg-accent text-primary"
        aria-hidden="true"
      >
        <Package size={26} />
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <h3 className="font-semibold">{rental.item}</h3>
          <StatusBadge tone={rentalTone(rental.rentalStatus)}>
            {rental.rentalStatus}
          </StatusBadge>
        </div>
        <p className="mt-1 text-xs text-muted-foreground">
          {rental.category} · {rental.id}
        </p>
        <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-xs text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <CalendarClock size={13} />
            {rental.start} — {rental.end}
          </span>
          <StatusBadge tone={paymentTone(rental.paymentStatus)}>
            {rental.paymentStatus}
          </StatusBadge>
        </div>
      </div>
      <div className="flex items-center justify-between gap-4 border-t border-border pt-3 sm:block sm:border-0 sm:pt-0 sm:text-right">
        <p className="font-semibold">
          ${rental.amount}
          <span className="text-xs font-normal text-muted-foreground">
            {" "}
            total
          </span>
        </p>
        {needsPayment ? (
          <Link
            href={`/dashboard/customer/orders/${rental.id}/pay`}
            className="mt-2 inline-flex rounded-lg bg-primary px-3 py-2 text-xs font-semibold text-primary-foreground hover:bg-primary/90"
          >
            Pay now
          </Link>
        ) : (
          <Link
            href="#"
            className="mt-2 inline-flex rounded-lg border border-border px-3 py-2 text-xs font-semibold hover:bg-muted"
          >
            View rental
          </Link>
        )}
      </div>
    </article>
  );
}

function RecentRentals() {
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
          href="#"
          className="hidden text-sm font-semibold text-primary hover:underline sm:block"
        >
          View all
        </Link>
      </div>
      <div className="mt-4 overflow-hidden rounded-2xl border border-border bg-card">
        <div className="hidden grid-cols-[1.6fr_0.8fr_1.25fr_0.6fr_0.75fr_0.75fr_0.55fr] gap-4 border-b border-border bg-muted/40 px-5 py-3 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground md:grid">
          <span>Item</span>
          <span>Rental ID</span>
          <span>Rental period</span>
          <span>Amount</span>
          <span>Payment</span>
          <span>Status</span>
          <span />
        </div>
        <div className="divide-y divide-border">
          {rentals.slice(2).map((rental) => (
            <div
              key={rental.id}
              className="grid gap-3 px-5 py-4 md:grid-cols-[1.6fr_0.8fr_1.25fr_0.6fr_0.75fr_0.75fr_0.55fr] md:items-center md:gap-4"
            >
              <div>
                <p className="font-medium">{rental.item}</p>
                <p className="text-xs text-muted-foreground md:hidden">
                  {rental.id} · {rental.start} — {rental.end}
                </p>
              </div>
              <span className="hidden text-sm text-muted-foreground md:block">
                {rental.id}
              </span>
              <span className="hidden text-sm text-muted-foreground md:block">
                {rental.start} — {rental.end}
              </span>
              <span className="text-sm font-medium md:block">
                ${rental.amount}
              </span>
              <span>
                <StatusBadge tone={paymentTone(rental.paymentStatus)}>
                  {rental.paymentStatus}
                </StatusBadge>
              </span>
              <span>
                <StatusBadge tone={rentalTone(rental.rentalStatus)}>
                  {rental.rentalStatus}
                </StatusBadge>
              </span>
              <Link
                href="#"
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

export function CustomerDashboard() {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <div className="min-h-screen overflow-x-hidden bg-background text-foreground">
      <DashboardSidebar open={menuOpen} onClose={() => setMenuOpen(false)} />
      <div className="lg:pl-64">
        <DashboardHeader onMenu={() => setMenuOpen(true)} />
        <main className="mx-auto max-w-[1400px] px-5 py-8 md:px-8 lg:py-10">
          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Thursday, August 27, 2026
              </p>
              <h1 className="mt-2 text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
                Good morning, Morgan
              </h1>
              <p className="mt-2 text-sm text-muted-foreground sm:text-base">
                Here&apos;s an overview of your rentals and recent activity.
              </p>
            </div>
            <Link
              href="#"
              className="inline-flex w-fit items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm hover:bg-primary/90"
            >
              <Package size={16} />
              Browse gear
            </Link>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <StatCard
              label="Active rentals"
              value="1"
              icon={PackageCheck}
              note="Currently on rent"
              accent="bg-primary/10 text-primary"
            />
            <StatCard
              label="Upcoming returns"
              value="1"
              icon={Clock3}
              note="Due within 14 days"
              accent="bg-amber-100 text-amber-800"
            />
            <StatCard
              label="Total rentals"
              value="4"
              icon={ClipboardList}
              note="All time orders"
              accent="bg-sky-100 text-sky-800"
            />
            <StatCard
              label="Total spent"
              value="$776"
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
              {rentals.slice(0, 2).map((rental) => (
                <RentalCard rental={rental} key={rental.id} />
              ))}
            </div>
          </section>
          <div className="mt-8 flex items-center gap-4 rounded-2xl border border-primary/15 bg-accent px-5 py-4">
            <span className="hidden size-10 shrink-0 place-items-center rounded-xl bg-card text-primary sm:grid">
              <Search size={19} />
            </span>
            <div className="flex-1">
              <h2 className="font-semibold">Looking for something?</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Explore available equipment for your next project.
              </p>
            </div>
            <Link
              href="#"
              className="shrink-0 rounded-xl bg-primary px-3.5 py-2.5 text-xs font-semibold text-primary-foreground hover:bg-primary/90"
            >
              Browse gear
            </Link>
          </div>
          <RecentRentals />
        </main>
      </div>
    </div>
  );
}

export function CustomerPaymentPage({ orderId }: { orderId: string }) {
  return (
    <div className="grid min-h-screen place-items-center bg-background p-6">
      <div className="w-full max-w-md rounded-2xl border border-border bg-card p-8 text-center">
        <div className="mx-auto grid size-12 place-items-center rounded-2xl bg-accent text-primary">
          <CreditCard size={22} />
        </div>
        <h1 className="mt-5 text-2xl font-semibold">Complete your payment</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Payment checkout for rental{" "}
          <span className="font-medium text-foreground">{orderId}</span> will be
          connected here.
        </p>
        <Link
          href="/dashboard/customer"
          className="mt-6 inline-flex rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground"
        >
          Back to dashboard
        </Link>
      </div>
    </div>
  );
}

export function LoadingSkeleton() {
  return (
    <div className="space-y-4 p-8">
      <div className="h-8 w-52 animate-pulse rounded bg-muted" />
      <div className="grid gap-4 sm:grid-cols-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-28 animate-pulse rounded-2xl bg-muted" />
        ))}
      </div>
    </div>
  );
}

export function EmptyState() {
  return (
    <div className="rounded-2xl border border-border bg-card p-10 text-center">
      <Package size={28} className="mx-auto text-primary" />
      <h2 className="mt-4 text-lg font-semibold">No rentals yet</h2>
      <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-muted-foreground">
        Browse our equipment collection and find something you need for your
        next project.
      </p>
      <Link
        href="#"
        className="mt-5 inline-flex rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground"
      >
        Browse gear
      </Link>
    </div>
  );
}

export function RentalError({ onRetry }: { onRetry: () => void }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-8 text-center">
      <h2 className="font-semibold">We couldn&apos;t load your rentals</h2>
      <p className="mt-2 text-sm text-muted-foreground">
        Please try again to load the latest activity.
      </p>
      <button
        onClick={onRetry}
        className="mt-5 rounded-xl border border-border px-4 py-2 text-sm font-semibold hover:bg-muted"
      >
        Try again
      </button>
    </div>
  );
}

export {
  DashboardSidebar,
  DashboardHeader,
  StatCard,
  RentalCard,
  RecentRentals,
  StatusBadge,
};
