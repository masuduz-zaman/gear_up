"use client";

import { useState } from "react";
import {
  ArrowUpRight,
  Bell,
  CalendarDays,
  ChevronRight,
  CircleHelp,
  CreditCard,
  LayoutDashboard,
  LogOut,
  Menu,
  Package,
  Settings,
  ShieldCheck,
  UserRound,
  X,
} from "lucide-react";

type Section = "overview" | "rentals" | "payments" | "profile";

const navItems: { id: Section; label: string; icon: typeof LayoutDashboard }[] =
  [
    { id: "overview", label: "Overview", icon: LayoutDashboard },
    { id: "rentals", label: "My rentals", icon: Package },
    { id: "payments", label: "Payment history", icon: CreditCard },
    { id: "profile", label: "Profile settings", icon: UserRound },
  ];

const rentals = [
  {
    name: "Alpine Touring Kit",
    meta: "Skis · Boots · Poles",
    dates: "Mar 18 — Mar 24, 2025",
    status: "Active",
    tone: "active",
    price: "$248.00",
  },
  {
    name: "Summit 30L Pack",
    meta: "Technical backpack",
    dates: "Apr 02 — Apr 06, 2025",
    status: "Upcoming",
    tone: "upcoming",
    price: "$64.00",
  },
];

const payments = [
  {
    date: "Mar 18, 2025",
    item: "Alpine Touring Kit",
    method: "Visa ending 4242",
    amount: "$248.00",
    status: "Paid",
  },
  {
    date: "Feb 24, 2025",
    item: "Avalanche Safety Set",
    method: "Visa ending 4242",
    amount: "$86.50",
    status: "Paid",
  },
  {
    date: "Jan 12, 2025",
    item: "Winter Shell Jacket",
    method: "Visa ending 4242",
    amount: "$72.00",
    status: "Paid",
  },
];

export default function Page() {
  const [section, setSection] = useState<Section>("overview");
  const [mobileOpen, setMobileOpen] = useState(false);

  const navigate = (next: Section) => {
    setSection(next);
    setMobileOpen(false);
  };

  return (
    <main className="min-h-screen bg-background text-foreground">
      <aside
        className={`fixed inset-y-0 left-0 z-30 flex w-72 flex-col border-r border-border bg-sidebar px-5 py-6 transition-transform lg:translate-x-0 ${mobileOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex items-center justify-between px-3">
          <button
            onClick={() => setMobileOpen(false)}
            className="rounded-md p-2 text-muted-foreground lg:hidden"
            aria-label="Close navigation"
          >
            <X size={18} />
          </button>
        </div>
        <div className="mt-12 px-3 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
          Workspace
        </div>
        <nav className="mt-3 space-y-1" aria-label="Dashboard navigation">
          {navItems.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => navigate(id)}
              className={`flex w-full items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium transition-colors ${section === id ? "bg-sidebar-primary text-sidebar-primary-foreground" : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground"}`}
            >
              <Icon size={18} strokeWidth={1.8} />
              {label}
            </button>
          ))}
        </nav>
        <div className="mt-auto space-y-1">
          <div className="mt-4 flex items-center gap-3 border-t border-sidebar-border px-3 pt-5">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-accent font-mono text-xs font-bold text-accent-foreground">
              JM
            </div>
            <div className="min-w-0">
              <div className="truncate text-sm font-semibold text-sidebar-foreground">
                Jordan Miller
              </div>
              <div className="truncate text-xs text-muted-foreground">
                jordan@email.com
              </div>
            </div>
            <LogOut
              size={16}
              className="ml-auto shrink-0 text-muted-foreground"
            />
          </div>
        </div>
      </aside>

      {mobileOpen && (
        <button
          className="fixed inset-0 z-20 bg-foreground/20 lg:hidden"
          onClick={() => setMobileOpen(false)}
          aria-label="Close menu overlay"
        />
      )}

      <section className="lg:pl-72">
        <header className="flex h-20 items-center justify-between border-b border-border px-5 sm:px-8 lg:px-12">
          <button
            onClick={() => setMobileOpen(true)}
            className="rounded-md p-2 text-muted-foreground lg:hidden"
            aria-label="Open navigation"
          >
            <Menu size={20} />
          </button>
          <div className="hidden lg:block" />
          <div className="flex items-center gap-5">
            <button
              className="relative text-muted-foreground"
              aria-label="Notifications"
            >
              <span className="absolute -right-1 -top-1 h-2 w-2 rounded-full bg-highlight" />
            </button>
            <div className="h-8 w-px bg-border" />
            <span className="font-mono text-[11px] font-bold uppercase tracking-widest text-muted-foreground">
              Member since 2023
            </span>
          </div>
        </header>

        <div className="mx-auto max-w-6xl px-5 py-8 sm:px-8 lg:px-12 lg:py-12">
          {section === "overview" && <Overview navigate={navigate} />}
          {section === "rentals" && <Rentals />}
          {section === "payments" && <Payments />}
          {section === "profile" && <Profile />}
        </div>
      </section>
    </main>
  );
}

function PageHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div className="mb-9">
      <div className="mb-3 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-highlight">
        {eyebrow}
      </div>
      <h1 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
        {title}
      </h1>
      <p className="mt-3 max-w-xl text-sm leading-6 text-muted-foreground">
        {description}
      </p>
    </div>
  );
}

function Overview({ navigate }: { navigate: (s: Section) => void }) {
  return (
    <>
      <PageHeading
        eyebrow="Customer dashboard"
        title="Good morning, Jordan."
        description="Keep track of your gear, upcoming adventures, and account activity all in one place."
      />
      <div className="grid gap-4 md:grid-cols-3">
        <Stat
          icon={<Package size={19} />}
          label="Active rental"
          value="01"
          detail="Due back in 4 days"
        />
        <Stat
          icon={<CalendarDays size={19} />}
          label="Next pickup"
          value="Apr 02"
          detail="Summit 30L Pack"
        />
        <Stat
          icon={<CreditCard size={19} />}
          label="Total spent"
          value="$1,284"
          detail="Across 12 rentals"
        />
      </div>
      <div className="mt-10 grid gap-6 xl:grid-cols-[1.35fr_0.65fr]">
        <div className="rounded-2xl border border-border bg-card p-6 sm:p-7">
          <div className="flex items-start justify-between">
            <div>
              <div className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-highlight">
                Currently with you
              </div>
              <h2 className="mt-2 text-xl font-semibold">Alpine Touring Kit</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Skis · Boots · Poles
              </p>
            </div>
            <span className="rounded-full bg-highlight/15 px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-wider text-highlight">
              Active
            </span>
          </div>
          <div className="my-7 grid grid-cols-2 gap-4 border-y border-border py-5 sm:grid-cols-3">
            <div>
              <div className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                Return date
              </div>
              <div className="mt-1 text-sm font-semibold">Mar 24, 2025</div>
            </div>
            <div>
              <div className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                Booking ID
              </div>
              <div className="mt-1 text-sm font-semibold">GL-28491</div>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <div className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                Protection plan
              </div>
              <div className="mt-1 flex items-center gap-1.5 text-sm font-semibold">
                <ShieldCheck size={14} className="text-highlight" />
                Covered
              </div>
            </div>
          </div>
          <button
            onClick={() => navigate("rentals")}
            className="flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
          >
            View rental details <ArrowUpRight size={15} />
          </button>
        </div>
        <div className="rounded-2xl bg-primary p-6 text-primary-foreground sm:p-7">
          <div className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-primary-foreground/60">
            Ready for the next trip?
          </div>
          <h2 className="mt-3 max-w-xs text-2xl font-semibold leading-tight">
            The right gear changes everything.
          </h2>
          <p className="mt-3 text-sm leading-6 text-primary-foreground/70">
            Browse equipment tested for the places you want to go.
          </p>
          <button className="mt-8 flex items-center gap-2 rounded-lg bg-highlight px-4 py-3 text-sm font-semibold text-highlight-foreground hover:opacity-90">
            Explore gear <ArrowUpRight size={16} />
          </button>
        </div>
      </div>
      <div className="mt-10 flex items-center justify-between">
        <div>
          <div className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-highlight">
            Recent activity
          </div>
          <h2 className="mt-2 text-xl font-semibold">Your latest payments</h2>
        </div>
        <button
          onClick={() => navigate("payments")}
          className="flex items-center gap-1 text-sm font-semibold text-muted-foreground hover:text-foreground"
        >
          See all <ChevronRight size={16} />
        </button>
      </div>
      <div className="mt-5 overflow-hidden rounded-2xl border border-border bg-card">
        <PaymentRows items={payments.slice(0, 2)} />
      </div>
    </>
  );
}

function Stat({
  icon,
  label,
  value,
  detail,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  detail: string;
}) {
  return (
    <div className="rounded-2xl border border-border bg-card p-5">
      <div className="flex items-center justify-between text-muted-foreground">
        <span className="font-mono text-[10px] font-bold uppercase tracking-[0.15em]">
          {label}
        </span>
        <span className="text-highlight">{icon}</span>
      </div>
      <div className="mt-5 text-2xl font-semibold tracking-tight">{value}</div>
      <div className="mt-1 text-xs text-muted-foreground">{detail}</div>
    </div>
  );
}

