"use client";

import Link from "next/link";
import {
  LayoutDashboard,
  LogOut,
  PackageCheck,
  Search,
  UserRound,
  X,
} from "lucide-react";

type Props = {
  open: boolean;
  onClose: () => void;
};

const navGroups = [
  {
    label: "Workspace",
    items: [
      {
        label: "Overview",
        href: "/dashboard/customer",
        icon: LayoutDashboard,
      },
      {
        label: "My rentals",
        href: "/dashboard/customer/rentals",
        icon: PackageCheck,
      },
      {
        label: "Browse gear",
        href: "/gear",
        icon: Search,
      },
    ],
  },
  {
    label: "Account",
    items: [
      {
        label: "Profile",
        href: "/dashboard/customer/profile",
        icon: UserRound,
      },
    ],
  },
];

export function DashboardSidebar({
  open,
  onClose,
}: Props) {
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
        className={`fixed inset-y-0 left-0 z-40 flex w-64 flex-col border-r border-border bg-card px-4 py-5 transition-transform lg:translate-x-0 ${
          open
            ? "translate-x-0"
            : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-2">
          <Link
            href="/dashboard/customer"
            className="flex items-center gap-2.5 text-lg font-semibold tracking-tight text-primary"
          >
            <span className="grid size-8 place-items-center rounded-xl bg-primary text-primary-foreground">
              <PackageCheck
                size={18}
                strokeWidth={2.5}
              />
            </span>

            GearUp
          </Link>

          <button
            aria-label="Close menu"
            onClick={onClose}
            className="rounded-lg p-2 text-muted-foreground hover:bg-muted lg:hidden"
          >
            <X size={18} />
          </button>
        </div>

        <nav
          aria-label="Main navigation"
          className="mt-10 flex-1 space-y-7"
        >
          {navGroups.map((group) => (
            <div key={group.label}>
              <p className="px-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                {group.label}
              </p>

              <div className="mt-2 space-y-1">
                {group.items.map(
                  ({
                    label,
                    href,
                    icon: Icon,
                  }) => (
                    <Link
                      key={label}
                      href={href}
                      onClick={onClose}
                      className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium ${
                        label === "Overview"
                          ? "bg-accent text-primary"
                          : "text-muted-foreground hover:bg-muted hover:text-foreground"
                      }`}
                    >
                      <Icon size={17} />
                      {label}
                    </Link>
                  )
                )}
              </div>
            </div>
          ))}
        </nav>

        <button
          className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground"
        >
          <LogOut size={17} />
          Logout
        </button>
      </aside>
    </>
  );
}