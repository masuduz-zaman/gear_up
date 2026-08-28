"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  Minus,
  Plus,
  ShoppingCart,
  Trash2,
} from "lucide-react";

import { Button } from "@/components/ui/button";

import {
  CartItem,
  getCart,
  removeFromCart,
  updateCartQuantity,
} from "@/service/cart_service";

export default function CartPage() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setCart(getCart());
    setMounted(true);

    const handleCartUpdate = () => {
      setCart(getCart());
    };

    window.addEventListener(
      "cart-updated",
      handleCartUpdate,
    );

    return () => {
      window.removeEventListener(
        "cart-updated",
        handleCartUpdate,
      );
    };
  }, []);

  if (!mounted) {
    return null;
  }

  const total = cart.reduce(
    (sum, item) =>
      sum +
      item.pricePerDay * item.quantity,
    0,
  );

  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight">
              Your Cart
            </h1>

            <p className="mt-1 text-sm text-muted-foreground">
              {cart.length}{" "}
              {cart.length === 1
                ? "item"
                : "items"}{" "}
              in your cart
            </p>
          </div>

          <Link href="/gear">
            <Button variant="outline">
              Continue shopping
            </Button>
          </Link>
        </div>

        {cart.length === 0 ? (
          <div className="mt-10 flex min-h-80 flex-col items-center justify-center rounded-xl border border-dashed p-8 text-center">
            <ShoppingCart className="size-10 text-muted-foreground" />

            <h2 className="mt-4 text-xl font-semibold">
              Your cart is empty
            </h2>

            <p className="mt-2 text-sm text-muted-foreground">
              Add some gear to get started.
            </p>

            <Link
              href="/gear"
              className="mt-5"
            >
              <Button>
                Browse gear
              </Button>
            </Link>
          </div>
        ) : (
          <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_320px]">
            <div className="space-y-4">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 rounded-xl border bg-card p-4"
                >
                  <img
                    src={item.photo}
                    alt={item.name}
                    className="size-28 rounded-lg object-cover"
                  />

                  <div className="flex min-w-0 flex-1 flex-col justify-between">
                    <div className="flex justify-between gap-4">
                      <div>
                        <Link
                          href={`/gear/${item.id}`}
                          className="font-semibold hover:text-primary"
                        >
                          {item.name}
                        </Link>

                        <p className="text-sm text-muted-foreground">
                          {item.brand}
                        </p>
                      </div>

                      <button
                        type="button"
                        aria-label={`Remove ${item.name}`}
                        onClick={() =>
                          setCart(
                            removeFromCart(
                              item.id,
                            ),
                          )
                        }
                        className="text-muted-foreground hover:text-destructive"
                      >
                        <Trash2 className="size-5" />
                      </button>
                    </div>

                    <div className="mt-4 flex items-center justify-between">
                      <div className="flex items-center rounded-md border">
                        <button
                          type="button"
                          className="p-2"
                          onClick={() =>
                            setCart(
                              updateCartQuantity(
                                item.id,
                                item.quantity - 1,
                              ),
                            )
                          }
                        >
                          <Minus className="size-4" />
                        </button>

                        <span className="min-w-8 text-center text-sm">
                          {item.quantity}
                        </span>

                        <button
                          type="button"
                          className="p-2"
                          onClick={() =>
                            setCart(
                              updateCartQuantity(
                                item.id,
                                item.quantity + 1,
                              ),
                            )
                          }
                        >
                          <Plus className="size-4" />
                        </button>
                      </div>

                      <div className="text-right">
                        <p className="font-semibold text-primary">
                          $
                          {item.pricePerDay *
                            item.quantity}
                        </p>

                        <p className="text-xs text-muted-foreground">
                          ${item.pricePerDay} / day
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <aside className="h-fit rounded-xl border bg-card p-5">
              <h2 className="text-lg font-semibold">
                Order summary
              </h2>

              <div className="mt-5 flex justify-between border-b pb-4 text-sm">
                <span className="text-muted-foreground">
                  Subtotal
                </span>

                <span className="font-medium">
                  ${total}
                </span>
              </div>

              <div className="mt-4 flex justify-between">
                <span className="font-semibold">
                  Total
                </span>

                <span className="text-xl font-semibold text-primary">
                  ${total}
                </span>
              </div>

              <Button
                className="mt-5 w-full"
                size="lg"
              >
                Proceed to checkout
              </Button>
            </aside>
          </div>
        )}
      </div>
    </main>
  );
}
