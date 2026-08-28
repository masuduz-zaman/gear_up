"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Minus, Plus, ShoppingCart, Trash2, CalendarDays } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { createRental, getMyRentals } from "@/service/rental.service";
import {
  getCart,
  removeFromCart,
  updateCartQuantity,
  updateCartDates,
} from "@/service/cart_service";
import type { CartItem } from "@/service/cart_service";
function getRentalDays(startDate?: string, endDate?: string) {
  if (!startDate || !endDate) {
    return 0;
  }
  const start = new Date(startDate);
  const end = new Date(endDate);
  start.setHours(0, 0, 0, 0);
  end.setHours(0, 0, 0, 0);
  const difference = end.getTime() - start.getTime();
  const days = Math.ceil(difference / (1000 * 60 * 60 * 24));
  return days > 0 ? days : 1;
}
function formatDate(date?: string) {
  if (!date) {
    return "Select date";
  }
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}
function getErrorMessage(error: unknown) {
  if (error instanceof Error) {
    return error.message;
  }
  if (typeof error === "object" && error !== null && "message" in error) {
    return String((error as { message: unknown }).message);
  }
  return "Something went wrong. Please try again.";
}
export default function CartPage() {
  const router = useRouter();
  const [cart, setCart] = useState<CartItem[]>([]);
  const [mounted, setMounted] = useState(false);
  const [openCalendar, setOpenCalendar] = useState<{
    id: string;
    type: "start" | "end";
  } | null>(null);
  const [placeOrderLoading, setPlaceOrderLoading] = useState(false);
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  /* * After successfully placing order, * Checkout button will appear. */ const [
    orderPlaced,
    setOrderPlaced,
  ] = useState(false);
  /* * Confirmation modal */ const [showConfirmModal, setShowConfirmModal] =
    useState(false);
  /* * Message modal */ const [showMessageModal, setShowMessageModal] =
    useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalMessage, setModalMessage] = useState("");
  const [placedOrderIds, setPlacedOrderIds] = useState<string[]>([]);
  useEffect(() => {
    setCart(getCart());
    setMounted(true);
    const handleCartUpdate = () => {
      setCart(getCart());
    };
    window.addEventListener("cart-updated", handleCartUpdate);
    return () => {
      window.removeEventListener("cart-updated", handleCartUpdate);
    };
  }, []);
  useEffect(() => {
    if (!mounted || cart.length === 0) {
      return;
    }
    const checkExistingOrders = async () => {
      try {
        const rentals = await getMyRentals();
        const existingOrderIds = rentals
          .filter((rental) =>
            cart.some((item) => item.id === rental.gearItemId),
          )
          .map((rental) => rental.id);
        if (existingOrderIds.length > 0) {
          setOrderPlaced(true);
          setPlacedOrderIds(existingOrderIds);
        }
      } catch (error) {
        /* * Do not show error here. * * Cart page should still work even if * existing order checking fails. */ console.error(
          "Existing order check error:",
          error,
        );
      }
    };
    checkExistingOrders();
  }, [mounted, cart]);
  if (!mounted) {
    return null;
  }
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const total = cart.reduce((sum, item) => {
    const rentalDays = getRentalDays(item.startDate, item.endDate);
    const days = rentalDays > 0 ? rentalDays : 1;
    const itemTotal = item.pricePerDay * item.quantity * days;
    return sum + itemTotal;
  }, 0);
  const handlePlaceOrderClick = () => {
    if (cart.length === 0) {
      return;
    }
    const invalidItem = cart.find((item) => !item.startDate || !item.endDate);
    if (invalidItem) {
      setModalTitle("Rental Date Required");
      setModalMessage(
        `Please select Start Date and End Date for ${invalidItem.name} before placing your order.`,
      );
      setShowMessageModal(true);
      return;
    }
    setShowConfirmModal(true);
  };
  const handleConfirmPlaceOrder = async () => {
    if (cart.length === 0) {
      return;
    }
    try {
      setPlaceOrderLoading(true);
      const createdOrders = [];
      for (const item of cart) {
        try {
          const result = await createRental({
            gearItemId: item.id,
            startDate: item.startDate!,
            endDate: item.endDate!,
          });
          createdOrders.push(result);
        } catch (error) {
          console.error(`Failed to create order for ${item.name}:`, error);
          throw error;
        }
      }
      const ids = createdOrders
        .map((order) => order?.id)
        .filter((id): id is string => Boolean(id));
      setPlacedOrderIds(ids);
      setOrderPlaced(true);
      setShowConfirmModal(false);
      setModalTitle("Order Placed Successfully");
      setModalMessage(
        "Your order has been placed successfully. Please wait for the provider to confirm your order. Once the provider confirms it, you can proceed to payment and checkout.",
      );
      setShowMessageModal(true);
    } catch (error) {
      console.error("Place order error:", error);
      setShowConfirmModal(false);
      setModalTitle("Unable to Place Order");
      setModalMessage(getErrorMessage(error));
      setShowMessageModal(true);
    } finally {
      setPlaceOrderLoading(false);
    }
  };