function Rentals() {
  return (
    <>
      <PageHeading
        eyebrow="Workspace / My rentals"
        title="My rentals"
        description="View your active equipment, upcoming pickups, and past adventures."
      />
      <div className="space-y-4">
        {rentals.map((rental) => (
          <div
            key={rental.name}
            className="flex flex-col gap-5 rounded-2xl border border-border bg-card p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6"
          >
            <div className="flex items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-accent">
                <Package size={25} className="text-accent-foreground" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="font-semibold">{rental.name}</h2>
                  <span
                    className={`rounded-full px-2 py-0.5 font-mono text-[9px] font-bold uppercase tracking-wider ${rental.tone === "active" ? "bg-highlight/15 text-highlight" : "bg-secondary text-muted-foreground"}`}
                  >
                    {rental.status}
                  </span>
                </div>
                <p className="mt-1 text-sm text-muted-foreground">
                  {rental.meta}
                </p>
                <p className="mt-2 flex items-center gap-1.5 text-xs text-muted-foreground">
                  <CalendarDays size={13} />
                  {rental.dates}
                </p>
              </div>
            </div>
            <div className="flex items-center justify-between border-t border-border pt-4 sm:block sm:border-0 sm:pt-0 sm:text-right">
              <div className="font-semibold">{rental.price}</div>
              <button className="mt-1 flex items-center gap-1 text-sm font-semibold text-primary sm:ml-auto">
                Details <ChevronRight size={15} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

function Payments() {
  return (
    <>
      <PageHeading
        eyebrow="Workspace / Payment history"
        title="Payment history"
        description="A complete record of your Gearloop rental payments and receipts."
      />
      <div className="overflow-hidden rounded-2xl border border-border bg-card">
        <div className="hidden grid-cols-[1fr_1.5fr_1.2fr_0.7fr_0.5fr] gap-4 border-b border-border bg-muted/40 px-6 py-4 font-mono text-[10px] font-bold uppercase tracking-wider text-muted-foreground md:grid">
          <span>Date</span>
          <span>Rental</span>
          <span>Payment method</span>
          <span>Amount</span>
          <span />
        </div>
        <PaymentRows items={payments} />
      </div>
    </>
  );
}

function PaymentRows({ items }: { items: typeof payments }) {
  return (
    <div>
      {items.map((payment) => (
        <div
          key={payment.date + payment.item}
          className="grid gap-2 border-b border-border px-5 py-5 last:border-0 md:grid-cols-[1fr_1.5fr_1.2fr_0.7fr_0.5fr] md:items-center md:gap-4 md:px-6"
        >
          <div className="text-xs text-muted-foreground">{payment.date}</div>
          <div className="text-sm font-semibold">{payment.item}</div>
          <div className="text-xs text-muted-foreground">{payment.method}</div>
          <div className="text-sm font-semibold">{payment.amount}</div>
          <div className="flex items-center justify-between">
            <span className="font-mono text-[9px] font-bold uppercase tracking-wider text-highlight">
              {payment.status}
            </span>
            <button className="text-xs font-semibold text-muted-foreground hover:text-foreground">
              Receipt
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

function Profile() {
  return (
    <>
      <PageHeading
        eyebrow="Workspace / Profile settings"
        title="Profile settings"
        description="Manage your personal information and account preferences."
      />
      <div className="max-w-2xl space-y-5">
        <div className="rounded-2xl border border-border bg-card p-6 sm:p-8">
          <div className="flex items-center gap-4 border-b border-border pb-6">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-accent font-mono text-lg font-bold">
              JM
            </div>
            <div>
              <h2 className="font-semibold">Jordan Miller</h2>
              <p className="text-sm text-muted-foreground">jordan@email.com</p>
            </div>
            <button className="ml-auto rounded-lg border border-border px-3 py-2 text-xs font-semibold hover:bg-muted">
              Change photo
            </button>
          </div>
          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            <label className="text-sm font-medium">
              First name
              <input
                className="mt-2 w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-ring"
                defaultValue="Jordan"
              />
            </label>
            <label className="text-sm font-medium">
              Last name
              <input
                className="mt-2 w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-ring"
                defaultValue="Miller"
              />
            </label>
            <label className="text-sm font-medium sm:col-span-2">
              Email address
              <input
                className="mt-2 w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-ring"
                defaultValue="jordan@email.com"
              />
            </label>
          </div>
          <button className="mt-6 rounded-lg bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground">
            Save changes
          </button>
        </div>
      </div>
    </>
  );
}
