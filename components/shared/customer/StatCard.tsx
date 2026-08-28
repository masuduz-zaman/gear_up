import type { LucideIcon } from "lucide-react";

type Props = {
  label: string;
  value: string;
  note: string;
  icon: LucideIcon;
  accent?: string;
};

export function StatCard({
  label,
  value,
  note,
  icon: Icon,
  accent = "bg-primary/10 text-primary",
}: Props) {
  return (
    <article className="rounded-2xl border border-border bg-card p-5">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-muted-foreground">
            {label}
          </p>

          <p className="mt-2 text-2xl font-semibold tracking-tight">
            {value}
          </p>
        </div>

        <span
          className={`grid size-9 place-items-center rounded-xl ${accent}`}
        >
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