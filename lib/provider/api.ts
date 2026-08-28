"use client";

import type {
  CreateGearPayload,
  Gear,
  Order,
  OrderStatus,
} from "./types";

async function request<T>(
  url: string,
  options?: RequestInit,
): Promise<T> {
  const response = await fetch(url, {
    ...options,

    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },

    cache: "no-store",
  });

  if (!response.ok) {
    const message = await response.text();

    console.error(
      `API Error ${response.status}:`,
      message,
    );

    throw new Error(
      message || "Something went wrong",
    );
  }

  const body = await response.json();

  return (body?.data ?? body) as T;
}

export async function getProviderGear(): Promise<Gear[]> {
  return request<Gear[]>(
    "/api/provider/gear",
  );
}

export async function createProviderGear(
  payload: CreateGearPayload,
): Promise<Gear> {
  return request<Gear>(
    "/api/provider/gear",
    {
      method: "POST",
      body: JSON.stringify(payload),
    },
  );
}

export async function getProviderOrders(): Promise<Order[]> {
  return request<Order[]>(
    "/api/provider/orders",
  );
}

export async function updateProviderOrder(
  id: string,
  status: OrderStatus,
): Promise<Order> {
  return request<Order>(
    `/api/provider/orders/${encodeURIComponent(id)}`,
    {
      method: "PATCH",
      body: JSON.stringify({ status }),
    },
  );
}