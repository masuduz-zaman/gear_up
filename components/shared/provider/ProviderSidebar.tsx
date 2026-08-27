"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ClipboardList,
  CircleUserRound,
  LayoutDashboard,
  LogOut,
  Package,
  PackageCheck,
  X,
} from "lucide-react";

const navItems = [
  {
    href: "/dashboard/provider",
    label: "Overview",
    icon: LayoutDashboard,
  },
  {
    href: "/dashboard/provider/gear",
    label: "My Gear",
    icon: Package,
  },
  {
    href: "/dashboard/provider/orders",
    label: "Incoming Orders",
    icon: ClipboardList,
  },
];

type ProviderSidebarProps = {
  open: boolean;
  onClose: () => void;
};

export default function ProviderSidebar({
  open,
  onClose,
}: ProviderSidebarProps) {
  const pathname = usePathname();

  return (
    <aside
      className={`fixed inset-y-0 left-0 z-40 w-64 border-r border-border bg-card p-5 transition-transform duration-300 lg:translate-x-0 ${
        open
          ? "translate-x-0"
          : "-translate-x-full"
      }`}
    >
      <div className="flex items-center gap-3 px-2 py-3">
        <div className="grid size-9 place-items-center rounded-xl bg-primary text-primary-foreground">
          <PackageCheck className="size-5" />
        </div>

        <span className="text-lg font-semibold tracking-tight">
          GearUp
        </span>

        <button
          type="button"
          className="ml-auto lg:hidden"
          onClick={onClose}
          aria-label="Close menu"
        >
          <X className="size-5" />
        </button>
      </div>

      <nav
        className="mt-10 space-y-1"
        aria-label="Provider navigation"
      >
        {navItems.map(
          ({
            href,
            label,
            icon: Icon,
          }) => {
            const active =
              pathname === href;

            return (
              <Link
                key={href}
                href={href}
                onClick={onClose}
                className={`flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition-colors ${
                  active
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-muted"
                }`}
              >
                <Icon className="size-[18px]" />
                {label}
              </Link>
            );
          },
        )}
      </nav>

      <div className="absolute inset-x-5 bottom-5 border-t border-border pt-5">
        <p className="px-3 pb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Account
        </p>

        <Link
          href="/dashboard/provider/profile"
          onClick={onClose}
          className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm text-muted-foreground hover:bg-muted"
        >
          <CircleUserRound className="size-[18px]" />
          Profile
        </Link>

        <button
          type="button"
          className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm text-muted-foreground hover:bg-muted"
        >
          <LogOut className="size-[18px]" />
          Logout
        </button>
      </div>
    </aside>
  );
}