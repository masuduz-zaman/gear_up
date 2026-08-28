"use client";

import Link from "next/link";
import { useState } from "react";
import { Check, ShoppingCart } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { GearItem } from "@/lib/type";
import { addToCart } from "@/service/cart_service";

interface GearDetailProps {
  item: GearItem;
}

export function GearDetail({ item }: GearDetailProps) {
  const reviewCount = item._count?.reviews ?? 0;

  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    addToCart({ ...item, quantity: 1 });
    setAdded(true);
  };

  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
        <Link href="/gear" className="text-sm text-primary hover:underline">
          ← Back to gear
        </Link>

        <div className="mt-8 grid gap-8 md:grid-cols-2">
          <div className="overflow-hidden rounded-2xl bg-muted">
            <img
              src={item.photo}
              alt={item.name}
              className="aspect-[4/3] w-full object-cover"
            />
          </div>

          <div className="flex flex-col justify-center gap-5">
            <Badge className="w-fit">{item.brand}</Badge>

            <h1 className="text-4xl font-semibold tracking-tight text-primary">
              {item.name}
            </h1>

            <p className="leading-7 text-muted-foreground">
              {item.description}
            </p>

            <div>
              <span className="text-3xl font-semibold text-primary">
                ${item.pricePerDay}
              </span>

              <span className="text-muted-foreground"> / day</span>
            </div>

            <div className="text-sm text-muted-foreground">
              {reviewCount > 0 ? `${reviewCount} reviews` : "No reviews yet"}
            </div>

            <div className="text-sm text-muted-foreground">
              {item.stock > 0
                ? `${item.stock} available`
                : "Currently unavailable"}
            </div>

            <div className="flex gap-3">
              <Button
                size="lg"
                type="button"
                disabled={!item.isActive || item.stock <= 0}
                onClick={handleAddToCart}
                className="flex-1"
              >
                {added ? (
                  <>
                    <Check className="mr-2 size-5" />
                    Added to cart
                  </>
                ) : (
                  <>
                    <ShoppingCart className="mr-2 size-5" />
                    Add to cart
                  </>
                )}
              </Button>

              {added && (
                <Link href="/cart">
                  <Button size="lg" variant="outline">
                    View Cart
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
