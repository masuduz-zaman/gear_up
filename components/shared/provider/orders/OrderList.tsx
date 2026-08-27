import type { Order } from "@/lib/provider/types";

import OrderRow from "./OrderRow";

type OrderListProps = {
  orders: Order[];
  onUpdate: (
    order: Order,
  ) => Promise<void>;
};

export default function OrderList({
  orders,
  onUpdate,
}: OrderListProps) {
  return (
    <div className="divide-y divide-border">
      {orders.map((order) => (
        <OrderRow
          key={order.id}
          order={order}
          onUpdate={onUpdate}
        />
      ))}
    </div>
  );
}