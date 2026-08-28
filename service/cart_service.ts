
export type CartItem = {
  id: string;
  name: string;
  brand: string;
  photo: string;
  pricePerDay: number;
  quantity: number;

  startDate?: string;
  endDate?: string;
};

const CART_KEY = "gearup-cart";

export function getCart(): CartItem[] {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const savedCart = localStorage.getItem(CART_KEY);

    if (!savedCart) {
      return [];
    }

    return JSON.parse(savedCart);
  } catch {
    return [];
  }
}

function saveCart(cart: CartItem[]) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));

  window.dispatchEvent(
    new Event("cart-updated")
  );
}

export function addToCart(item: CartItem): CartItem[] {
  const cart = getCart();

  const existingItem = cart.find(
    (cartItem) => cartItem.id === item.id
  );

  let updatedCart: CartItem[];

  if (existingItem) {
    updatedCart = cart.map((cartItem) =>
      cartItem.id === item.id
        ? {
            ...cartItem,
            quantity:
              cartItem.quantity + item.quantity,
          }
        : cartItem
    );
  } else {
    updatedCart = [...cart, item];
  }

  saveCart(updatedCart);

  return updatedCart;
}

export function removeFromCart(
  id: string
): CartItem[] {
  const updatedCart = getCart().filter(
    (item) => item.id !== id
  );

  saveCart(updatedCart);

  return updatedCart;
}

export function updateCartQuantity(
  id: string,
  quantity: number
): CartItem[] {
  if (quantity <= 0) {
    return removeFromCart(id);
  }

  const updatedCart = getCart().map((item) =>
    item.id === id
      ? {
          ...item,
          quantity,
        }
      : item
  );

  saveCart(updatedCart);

  return updatedCart;
}

/**
 * Update rental start and end dates
 */
export function updateCartDates(
  id: string,
  startDate?: Date,
  endDate?: Date
): CartItem[] {
  const updatedCart = getCart().map((item) => {
    if (item.id !== id) {
      return item;
    }

    return {
      ...item,

      startDate: startDate
        ? startDate.toISOString()
        : item.startDate,

      endDate: endDate
        ? endDate.toISOString()
        : item.endDate,
    };
  });

  saveCart(updatedCart);

  return updatedCart;
}

/**
 * Clear entire cart
 */
export function clearCart(): void {
  saveCart([]);
}

