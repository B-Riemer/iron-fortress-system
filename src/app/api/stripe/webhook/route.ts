import { NextResponse } from "next/server";
import { headers } from "next/headers";
import Stripe from "stripe";
import { createAdminClient } from "@/lib/supabase/admin";

// Initialize Stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-11-20.acacia",
});

// Disable body parsing for webhook route (we need raw body)
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    // Get the signature from headers
    const headersList = await headers();
    const signature = headersList.get("stripe-signature");

    if (!signature) {
      console.error("Missing stripe-signature header");
      return NextResponse.json(
        { error: "Missing signature" },
        { status: 400 }
      );
    }

    // Get raw body text
    const body = await req.text();

    // Verify webhook signature
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
    if (!webhookSecret) {
      console.error("STRIPE_WEBHOOK_SECRET is not set");
      return NextResponse.json(
        { error: "Webhook secret not configured" },
        { status: 500 }
      );
    }

    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Unknown error occurred";
      console.error(`Webhook signature verification failed: ${errorMessage}`);
      return NextResponse.json(
        { error: `Webhook Error: ${errorMessage}` },
        { status: 400 }
      );
    }

    // Handle the event
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;

        // Extract userId from metadata (CRITICAL: This is our bridge!)
        const userId = session.metadata?.userId;

        if (!userId) {
          console.error("No userId found in session metadata", {
            sessionId: session.id,
            metadata: session.metadata,
          });
          return NextResponse.json(
            { error: "Missing userId in session metadata" },
            { status: 400 }
          );
        }

        // Use admin client to bypass RLS
        const supabaseAdmin = createAdminClient();

        // Update user tier to 'operator'
        const { error: updateError } = await supabaseAdmin
          .from("profiles")
          .update({ tier: "operator" })
          .eq("id", userId);

        if (updateError) {
          console.error("Error updating user tier:", updateError, {
            userId,
            sessionId: session.id,
          });
          return NextResponse.json(
            {
              error: `Failed to update user tier: ${updateError.message}`,
            },
            { status: 500 }
          );
        }

        console.log(`Successfully upgraded user ${userId} to operator tier`, {
          sessionId: session.id,
        });
        break;
      }

      case "customer.subscription.deleted": {
        const subscription = event.data.object as Stripe.Subscription;

        // For subscription deletion, we need to find the user
        // We can look up by customer ID or store it in subscription metadata
        // For now, we'll need to retrieve the customer and find the associated user
        const customerId = subscription.customer as string;

        try {
          const customer = await stripe.customers.retrieve(customerId);

          if (typeof customer !== "object" || customer.deleted) {
            console.error("Customer not found or deleted", { customerId });
            break;
          }

          const customerEmail = customer.email;

          if (!customerEmail) {
            console.error("Customer email not found", { customerId });
            break;
          }

          // Use admin client to bypass RLS
          const supabaseAdmin = createAdminClient();

          // Find user by email and downgrade tier
          const { data: profile, error: findError } = await supabaseAdmin
            .from("profiles")
            .select("id")
            .eq("email", customerEmail)
            .maybeSingle();

          if (findError) {
            console.error("Error finding user profile:", findError, {
              customerEmail,
            });
            break;
          }

          if (!profile) {
            console.error("User profile not found", { customerEmail });
            break;
          }

          // Downgrade tier to 'recruit'
          const { error: updateError } = await supabaseAdmin
            .from("profiles")
            .update({ tier: "recruit" })
            .eq("id", profile.id);

          if (updateError) {
            console.error("Error downgrading user tier:", updateError, {
              userId: profile.id,
              subscriptionId: subscription.id,
            });
          } else {
            console.log(
              `Successfully downgraded user ${profile.id} to recruit tier`,
              {
                subscriptionId: subscription.id,
              }
            );
          }
        } catch (stripeError) {
          console.error("Error handling subscription deletion:", stripeError, {
            subscriptionId: subscription.id,
          });
        }
        break;
      }

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    // Return success response
    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Webhook error:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Webhook processing failed",
      },
      { status: 500 }
    );
  }
}

