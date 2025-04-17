import { loadStripe, Stripe } from "@stripe/stripe-js";
import { useEffect, useState } from "react";

export function useStripe() {
  const [stripe, setStripe] = useState<Stripe | null>(null);

  async function loadStripeAsync() {
    const stripeInstance = await loadStripe(
      process.env.NEXT_PUBLIC_STRIPE_PUB_KEY as string
    );
    setStripe(stripeInstance);
  }

  async function createPaymentStripeCheckout(checkoutData: { testId: string }) {
    if (!stripe) return;

    try {
      const response = await fetch("/api/stripe/create-pay-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(checkoutData),
      });

      const data = await response.json();

      await stripe.redirectToCheckout({ sessionId: data.sessionId });
    } catch (error) {
      console.log(error);
    }
  }

  async function createSubscriptionStripeCheckout(checkoutData: {
    testId: string;
  }) {
    if (!stripe) return;

    try {
      const response = await fetch("/api/stripe/create-subscription-checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(checkoutData),
      });

      const data = await response.json();

      await stripe.redirectToCheckout({ sessionId: data.sessionId });
    } catch (error) {
      console.log(error);
    }
  }

  async function createPortalStripeCheckout() {
    if (!stripe) return;

    try {
      const response = await fetch("/api/stripe/create-portal", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      window.location.href = data.url;
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    loadStripeAsync();
  }, []);

  return {
    createPaymentStripeCheckout,
    createSubscriptionStripeCheckout,
    createPortalStripeCheckout,
  };
}
