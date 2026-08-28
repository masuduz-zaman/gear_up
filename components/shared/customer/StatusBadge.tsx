import { OrderStatus, PaymentStatus } from "@/lib/customer";


type Props = {
  status: OrderStatus | PaymentStatus;
};

function getTone(status: string) {
  switch (status) {
    case "PAID":
    case "CONFIRMED":
    case "PICKED_UP":
      return "bg-primary/10 text-primary";

    case "PENDING":
    case "PLACED":
      return "bg-amber-100 text-amber-800";

    case "FAILED":
    case "CANCELLED":
      return "bg-red-100 text-red-700";

    case "RETURNED":
    case "REFUNDED":
      return "bg-muted text-muted-foreground";

    default:
      return "bg-muted text-muted-foreground";
  }
}

export function StatusBadge({ status }: Props) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${getTone(
        status
      )}`}
    >
      {status.replace("_", " ")}
    </span>
  );
}