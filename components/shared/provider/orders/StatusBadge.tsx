import type { OrderStatus } from "@/lib/provider/types";

type StatusBadgeProps = {
  status: OrderStatus;
};

const statusStyles: Record<
  OrderStatus,
  string
> = {
  PLACED:
    "bg-amber-500/10 text-amber-700 dark:text-amber-400",
  CONFIRMED:
    "bg-blue-500/10 text-blue-700 dark:text-blue-400",
  PAID:
    "bg-violet-500/10 text-violet-700 dark:text-violet-400",
  PICKED_UP:
    "bg-primary/10 text-primary",
  RETURNED:
    "bg-muted text-muted-foreground",
  CANCELLED:
    "bg-destructive/10 text-destructive",
};

export default function StatusBadge({
  status,
}: StatusBadgeProps) {
  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${statusStyles[status]}`}
    >
      {status.replace("_", " ")}
    </span>
  );
}