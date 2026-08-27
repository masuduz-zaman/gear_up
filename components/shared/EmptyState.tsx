import type { LucideIcon } from "lucide-react";
import Link from "next/link";

type EmptyStateProps = {
  icon: LucideIcon;
  title: string;
  description: string;
  href?: string;
  label?: string;
};

export default function EmptyState({
  icon: Icon,
  title,
  description,
  href,
  label,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 p-12 text-center">
      <div className="grid size-12 place-items-center rounded-2xl bg-muted text-muted-foreground">
        <Icon className="size-6" />
      </div>

      <h3 className="font-semibold">
        {title}
      </h3>

      <p className="max-w-sm text-sm text-muted-foreground">
        {description}
      </p>

      {href && label && (
        <Link
          href={href}
          className="mt-2 rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground"
        >
          {label}
        </Link>
      )}
    </div>
  );
}