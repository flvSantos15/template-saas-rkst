"use client";

import { useStripe } from "@/app/hooks/useStripe";

export default function Pagamentos() {
  const {
    createPaymentStripeCheckout,
    createPortalStripeCheckout,
    createSubscriptionStripeCheckout,
  } = useStripe();

  return (
    <div className="flex flex-col items-center justify-center gap-10 h-screen">
      <h1 className="text-gray-800">Pagamentos</h1>
      <button
        className="border rounded-md px-1"
        onClick={() => createPaymentStripeCheckout({ testId: "123" })}
      >
        Criar Pagamento Stripe
      </button>
      <button
        className="border rounded-md px-1"
        onClick={() => createSubscriptionStripeCheckout({ testeId: "123" })}
      >
        Criar Assinatura Stripe
      </button>
      <button
        className="border rounded-md px-1"
        onClick={createPortalStripeCheckout}
      >
        Criar Portal de Pagamentos
      </button>
    </div>
  );
}
