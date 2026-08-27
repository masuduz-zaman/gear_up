"use client";

import {
  Bell,
  ChevronDown,
  Menu,
  PackageCheck,
} from "lucide-react";

import { getInitials } from "@/lib/provider/utils";

type ProviderHeaderProps = {
  title: string;
  onMenuOpen: () => void;
};

export default function ProviderHeader({
  title,
  onMenuOpen,
}: ProviderHeaderProps) {
  return (
    <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-border bg-background/95 px-5 backdrop-blur md:px-8">
      <div className="flex items-center gap-3">
        <button
          type="button"
          className="lg:hidden"
          onClick={onMenuOpen}
          aria-label="Open menu"
        >
          <Menu className="size-5" />
        </button>

        <div className="hidden text-sm text-muted-foreground md:block">
          Workspace
          <span className="px-2">/</span>
          <span className="font-medium text-foreground">
            {title}
          </span>
        </div>

        <div className="flex items-center gap-2 font-semibold md:hidden">
          <PackageCheck className="size-5 text-primary" />
          GearUp
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button
          type="button"
          className="relative rounded-lg p-2 text-muted-foreground hover:bg-muted"
          aria-label="Notifications"
        >
          <Bell className="size-5" />

          <span className="absolute right-2 top-2 size-1.5 rounded-full bg-primary" />
        </button>

        <div className="h-6 w-px bg-border" />

        <div className="flex items-center gap-2">
          <div className="grid size-8 place-items-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
            {getInitials()}
          </div>

          <span className="hidden text-sm font-medium sm:block">
            Provider
          </span>

          <ChevronDown className="hidden size-4 text-muted-foreground sm:block" />
        </div>
      </div>
    </header>
  );
}