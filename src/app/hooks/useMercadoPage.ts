import { initMercadoPago } from "@mercadopago/sdk-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export function useMercadoPago() {
  const router = useRouter();

  async function createMercadoPagoCheckout({
    testId,
    userEmail,
  }: {
    testId: string;
    userEmail: string;
  }) {
    try {
      const response = await fetch("/api/mercado-pago/create-checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ testId, userEmail }),
      });

      const data = await response.json();
      router.push(data.initPoint);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  useEffect(() => {
    initMercadoPago(process.env.NEXT_PUBLIC_MERCADO_PAGO_PUBLIC_KEY as string);
  }, []);

  return {
    createMercadoPagoCheckout,
  };
}