const handleCheckout =
    async () => {
      if (!orderPlaced) {
        return;
      }
      try {
        setCheckoutLoading(true);
        /* * Get user's latest rentals. */ const rentals = await getMyRentals();
        /* * First try saved order IDs. */ let confirmedRental = rentals.find(
          (rental) =>
            placedOrderIds.includes(rental.id) &&
            rental.OrderStatus === "CONFIRMED",
        );
        /* * If saved ID doesn't find it, * check current cart item's order. */ if (
          !confirmedRental
        ) {
          confirmedRental = rentals.find(
            (rental) =>
              cart.some((item) => item.id === rental.gearItemId) &&
              rental.OrderStatus === "CONFIRMED",
          );
        }
        /* * Provider has NOT confirmed. */ if (!confirmedRental) {
          setModalTitle("Provider Confirmation Required");
          setModalMessage(
            "Your order has been placed, but the provider has not confirmed it yet. You can proceed to payment and checkout only after the provider confirms your order.",
          );
          setShowMessageModal(true);
          return;
        }
        /* * Provider confirmed. * * Go to payment page. */ router.push(
          `/payment?orderId=${confirmedRental.id}`,
        );
      } catch (error) {
        console.error("Checkout error:", error);
        setModalTitle("Unable to Checkout");
        setModalMessage(getErrorMessage(error));
        setShowMessageModal(true);
      } finally {
        setCheckoutLoading(false);
      }
    };
  return (
    <main className="min-h-screen bg-background">
      {" "}
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        {" "}
        {/* HEADER */}{" "}
        <div className="flex items-center justify-between gap-4">
          {" "}
          <div>
            {" "}
            <h1 className="text-3xl font-semibold tracking-tight">
              {" "}
              Your Cart{" "}
            </h1>{" "}
            <p className="mt-1 text-sm text-muted-foreground">
              {" "}
              {cart.length} {cart.length === 1 ? "item" : "items"} in your
              cart{" "}
            </p>{" "}
          </div>{" "}
          <Link href="/gear">
            {" "}
            <Button variant="outline"> Continue shopping </Button>{" "}
          </Link>{" "}
        </div>{" "}
        {/* EMPTY CART */}{" "}
        {cart.length === 0 ? (
          <div className="mt-10 flex min-h-80 flex-col items-center justify-center rounded-xl border border-dashed p-8 text-center">
            {" "}
            <ShoppingCart className="size-10 text-muted-foreground" />{" "}
            <h2 className="mt-4 text-xl font-semibold"> Your cart is empty </h2>{" "}
            <p className="mt-2 text-sm text-muted-foreground">
              {" "}
              Add some gear to get started.{" "}
            </p>{" "}
            <Link href="/gear" className="mt-5">
              {" "}
              <Button> Browse gear </Button>{" "}
            </Link>{" "}
          </div>
        ) : (
          <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_320px]">
            {" "}
            {/* CART ITEMS */}{" "}
            <div className="space-y-5">
              {" "}
              {cart.map((item) => {
                const startDate = item.startDate
                  ? new Date(item.startDate)
                  : undefined;
                const endDate = item.endDate
                  ? new Date(item.endDate)
                  : undefined;
                const rentalDays = getRentalDays(item.startDate, item.endDate);
                const days = rentalDays > 0 ? rentalDays : 1;
                const itemTotal = item.pricePerDay * item.quantity * days;
                const startOpen =
                  openCalendar?.id === item.id &&
                  openCalendar?.type === "start";
                const endOpen =
                  openCalendar?.id === item.id && openCalendar?.type === "end";
                return (
                  <div
                    key={item.id}
                    className="rounded-xl border bg-card p-4 sm:p-5"
                  >
                    {" "}
                    {/* PRODUCT */}{" "}
                    <div className="flex gap-4">
                      {" "}
                      <img
                        src={item.photo}
                        alt={item.name}
                        className="size-24 shrink-0 rounded-lg object-cover sm:size-28"
                      />{" "}
                      <div className="flex min-w-0 flex-1 flex-col justify-between">
                        {" "}
                        <div className="flex justify-between gap-3">
                          {" "}
                          <div className="min-w-0">
                            {" "}
                            <Link
                              href={`/gear/${item.id}`}
                              className="font-semibold hover:text-primary"
                            >
                              {" "}
                              {item.name}{" "}
                            </Link>{" "}
                            <p className="text-sm text-muted-foreground">
                              {" "}
                              {item.brand}{" "}
                            </p>{" "}
                          </div>{" "}
                          <button
                            type="button"
                            onClick={() => {
                              setCart(removeFromCart(item.id));
                            }}
                            className="shrink-0 text-muted-foreground hover:text-destructive"
                          >
                            {" "}
                            <Trash2 className="size-5" />{" "}
                          </button>{" "}
                        </div>{" "}
                        {/* QUANTITY */}{" "}
                        <div className="mt-4 flex items-center justify-between gap-4">
                          {" "}
                          <div className="flex items-center rounded-md border">
                            {" "}
                            <button
                              type="button"
                              className="p-2 hover:bg-muted"
                              onClick={() => {
                                setCart(
                                  updateCartQuantity(
                                    item.id,
                                    item.quantity - 1,
                                  ),
                                );
                              }}
                            >
                              {" "}
                              <Minus className="size-4" />{" "}
                            </button>{" "}
                            <span className="min-w-8 text-center text-sm">
                              {" "}
                              {item.quantity}{" "}
                            </span>{" "}
                            <button
                              type="button"
                              className="p-2 hover:bg-muted"
                              onClick={() => {
                                setCart(
                                  updateCartQuantity(
                                    item.id,
                                    item.quantity + 1,
                                  ),
                                );
                              }}
                            >
                              {" "}
                              <Plus className="size-4" />{" "}
                            </button>{" "}
                          </div>{" "}
                          <div className="text-right">
                            {" "}
                            <p className="font-semibold text-primary">
                              {" "}
                              $ {itemTotal.toFixed(2)}{" "}
                            </p>{" "}
                            <p className="text-xs text-muted-foreground">
                              {" "}
                              $ {item.pricePerDay} × {item.quantity} × {days}{" "}
                              {days === 1 ? "day" : "days"}{" "}
                            </p>{" "}
                          </div>{" "}
                        </div>{" "}
                      </div>{" "}
                    </div>{" "}
                    {/* RENTAL DATE */}{" "}
                    <div className="mt-6 border-t pt-5">
                      {" "}
                      <div className="mb-4 flex items-center gap-2">
                        {" "}
                        <CalendarDays className="size-5 text-primary" />{" "}
                        <h3 className="font-semibold"> Rental Period </h3>{" "}
                      </div>{" "}
                      <div className="grid gap-4 sm:grid-cols-2">
                        {" "}
                        {/* START DATE */}{" "}
                        <div className="relative">
                          {" "}
                          <p className="mb-2 text-sm font-medium">
                            {" "}
                            Start Date{" "}
                          </p>{" "}
                          <button
                            type="button"
                            onClick={() => {
                              setOpenCalendar(
                                startOpen
                                  ? null
                                  : { id: item.id, type: "start" },
                              );
                            }}
                            className="flex w-full items-center gap-3 rounded-lg border bg-background px-4 py-3 text-left text-sm hover:bg-muted"
                          >
                            {" "}
                            <CalendarDays className="size-4 text-primary" />{" "}
                            <span> {formatDate(item.startDate)} </span>{" "}
                          </button>{" "}
                          {startOpen && (
                            <div className="absolute left-0 top-full z-50 mt-2 rounded-lg border bg-background p-2 shadow-xl">
                              {" "}
                              <Calendar
                                mode="single"
                                selected={startDate}
                                onSelect={(date) => {
                                  if (!date) {
                                    return;
                                  }
                                  const newEndDate =
                                    endDate && endDate >= date
                                      ? endDate
                                      : undefined;
                                  setCart(
                                    updateCartDates(item.id, date, newEndDate),
                                  );
                                  setOpenCalendar(null);
                                }}
                                disabled={(date) => date < today}
                              />{" "}
                            </div>
                          )}{" "}
                        </div>{" "}
                        {/* END DATE */}{" "}
                        <div className="relative">
                          {" "}
                          <p className="mb-2 text-sm font-medium">
                            {" "}
                            End Date{" "}
                          </p>{" "}
                          <button
                            type="button"
                            onClick={() => {
                              setOpenCalendar(
                                endOpen ? null : { id: item.id, type: "end" },
                              );
                            }}
                            className="flex w-full items-center gap-3 rounded-lg border bg-background px-4 py-3 text-left text-sm hover:bg-muted"
                          >
                            {" "}
                            <CalendarDays className="size-4 text-primary" />{" "}
                            <span> {formatDate(item.endDate)} </span>{" "}
                          </button>{" "}
                          {endOpen && (
                            <div className="absolute right-0 top-full z-50 mt-2 rounded-lg border bg-background p-2 shadow-xl">
                              {" "}
                              <Calendar
                                mode="single"
                                selected={endDate}
                                onSelect={(date) => {
                                  if (!date) {
                                    return;
                                  }
                                  if (startDate && date < startDate) {
                                    return;
                                  }
                                  setCart(
                                    updateCartDates(item.id, startDate, date),
                                  );
                                  setOpenCalendar(null);
                                }}
                                disabled={(date) => {
                                  if (date < today) {
                                    return true;
                                  }
                                  if (startDate && date < startDate) {
                                    return true;
                                  }
                                  return false;
                                }}
                              />{" "}
                            </div>
                          )}{" "}
                        </div>{" "}
                      </div>{" "}
                      {/* DURATION */}{" "}
                      <div className="mt-4 rounded-lg bg-muted/50 p-4">
                        {" "}
                        <div className="flex items-center justify-between">
                          {" "}
                          <div>
                            {" "}
                            <p className="text-xs text-muted-foreground">
                              {" "}
                              Rental Duration{" "}
                            </p>{" "}
                            <p className="mt-1 font-semibold">
                              {" "}
                              {rentalDays > 0
                                ? `${rentalDays} ${rentalDays === 1 ? "day" : "days"}`
                                : "Select dates"}{" "}
                            </p>{" "}
                          </div>{" "}
                          <div className="text-right">
                            {" "}
                            <p className="text-xs text-muted-foreground">
                              {" "}
                              Item Total{" "}
                            </p>{" "}
                            <p className="mt-1 font-semibold text-primary">
                              {" "}
                              $ {itemTotal.toFixed(2)}{" "}
                            </p>{" "}
                          </div>{" "}
                        </div>{" "}
                      </div>{" "}
                    </div>{" "}
                  </div>
                );
              })}{" "}
            </div>{" "}
            {/* ORDER SUMMARY */}{" "}
            <aside className="h-fit rounded-xl border bg-card p-5 lg:sticky lg:top-5">
              {" "}
              <h2 className="text-lg font-semibold"> Order Summary </h2>{" "}
              <div className="mt-5 space-y-3 border-b pb-4">
                {" "}
                {cart.map((item) => {
                  const rentalDays = getRentalDays(
                    item.startDate,
                    item.endDate,
                  );
                  const days = rentalDays > 0 ? rentalDays : 1;
                  const itemTotal = item.pricePerDay * item.quantity * days;
                  return (
                    <div
                      key={item.id}
                      className="flex justify-between gap-4 text-sm"
                    >
                      {" "}
                      <div className="min-w-0">
                        {" "}
                        <p className="truncate font-medium">
                          {" "}
                          {item.name}{" "}
                        </p>{" "}
                        <p className="text-xs text-muted-foreground">
                          {" "}
                          {item.quantity} × {days}{" "}
                          {days === 1 ? "day" : "days"}{" "}
                        </p>{" "}
                      </div>{" "}
                      <span className="shrink-0 font-medium">
                        {" "}
                        $ {itemTotal.toFixed(2)}{" "}
                      </span>{" "}
                    </div>
                  );
                })}{" "}
              </div>{" "}
              {/* TOTAL */}{" "}
              <div className="mt-4 flex justify-between">
                {" "}
                <span className="font-semibold"> Total </span>{" "}
                <span className="text-xl font-semibold text-primary">
                  {" "}
                  ${total.toFixed(2)}{" "}
                </span>{" "}
              </div>{" "}
              {/* BEFORE ORDER: ONLY PLACE ORDER AFTER ORDER: ONLY CHECKOUT */}{" "}
              {!orderPlaced ? (
                <Button
                  className="mt-5 w-full"
                  size="lg"
                  onClick={handlePlaceOrderClick}
                  disabled={placeOrderLoading}
                >
                  {" "}
                  {placeOrderLoading ? "Placing Order..." : "Place Order"}{" "}
                </Button>
              ) : (
                <Button
                  className="mt-5 w-full"
                  size="lg"
                  onClick={handleCheckout}
                  disabled={checkoutLoading}
                >
                  {" "}
                  {checkoutLoading ? "Checking Order..." : "Checkout"}{" "}
                </Button>
              )}{" "}
              {/* STATUS TEXT */}{" "}
              {orderPlaced && (
                <p className="mt-3 text-center text-xs text-muted-foreground">
                  {" "}
                  Your order is waiting for provider confirmation.{" "}
                </p>
              )}{" "}
            </aside>{" "}
          </div>
        )}{" "}
      </div>{" "}
      {/* ===================================================== PLACE ORDER CONFIRMATION MODAL ===================================================== */}{" "}
      <Dialog open={showConfirmModal} onOpenChange={setShowConfirmModal}>
        {" "}
        <DialogContent>
          {" "}
          <DialogHeader>
            {" "}
            <DialogTitle> Confirm Your Order </DialogTitle>{" "}
            <DialogDescription>
              {" "}
              Are you sure you want to place this rental order? You will need to
              wait for the provider to confirm the order before you can proceed
              to payment.{" "}
            </DialogDescription>{" "}
          </DialogHeader>{" "}
          <DialogFooter>
            {" "}
            <Button
              variant="outline"
              onClick={() => setShowConfirmModal(false)}
              disabled={placeOrderLoading}
            >
              {" "}
              Cancel{" "}
            </Button>{" "}
            <Button
              onClick={handleConfirmPlaceOrder}
              disabled={placeOrderLoading}
            >
              {" "}
              {placeOrderLoading ? "Placing..." : "Yes, Place Order"}{" "}
            </Button>{" "}
          </DialogFooter>{" "}
        </DialogContent>{" "}
      </Dialog>{" "}
      {/* ===================================================== MESSAGE MODAL ===================================================== */}{" "}
      <Dialog open={showMessageModal} onOpenChange={setShowMessageModal}>
        {" "}
        <DialogContent>
          {" "}
          <DialogHeader>
            {" "}
            <DialogTitle> {modalTitle} </DialogTitle>{" "}
            <DialogDescription className="pt-2">
              {" "}
              {modalMessage}{" "}
            </DialogDescription>{" "}
          </DialogHeader>{" "}
          <DialogFooter>
            {" "}
            <Button onClick={() => setShowMessageModal(false)}>
              {" "}
              OK{" "}
            </Button>{" "}
          </DialogFooter>{" "}
        </DialogContent>{" "}
      </Dialog>{" "}
    </main>
  );
}
