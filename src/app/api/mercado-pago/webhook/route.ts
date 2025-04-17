import { mpClient, validateMercadoPagoWebook } from "@/app/lib/mercado-pago";
import { handleMercadoPagoPayment } from "@/app/server/mercado/handle-payment";
import { Payment } from "mercadopago";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    validateMercadoPagoWebook(req);

    const body = await req.json();

    const { type, data } = body;

    switch (type) {
      case "payment":
        const payment = new Payment(mpClient);
        const paymentData = await payment.get({
          id: data.id,
        });

        if (
          paymentData.status === "approved" ||
          paymentData.date_approved !== null
        ) {
          await handleMercadoPagoPayment(paymentData);
        }
        break;
      case "subscription_preapproval":
        break;
      default:
        console.log("This event is not supported");
    }

    return NextResponse.json({ received: true }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
