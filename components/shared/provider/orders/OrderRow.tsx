"use client";

import { useState } from "react";

import type { Order } from "@/lib/provider/types";
import { formatDate, formatMoney, nextAction } from "@/lib/provider/utils";

import StatusBadge from "./StatusBadge";

type OrderRowProps = {
  order: Order;
  onUpdate: (
    order: Order,
  ) => Promise<void>;
};

export default function OrderRow({
  order,
  onUpdate,
}: OrderRowProps) {
  const [updating, setUpdating] =
    useState(false);

  const action = nextAction(
    order.status,
  );

  const handleUpdate = async () => {
    if (!action) return;

    setUpdating(true);

    try {
      await onUpdate(order);
    } finally {
      setUpdating(false);
    }
  };

  return (
    <div className="flex flex-col gap-4 p-5 md:grid md:grid-cols-[0.8fr_1.2fr_1.2fr_1.2fr_0.7fr_0.8fr_auto] md:items-center">
      <div className="text-sm font-semibold">
        #{order.id}
      </div>

      <div>
        <p className="font-medium">
          {order.customerName}
        </p>

        <p className="text-xs text-muted-foreground">
          {order.customerEmail ||
            "Email unavailable"}
        </p>
      </div>

      <div className="text-sm">
        {order.status}
      </div>

      <div className="text-sm text-muted-foreground">
        {formatDate(order.startDate)}
        {" – "}
        {formatDate(order.endDate)}
      </div>

      <div className="text-sm font-semibold">
        {formatMoney(order.amount)}
      </div>

      <StatusBadge
        status={order.status}
      />

      <div>
        {action && (
          <button
            type="button"
            onClick={handleUpdate}
            disabled={updating}
            className="rounded-xl bg-primary px-3 py-2 text-xs font-semibold text-primary-foreground disabled:opacity-60"
          >
            {updating
              ? "Updating..."
              : action.label}
          </button>
        )}
      </div>
    </div>
  );
}