import {
  ClipboardList,
  Clock3,
  Package,
  PackageCheck,
  type LucideIcon,
} from "lucide-react";

type OverviewStatsProps = {
  loading: boolean;
  totalGear: number;
  availableGear: number;
  activeOrders: number;
  pendingOrders: number;
};

type Stat = {
  label: string;
  value: number;
  detail: string;
  icon: LucideIcon;
};

export default function OverviewStats({
  loading,
  totalGear,
  availableGear,
  activeOrders,
  pendingOrders,
}: OverviewStatsProps) {
  const stats: Stat[] = [
    {
      label: "Total Gear",
      value: totalGear,
      icon: Package,
      detail: "Items in your inventory",
    },
    {
      label: "Available Gear",
      value: availableGear,
      icon: PackageCheck,
      detail: "Ready to rent",
    },
    {
      label: "Active Orders",
      value: activeOrders,
      icon: ClipboardList,
      detail: "Currently in progress",
    },
    {
      label: "Pending Orders",
      value: pendingOrders,
      icon: Clock3,
      detail: "Need your attention",
    },
  ];

  return (
    <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon;

        return (
          <div
            key={stat.label}
            className="rounded-2xl border border-border bg-card p-5"
          >
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">
                {stat.label}
              </span>

              <div className="grid size-9 place-items-center rounded-xl bg-primary/10 text-primary">
                <Icon className="size-[18px]" />
              </div>
            </div>

            <div className="mt-4 text-3xl font-semibold">
              {loading ? "—" : stat.value}
            </div>

            <p className="mt-1 text-xs text-muted-foreground">
              {stat.detail}
            </p>
          </div>
        );
      })}
    </div>
  );
}