"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import { ClipboardList } from "lucide-react";

import {
  getProviderOrders,
  updateProviderOrder,
} from "@/lib/provider/api";

import {
  normalizeOrders,
} from "@/lib/provider/normalize";

import type {
  Order,
} from "@/lib/provider/types";

import ProviderShell from "../ProviderShell";


import OrderFilters from "./OrderFilters";
import OrderList from "./OrderList";
import LoadingRows from "../../LoadingRows";
import EmptyState from "../../EmptyState";
import Feedback from "../../Feedback";

export default function ProviderOrdersPage() {
  const [orders, setOrders] =
    useState<Order[]>([]);

  const [query, setQuery] =
    useState("");

  const [status, setStatus] =
    useState("ALL");

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const [feedback, setFeedback] =
    useState("");

const load = async () => {
  setLoading(true);
  setError("");

  try {
    const response = await getProviderOrders();

    setOrders(normalizeOrders(response));
  } catch {
    setError("Unable to load incoming orders.");
  } finally {
    setLoading(false);
  }
};

useEffect(() => {
  const fetchOrders = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await getProviderOrders();

      setOrders(normalizeOrders(response));
    } catch {
      setError("Unable to load incoming orders.");
    } finally {
      setLoading(false);
    }
  };

  fetchOrders();
}, []);

  const filteredOrders = useMemo(() => {
    const search = query
      .trim()
      .toLowerCase();

    return orders.filter((order) => {
      const matchesStatus =
        status === "ALL" ||
        order.status === status;

      const matchesSearch =
        !search ||
        `${order.id} ${order.customerName} ${order.gearName}`
          .toLowerCase()
          .includes(search);

      return (
        matchesStatus &&
        matchesSearch
      );
    });
  }, [orders, query, status]);

  const handleUpdate = async (
    order: Order,
  ) => {
    const action = nextActionForOrder(
      order,
    );

    if (!action) return;

    const previousStatus =
      order.status;

    setOrders((current) =>
      current.map((item) =>
        item.id === order.id
          ? {
              ...item,
              status: action.next,
            }
          : item,
      ),
    );

    try {
      await updateProviderOrder(
        order.id,
        action.next,
      );

      setFeedback(
        action.next === "CONFIRMED"
          ? "Order confirmed successfully."
          : "Order marked as picked up.",
      );
    } catch {
      setOrders((current) =>
        current.map((item) =>
          item.id === order.id
            ? {
                ...item,
                status: previousStatus,
              }
            : item,
        ),
      );

      setFeedback(
        "Update failed. Please try again.",
      );
    }

    setTimeout(
      () => setFeedback(""),
      3200,
    );
  };

  return (
    <ProviderShell title="Incoming Orders">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight">
          Incoming Orders
        </h1>

        <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
          Review customer rental requests
          and update order status as gear
          moves through the rental process.
        </p>
      </div>

      <OrderFilters
        query={query}
        status={status}
        onQueryChange={setQuery}
        onStatusChange={setStatus}
      />

      {error && (
        <div className="mt-5 flex items-center justify-between rounded-xl border border-destructive/30 bg-destructive/5 p-4 text-sm text-destructive">
          <span>{error}</span>

          <button
            type="button"
            onClick={load}
            className="font-semibold underline"
          >
            Try Again
          </button>
        </div>
      )}

      <section className="mt-5 overflow-hidden rounded-2xl border border-border bg-card">
        {loading ? (
          <div className="p-5">
            <LoadingRows count={5} />
          </div>
        ) : filteredOrders.length ? (
          <OrderList
            orders={filteredOrders}
            onUpdate={handleUpdate}
          />
        ) : (
          <EmptyState
            icon={ClipboardList}
            title={
              orders.length
                ? "No matching orders"
                : "No incoming orders"
            }
            description={
              orders.length
                ? "Try changing your search or filter."
                : "New customer rental requests will appear here."
            }
          />
        )}
      </section>

      {feedback && (
        <Feedback
          message={feedback}
          error={feedback.startsWith(
            "Update",
          )}
        />
      )}
    </ProviderShell>
  );
}

function nextActionForOrder(
  order: Order,
) {
  if (order.status === "PLACED") {
    return {
      label: "Confirm",
      next: "CONFIRMED" as const,
    };
  }

  if (order.status === "PAID") {
    return {
      label: "Mark Picked Up",
      next: "PICKED_UP" as const,
    };
  }

  return null;
}