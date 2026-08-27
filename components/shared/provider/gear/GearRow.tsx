import { Package } from "lucide-react";
import { formatMoney } from "@/lib/provider/utils";
import { Gear } from "@/lib/provider/types";

type GearRowProps = {
  gear: Gear;
};

export default function GearRow({ gear }: GearRowProps) {
  const available = gear.stock > 0 && gear.isActive;

  return (
    <div className="flex flex-col gap-4 p-5 md:grid md:grid-cols-[2fr_1fr_0.8fr_0.7fr_0.8fr] md:items-center">
      {/* Gear */}
      <div className="flex min-w-0 items-center gap-3">
        <div className="size-12 shrink-0 overflow-hidden rounded-xl bg-muted">
          {gear.photo ? (
            <img
              src={gear.photo}
              alt={gear.name}
              className="size-full object-cover"
            />
          ) : (
            <div className="grid size-full place-items-center text-muted-foreground">
              <Package className="size-5" />
            </div>
          )}
        </div>

        <div className="min-w-0">
          <p className="truncate font-medium">{gear.name}</p>

          <p className="truncate text-xs text-muted-foreground">
            {gear.brand || "Unknown brand"}
          </p>

          <p className="truncate text-xs text-muted-foreground">
            {gear.description || "No description"}
          </p>
        </div>
      </div>

      {/* Category */}
      <div className="text-sm text-muted-foreground">
        {gear.categoryId}
      </div>

      {/* Price */}
      <div className="text-sm font-medium">
        {formatMoney(Number(gear.pricePerDay))}/day
      </div>

      {/* Stock */}
      <div>
        <p className="text-sm font-medium">{gear.stock}</p>
        
      </div>

      {/* Status */}
      <span
        className={`w-fit rounded-full px-2.5 py-1 text-xs font-medium ${
          available
            ? "bg-primary/10 text-primary"
            : "bg-muted text-muted-foreground"
        }`}
      >
        {available ? "Available" : "Unavailable"}
      </span>
    </div>
  );
}
