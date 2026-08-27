import type { OrderStatus } from "./types";

/**
 * Format amount as USD.
 */
export function formatMoney(amount = 0): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
}

/**
 * Format date for display.
 */
export function formatDate(value?: string): string {
  if (!value) {
    return "—";
  }

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

/**
 * Generate initials from provider name.
 */
export function getInitials(
  name = "Provider",
): string {
  return name
    .trim()
    .split(/\s+/)
    .map((part) => part[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

/**
 * Get next available action for an order.
 */
export function nextAction(
  status: OrderStatus,
): {
  label: string;
  next: OrderStatus;
} | null {
  switch (status) {
    case "PLACED":
      return {
        label: "Confirm",
        next: "CONFIRMED",
      };

    case "PAID":
      return {
        label: "Mark Picked Up",
        next: "PICKED_UP",
      };

    default:
      return null;
  }
}