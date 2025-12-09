/* eslint-disable @typescript-eslint/no-explicit-any */
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";

// Init Stripe (Safe Mode: Fallback to empty string to prevent build crash)
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: "2025-11-17.clover" as any,
});

export async function POST(req: Request) {
  const body = await req.text();
  
  // Await headers in Next.js 16/15+
  const headerPayload = await headers();
  const signature = headerPayload.get("Stripe-Signature") as string;

  // --- HIER IST DIE ÄNDERUNG: INITIALISIERUNG IM SICHEREN BEREICH ---
  // Wir starten Supabase erst hier drinnen. Wenn Keys fehlen, crasht es erst zur Laufzeit, nicht beim Build.
  const supabaseAdmin: any = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || "",
    process.env.SUPABASE_SERVICE_ROLE_KEY || ""
  );
  // ------------------------------------------------------------------

  let event: Stripe.Event;

  try {
    if (!process.env.STRIPE_WEBHOOK_SECRET) throw new Error("Missing Webhook Secret");
    
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
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
        // Force update using 'any' to bypass strict type checks
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
      // Optional: Logic to downgrade user would go here
    }

  } catch (err) {
    console.error("Webhook handler failed:", err);
    return new NextResponse("Webhook Handler Error", { status: 500 });
  }

  return NextResponse.json({ received: true });
}