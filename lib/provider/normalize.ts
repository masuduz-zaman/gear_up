import type { Gear, Order, OrderStatus } from "./types";

type UnknownRecord = Record<string, unknown>;

function isRecord(value: unknown): value is UnknownRecord {
  return typeof value === "object" && value !== null;
}

function getString(
  value: unknown,
  fallback = "",
): string {
  return typeof value === "string" ? value : fallback;
}

function getNumber(
  value: unknown,
  fallback = 0,
): number {
  const number = Number(value);

  return Number.isFinite(number) ? number : fallback;
}


export function normalizeStatus(value: unknown): OrderStatus {
  const status = getString(value)
    .toUpperCase()
    .replace(/[- ]/g, "_");

  const validStatuses: OrderStatus[] = [
    "PLACED",
    "CONFIRMED",
    "PAID",
    "PICKED_UP",
    "RETURNED",
    "CANCELLED",
  ];

  return validStatuses.includes(status as OrderStatus)
    ? (status as OrderStatus)
    : "PLACED";
}


export function normalizeGear(value: unknown): Gear[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .filter(isRecord)
    .map((item) => {
      const stock = getNumber(item.stock);

      const isActive =
        typeof item.isActive === "boolean"
          ? item.isActive
          : true;

      return {
        id: getString(item.id),
        name: getString(item.name, "Unnamed Gear"),
        description: getString(item.description),
        brand: getString(item.brand),
        photo: getString(item.photo),

        pricePerDay: getString(
          item.pricePerDay,
          "0",
        ),

        stock,

        isActive,

        categoryId: getString(item.categoryId),

        providerId: getString(item.providerId),

        createdAt: getString(item.createdAt),

        updatedAt: getString(item.updatedAt),
      };
    });
}



export function normalizeOrders(value: unknown): Order[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .filter(isRecord)
    .map((item) => {
      const customer = isRecord(item.customer)
        ? item.customer
        : undefined;

      const gearItem = isRecord(item.gearItem)
        ? item.gearItem
        : undefined;

      return {
        id: getString(item.id, "—"),

        customerName:
          getString(customer?.name) ||
          "Customer",

        customerEmail:
          getString(customer?.email),

        gearName:
          getString(gearItem?.name) ||
          "Gear",

        startDate:
          getString(item.startDate),

        endDate:
          getString(item.endDate),

        amount: getNumber(item.totalPrice),

        status: normalizeStatus(
          item.OrderStatus,
        ),
      };
    });
}

