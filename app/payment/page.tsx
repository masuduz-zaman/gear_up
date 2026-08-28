"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";

import { Button } from "@/components/ui/button";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

const BACKEND_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL!;

function PaymentForm() {
  const stripe = useStripe();
  const elements = useElements();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setLoading(true);
    setError("");

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url:
          `${window.location.origin}/payment/success`,
      },
    });

    if (error) {
      setError(
        error.message ||
          "Payment failed. Please try again."
      );

      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      <PaymentElement />

      {error && (
        <div className="rounded-lg border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive">
          {error}
        </div>
      )}

      <Button
        type="submit"
        className="w-full"
        size="lg"
        disabled={
          !stripe ||
          !elements ||
          loading
        }
      >
        {loading ? "Processing..." : "Pay Now"}
      </Button>
    </form>
  );
}

export default function PaymentPage() {
  const searchParams = useSearchParams();

  const rentalOrderId =
    searchParams.get("orderId");

  const [clientSecret, setClientSecret] =
    useState("");

  const [amount, setAmount] =
    useState<number | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  useEffect(() => {
    if (!rentalOrderId) {
      setError(
        "Rental order ID is missing."
      );
      setLoading(false);
      return;
    }

    const createPaymentIntent =
      async () => {
        try {
          const response =
            await fetch(
              `${BACKEND_URL}/api/payments/create`,
              {
                method: "POST",
                credentials: "include",
                headers: {
                  "Content-Type":
                    "application/json",
                },
                body: JSON.stringify({
                  rentalOrderId,
                }),
              }
            );

          const result =
            await response.json();

          if (!response.ok) {
            throw new Error(
              result?.message ||
                "Failed to create payment."
            );
          }

          const paymentData =
            result?.data;

          if (
            !paymentData?.clientSecret
          ) {
            throw new Error(
              "Stripe client secret not found."
            );
          }

          setClientSecret(
            paymentData.clientSecret
          );

          setAmount(
            Number(paymentData.amount)
          );
        } catch (err) {
          setError(
            err instanceof Error
              ? err.message
              : "Something went wrong."
          );
        } finally {
          setLoading(false);
        }
      };

    createPaymentIntent();
  }, [rentalOrderId]);

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        <p className="text-muted-foreground">
          Preparing payment...
        </p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="flex min-h-screen items-center justify-center px-4">
        <div className="w-full max-w-md rounded-xl border bg-card p-6 text-center">

          <h1 className="text-xl font-semibold">
            Payment Error
          </h1>

          <p className="mt-3 text-sm text-destructive">
            {error}
          </p>

        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background px-4 py-12">

      <div className="mx-auto w-full max-w-lg">

        <div className="mb-6">
          <h1 className="text-3xl font-semibold tracking-tight">
            Payment Method
          </h1>

          <p className="mt-2 text-sm text-muted-foreground">
            Complete your payment securely with Stripe.
          </p>
        </div>

        {amount !== null && (
          <div className="mb-5 flex items-center justify-between rounded-xl border bg-card p-5">
            <span className="text-sm text-muted-foreground">
              Total
            </span>

            <span className="text-2xl font-bold text-primary">
              ${amount.toFixed(2)}
            </span>
          </div>
        )}

        <div className="rounded-xl border bg-card p-5 sm:p-6">

          <Elements
            stripe={stripePromise}
            options={{
              clientSecret,
              appearance: {
                theme: "stripe",
              },
            }}
          >
            <PaymentForm />
          </Elements>

        </div>

      </div>

    </main>
  );
}