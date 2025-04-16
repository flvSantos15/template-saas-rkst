import { db } from "@/app/lib/firebase";
import Stripe from "stripe";

export async function handleStripeCancelSubscription(
  event: Stripe.CustomerSubscriptionDeletedEvent
) {
  console.log(`Cancelou a assinatura ${event.data.object.id}`);

  const customerId = event.data.object.customer;

  const userRef = await db
    .collection("users")
    .where("stripeCustomerId", "==", customerId)
    .get();

  if (userRef.empty) {
    console.log("User not found");
    return;
  }

  const userId = userRef.docs[0].id;

  await db.collection("users").doc(userId).update({
    subscriptionStatus: "inactive",
  });
}
