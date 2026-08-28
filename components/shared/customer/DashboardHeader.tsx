"use client";

import {
  Bell,
  ChevronDown,
  Menu,
} from "lucide-react";

type Props = {
  onMenu: () => void;
  name?: string;
  role?: string;
};

export function DashboardHeader({
  onMenu,
  name = "Customer",
  role = "Customer",
}: Props) {
  const initials = name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

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
          <span className="font-medium text-foreground">
            Overview
          </span>
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
            {initials}
          </span>

          <div className="hidden leading-tight sm:block">
            <p className="text-sm font-semibold">
              {name}
            </p>

            <p className="text-xs text-muted-foreground">
              {role}
            </p>
          </div>

          <ChevronDown
            size={15}
            className="text-muted-foreground"
          />
        </div>
      </div>
    </header>
  );
}