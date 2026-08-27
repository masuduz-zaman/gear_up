import { Box } from "lucide-react";

export default function Metric({
  label,
  value,
  detail,
  icon: Icon,
  positive,
}: {
  label: string;
  value: string;
  detail: string;
  icon: typeof Box;
  positive?: boolean;
}) {
  return (
    <div className="rounded-xl border border-[#e4ebe8] bg-card p-5">
      <div className="flex items-start justify-between">
        <div className="flex size-9 items-center justify-center rounded-lg bg-[#edf6f2] text-[#1f5d4f]">
          <Icon className="size-[18px]" />
        </div>

        <span className="text-[10px] font-semibold uppercase tracking-wider text-[#9aa8a4]">
          This month
        </span>
      </div>

      <p className="mt-5 text-2xl font-semibold tracking-[-0.04em]">
        {value}
      </p>

      <p className="mt-1 text-xs text-[#71817b]">{label}</p>

      <p
        className={`mt-3 text-[11px] font-medium ${
          positive ? "text-[#3e846d]" : "text-[#a2754b]"
        }`}
      >
        {positive ? "↗ " : ""}
        {detail}
      </p>
    </div>
  );
}
