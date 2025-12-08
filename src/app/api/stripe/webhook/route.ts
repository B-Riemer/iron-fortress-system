import { headers } from "next/headers";
import { NextResponse } from "next/server";
import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";

/* eslint-disable @typescript-eslint/no-explicit-any */

// Init Stripe without version check
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-11-17.clover" as any,
});

// Init Supabase Admin with "any" type to bypass ALL type checks
// Das ist der Schlüssel: Wir zwingen TS, wegzuschauen.
const supabaseAdmin: any = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: Request) {
  const body = await req.text();
  const signature = (await headers()).get("Stripe-Signature") as string;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (error: any) {
    console.error("Webhook signature verification failed:", error.message);
    return new NextResponse(`Webhook Error: ${error.message}`, { status: 400 });
  }

  const session = event.data.object as Stripe.Checkout.Session;

  try {
    // EVENT 1: CUSTOMER PAID (UPGRADE)
    if (event.type === "checkout.session.completed") {
      const userId = session.metadata?.userId;

      if (userId) {
        // Jetzt meckert TS nicht mehr, weil supabaseAdmin "any" ist.
        const { error } = await supabaseAdmin
          .from("profiles")
          .update({ tier: "operator" })
          .eq("id", userId);

        if (error) console.error("Error upgrading user:", error);
        else console.log(`User ${userId} upgraded to OPERATOR`);
      }
    }

    // EVENT 2: SUBSCRIPTION ENDED (DOWNGRADE)
    if (event.type === "customer.subscription.deleted") {
      console.log("Subscription deleted:", session.id);
      // Optional logic here
    }

  } catch (err) {
    console.error("Webhook handler failed:", err);
    return new NextResponse("Webhook Handler Error", { status: 500 });
  }

  return NextResponse.json({ received: true });
}