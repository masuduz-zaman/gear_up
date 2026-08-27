import { GearItem } from "@/lib/type";
import { Box, MoreHorizontal } from "lucide-react";
import StatusPill from "./StatusPill";

export default function GearTable({ items }: { items: GearItem[] }) {
  return (
    <section className="overflow-hidden rounded-xl border border-[#e4ebe8] bg-card">
      <div className="flex items-center justify-between border-b border-[#eef2f0] px-5 py-4 sm:px-6">
        <div>
          <h2 className="font-semibold">
            Gear inventory{" "}
            <span className="ml-1 text-xs font-normal text-[#98a69f]">
              {items.length} items
            </span>
          </h2>
        </div>
      </div>

      <div className="divide-y divide-[#eef2f0]">
        {items.map((item) => (
          <div
            key={item.name}
            className="grid gap-3 px-5 py-4 sm:grid-cols-[1.5fr_1fr_0.7fr_0.8fr_0.8fr_auto] sm:items-center sm:px-6"
          >
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-lg bg-[#f0f5f2] text-[#4f776a]">
                <Box className="size-5" />
              </div>

              <div>
                <p className="text-sm font-semibold">{item.name}</p>
                <p className="mt-1 text-xs text-[#8a9c95]">{item.categoryId}</p>
              </div>
            </div>

            <div className="flex items-center">
              <p className="text-sm text-[#536961]">{item.pricePerDay} $</p>
            </div>

            <div className="flex flex-col items-center">
              <p className="text-sm font-medium">{item.stock}</p>
              <p className="text-xs text-[#99a69f]">in stock</p>
            </div>

            <div className="flex flex-col items-center">
              <p className="text-sm font-medium">
                {item._count?.rentalOrders ?? 0}
              </p>
              <p className="text-xs text-[#99a69f]">rented</p>
            </div>

            <div className="flex items-center justify-center">
              <StatusPill
                status={item?.isActive ? "Active" : "Maintenance"}
              />
            </div>

            <div className="flex flex-col items-center">
              <p className="text-sm font-medium">
                {item.provider.name}
              </p>
              <p className="text-xs text-[#99a69f]">{item.provider.email}</p>
            </div>

          </div>
        ))}

        {items.length === 0 && (
          <p className="p-10 text-center text-sm text-[#8a9c95]">
            No gear items found.
          </p>
        )}
      </div>
    </section>
  );
}
