import { GearItem } from "@/lib/type";

const CART_KEY = "gearup-cart";

export type CartItem = GearItem & {
  quantity: number;
};

function isBrowser() {
  return typeof window !== "undefined";
}

export function getCart(): CartItem[] {
  if (!isBrowser()) return [];

  try {
    const stored = localStorage.getItem(CART_KEY);

    if (!stored) return [];

    const parsed = JSON.parse(stored);

    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function saveCart(cart: CartItem[]) {
  if (!isBrowser()) return;

  localStorage.setItem(
    CART_KEY,
    JSON.stringify(cart),
  );

  window.dispatchEvent(
    new Event("cart-updated"),
  );
}

export function addToCart(
  item: GearItem,
): CartItem[] {
  const cart = getCart();

  const existing = cart.find(
    (cartItem) => cartItem.id === item.id,
  );

  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({
      ...item,
      quantity: 1,
    });
  }

  saveCart(cart);

  return cart;
}

export function removeFromCart(
  id: string,
): CartItem[] {
  const cart = getCart().filter(
    (item) => item.id !== id,
  );

  saveCart(cart);

  return cart;
}

export function updateCartQuantity(
  id: string,
  quantity: number,
): CartItem[] {
  const cart = getCart();

  const item = cart.find(
    (cartItem) => cartItem.id === id,
  );

  if (!item) return cart;

  if (quantity <= 0) {
    return removeFromCart(id);
  }

  item.quantity = quantity;

  saveCart(cart);

  return cart;
}

export function clearCart() {
  saveCart([]);
}
