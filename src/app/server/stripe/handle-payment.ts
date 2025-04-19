import { db } from "@/app/lib/firebase";
import { resend } from "@/app/lib/resend";
import "server-only";

import Stripe from "stripe";

export async function handleStripePayment(
  event: Stripe.CheckoutSessionCompletedEvent
) {
  if (event.data.object.payment_status === "paid") {
    const metadata = event.data.object.metadata;
    const userEmail = metadata?.user_mail;

    const userId = metadata?.userId;

    if (!userId || !userEmail) {
      console.log("User not found");
      return;
    }

    await db.collection("users").doc(userId).update({
      stripeSubscriptionId: event.data.object.subscription,
      subscriptionStatus: "active",
    });

    const { data, error } = await resend.emails.send({
      from: "Acme <flvsantos300@gmail.com>",
      to: userEmail,
      subject: "Assinatura criada com sucesso",
      html: "<h1>Assinatura criada com sucesso</h1>",
    });

    if (error) {
      console.log(error);
    }

    console.log(data);
  }
}
