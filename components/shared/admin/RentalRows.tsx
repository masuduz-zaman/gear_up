import { Rental } from "@/lib/type";
import Avatar from "./Avatar";
import StatusPill from "./StatusPill";

export default function RentalRows({
  rentals,
  limit,
}: {
  rentals: Rental[];
  limit?: number;
}) {
  const dataToDisplay = limit ? rentals.slice(0, limit) : rentals;

  return (
    <div className="divide-y divide-[#eef2f0]">
      {dataToDisplay.map((rental) => (
        <div
          key={rental.id}
          className="grid gap-3 px-5 py-4 sm:grid-cols-[1fr_1.3fr_1fr_1fr_auto] sm:items-center sm:px-6"
        >
          <div>
            <p className="text-sm font-semibold">{rental.gearItem.name}</p>
            <p className="mt-1 text-xs text-[#93a19b]">
              {rental.createdAt}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Avatar
              initials={
                rental.customer
                  ? rental.customer.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .toUpperCase()
                  : "U"
              }
            />

            <div>
              <p className="text-sm font-medium">{rental.customer.name}</p>

              <p className="mt-1 text-xs text-[#8a9c95]">
                {rental.customerId}
              </p>
            </div>
          </div>

          <div className="text-sm text-[#5c7169]">
            {rental.totalPrice} $
          </div>
          <div className="flex items-center gap-4">
  <div>
    <p className="text-xs text-[#99a69f]">Start date</p>
    <p className="mt-1 text-sm font-medium text-[#536961]">
      {new Date(rental.startDate).toLocaleDateString()}
    </p>
  </div>

  <div className="h-8 w-px bg-[#e4ebe8]" />

  <div>
    <p className="text-xs text-[#99a69f]">End date</p>
    <p className="mt-1 text-sm font-medium text-[#536961]">
      {new Date(rental.endDate).toLocaleDateString()}
    </p>
  </div>
</div>


          <div className="flex items-center justify-center">
          <StatusPill status={rental.OrderStatus} />
          </div>
        </div>
      ))}

      {dataToDisplay.length === 0 && (
        <p className="p-10 text-center text-sm text-[#8a9c95]">
          No rental records found.
        </p>
      )}
    </div>
  );
}
