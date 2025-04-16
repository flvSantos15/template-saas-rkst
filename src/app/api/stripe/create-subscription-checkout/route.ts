import { auth } from "@/app/lib/auth";
import stripe from "@/app/lib/stripe";
import { getOrCreateCustomer } from "@/app/server/stripe/get-customer-id";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { testId } = await req.json();

  const price = process.env.STRIPE_PRODUCT_PRICE_ID as string;

  if (!price) {
    return NextResponse.json({ error: "Price not found" }, { status: 400 });
  }

  const session = await auth();
  const userId = session?.user?.id;
  const userEmail = session?.user?.email;

  if (!userId || !userEmail) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const customerId = await getOrCreateCustomer(userId, userEmail);

  const metadata = {
    testId,
    price,
    userId,
  };

  // Criar um usuário no Stripe para ter referencia no portal

  try {
    const session = await stripe.checkout.sessions.create({
      line_items: [{ price, quantity: 1 }],
      mode: "subscription",
      payment_method_types: ["card"],
      success_url: `${req.headers.get("origin")}/success`,
      cancel_url: `${req.headers.get("origin")}/`,
      metadata,
      customer: customerId,
    });

    if (!session.url) {
      return NextResponse.json(
        { error: "Session URL not found" },
        { status: 500 }
      );
    }

    return NextResponse.json({ sessionId: session.id });
  } catch (error) {
    console.log(error);
    return NextResponse.error();
  }
}
