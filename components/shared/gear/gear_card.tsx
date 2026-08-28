"use client";

import Link from "next/link";
import { Heart } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { GearItem } from "@/lib/type";
import { addToCart } from "@/service/cart_service";

interface GearCardProps {
  item: GearItem;
  liked: boolean;
  onToggleLike: (id: string) => void;
}

export function GearCard({
  item,
  liked,
  onToggleLike,
}: GearCardProps) {
  const reviewCount =
    item._count?.reviews ?? 0;

  const handleCart = () => {
    addToCart({ ...item, quantity: 1 });
    onToggleLike(item.id);
  };

  return (
    <article className="group overflow-hidden rounded-xl border bg-card transition-shadow hover:shadow-md">
      <div className="relative aspect-[4/3] overflow-hidden bg-muted">
        <img
          src={item.photo}
          alt={item.name}
          className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        <Badge className="absolute left-3 top-3">
          {item.brand}
        </Badge>

        <button
          type="button"
          aria-label={`Add ${item.name} to cart`}
          onClick={handleCart}
          className="absolute right-3 top-3 grid size-9 place-items-center rounded-full bg-card/90 text-primary shadow-sm transition hover:bg-primary hover:text-primary-foreground"
        >
          <Heart
            className="size-5"
            fill={
              liked
                ? "currentColor"
                : "none"
            }
          />
        </button>
      </div>

      <div className="flex flex-col gap-3 p-4">
        <div>
          <p className="text-xs text-muted-foreground">
            {item.brand}
          </p>

          <Link
            href={`/gear/${item.id}`}
            className="mt-1 block text-lg font-semibold hover:text-primary"
          >
            {item.name}
          </Link>

          <p className="mt-1 line-clamp-2 text-sm leading-6 text-muted-foreground">
            {item.description}
          </p>
        </div>

        <div className="flex items-end justify-between border-t pt-3">
          <div>
            <span className="text-lg font-semibold text-primary">
              ${item.pricePerDay}
            </span>

            <span className="text-sm text-muted-foreground">
              {" "}
              / day
            </span>

            <p className="mt-1 text-xs text-muted-foreground">
              {reviewCount} reviews
            </p>
          </div>

          <Link
            href={`/gear/${item.id}`}
            className="inline-flex h-8 items-center justify-center rounded-md bg-primary px-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            View details
          </Link>
        </div>
      </div>
    </article>
  );
}
