import { Rental } from "@/lib/type";
import RentalRows from "./RentalRows";

export default function RentalTable({ rentals }: { rentals: Rental[] }) {
  return (
    <section className="overflow-hidden rounded-xl border border-[#e4ebe8] bg-card">
      <div className="flex items-center justify-between border-b border-[#eef2f0] px-5 py-4 sm:px-6">
        <div>
          <h2 className="font-semibold">
            Rental history{" "}
            <span className="ml-1 text-xs font-normal text-[#98a69f]">
              {rentals.length} rentals
            </span>
          </h2>

          <p className="mt-1 text-xs text-[#8a9c95]">
            All reservations linked to your account
          </p>
        </div>
      </div>

      <RentalRows rentals={rentals} />
    </section>
  );
}
