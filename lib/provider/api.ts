"use client"

import type {
  CreateGearPayload,
  Gear,
  Order,
  OrderStatus,
} from "./types";

const NEXT_PUBLIC_BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

async function request<T>(
  url: string,
  options?: RequestInit,
): Promise<T> {
  if (!NEXT_PUBLIC_BACKEND_URL) {
    throw new Error("NEXT_PUBLIC_BACKEND_URL is not configured");
  }



  const response = await fetch(`${NEXT_PUBLIC_BACKEND_URL}${url}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      // Authorization: `Bearer ${accessToken}`,
      ...options?.headers,
    },
    cache:"no-store"
  });

  if (!response.ok) {
    const message = await response.text();

    throw new Error(message || "Something went wrong");
  }

  const body = await response.json();

  return (body?.data ?? body) as T;
}


export async function getProviderGear(): Promise<Gear[]> {
  return request<Gear[]>("/api/provider/gear");
}


export async function createProviderGear(
  payload: CreateGearPayload,
): Promise<Gear> {
  return request<Gear>("/api/provider/gear", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}


export async function getProviderOrders(): Promise<Order[]> {
  return request<Order[]>("/api/provider/orders");
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