import { mpClient } from "@/app/lib/mercado-pago";
import { Preference } from "mercadopago";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { testId, userEmail } = await req.json();

  try {
    const preference = new Preference(mpClient);

    const createdPreference = await preference.create({
      body: {
        external_reference: testId,
        metadata: { testId, userEmail },
        ...(userEmail && { payer_email: userEmail }),
        items: [
          {
            id: "",
            description: "",
            title: "",
            quantity: 1,
            unit_price: 1,
            currency_id: "BRL",
            category_id: "service",
          },
        ],
        payment_methods: {
          installments: 12, // Numero de parcelas
          // excluded_payment_methods: [
          //   {
          //     id: "boldbradesco"
          //   },
          //   {
          //     id: "pec"
          //   }
          // ],
          // excluded_payment_types: [
          //   {
          //     id: "debit_card"
          //   },
          //   {
          //     id: "credit_card"
          //   }
          // ]
        },
        auto_return: true,
        back_urls: {
          success: `${req.headers.get("origin")}/api/mercado-pago/pending`,
          failure: `${req.headers.get("origin")}/api/mercado-pago/pending`,
          pending: `${req.headers.get("origin")}/api/mercado-pago/pending`,
        },
      },
    });

    if (!createdPreference.id) {
      return NextResponse.json(
        { error: "Error creating checkout" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        preferenceId: createdPreference.id,
        initPoint: createdPreference.init_point,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Error creating checkout" },
      { status: 500 }
    );
  }
}
