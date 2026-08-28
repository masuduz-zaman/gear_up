export type Gear = {
  id: string;
  name: string;
  description?: string;
  category?: string;
  price?: number;
  quantity?: number;
  availableQuantity?: number;
  image?: string;
  status?: string;
  createdAt?: string;
};

export type OrderStatus =
  | "PLACED"
  | "CONFIRMED"
  | "PAID"
  | "PICKED_UP"
  | "RETURNED"
  | "CANCELLED";

export type Order = {
  id: string;
  customerName?: string;
  customerEmail?: string;
  gearName?: string;
  startDate?: string;
  endDate?: string;
  amount?: number;
  status: OrderStatus;
};

const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

async function request<T>(
  endpoint: string,
  options: RequestInit = {},
): Promise<T> {
  if (!API_URL) {
    throw new Error("NEXT_PUBLIC_BACKEND_URL is not configured");
  }

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || "Something went wrong");
  }

  const body = await response.json();

  return (body?.data ?? body) as T;
}

/* =========================
   Provider Gear
========================= */

export function getProviderGear() {
  return request<Gear[]>("/api/provider/gear");
}

export function createProviderGear(payload: {
  name: string;
  description?: string;
  category: string;
  price: number;
  quantity: number;
  image?: string;
}) {
  return request<Gear>("/api/provider/gear", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

/* =========================
   Provider Orders
========================= */

export function getProviderOrders() {
  return request<Order[]>("/api/provider/orders");
}

export function updateProviderOrder(
  id: string,
  status: OrderStatus,
) {
  return request<Order>(
    `/api/provider/orders/${encodeURIComponent(id)}`,
    {
      method: "PATCH",
      body: JSON.stringify({ status }),
    },
  );
}

/* =========================
   Helpers
========================= */

export function formatMoney(amount = 0) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
}

export function formatDate(value?: string) {
  if (!value) return "—";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function getInitials(name = "Provider") {
  return name
    .trim()
    .split(/\s+/)
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

/* =========================
   Order Helpers
========================= */

const ORDER_STATUSES: OrderStatus[] = [
  "PLACED",
  "CONFIRMED",
  "PAID",
  "PICKED_UP",
  "RETURNED",
  "CANCELLED",
];

export function normalizeStatus(value?: string): OrderStatus {
  const status = value
    ?.toUpperCase()
    .replace(/[- ]/g, "_");

  return ORDER_STATUSES.includes(status as OrderStatus)
    ? (status as OrderStatus)
    : "PLACED";
}

export function nextAction(status: OrderStatus) {
  switch (status) {
    case "PLACED":
      return {
        label: "Confirm",
        next: "CONFIRMED" as OrderStatus,
      };

    case "PAID":
      return {
        label: "Mark Picked Up",
        next: "PICKED_UP" as OrderStatus,
      };

    default:
      return null;
  }
}

/* =========================
   Normalizers
========================= */

export function normalizeGear(value: unknown): Gear[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value.map((item): Gear => {
    const gear = item as Record<string, any>;

    const availableQuantity = Number(
      gear.availableQuantity ??
        gear.available ??
        0,
    );

    return {
      id: String(gear.id ?? ""),
      name: String(gear.name ?? "Unnamed Gear"),

      description:
        gear.description != null
          ? String(gear.description)
          : undefined,

      category:
        gear.category?.name ??
        gear.categoryName ??
        (typeof gear.category === "string"
          ? gear.category
          : "Uncategorized"),

      price: Number(
        gear.price ??
          gear.rentalPrice ??
          gear.pricePerDay ??
          0,
      ),

      quantity: Number(
        gear.quantity ??
          gear.stock ??
          0,
      ),

      availableQuantity,

      image:
        gear.image ??
        gear.photo ??
        undefined,

      status:
        gear.status ??
        (availableQuantity > 0
          ? "Available"
          : "Unavailable"),

      createdAt:
        gear.createdAt != null
          ? String(gear.createdAt)
          : undefined,
    };
  });
}


export function normalizeOrders(value: unknown): Order[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value.map((item) => {
    const order = item as Record<string, any>;

    return {
      id: String(
        order.id ??
          order.orderId ??
          "—",
      ),

      customerName:
        order.customer?.name ??
        order.customerName ??
        order.user?.name ??
        "Customer",

      customerEmail:
        order.customer?.email ??
        order.customerEmail ??
        order.user?.email,

      gearName:
        order.gear?.name ??
        order.gearName ??
        order.item?.name ??
        "Gear",

      startDate:
        order.startDate ??
        order.rentalStartDate ??
        order.start,

      endDate:
        order.endDate ??
        order.rentalEndDate ??
        order.end,

      amount: Number(
        order.amount ??
          order.total ??
          order.price ??
          0,
      ),

      status: normalizeStatus(order.status),
    };
  });
}