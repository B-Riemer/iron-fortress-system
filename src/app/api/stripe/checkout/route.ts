import { NextResponse } from "next/server";
import Stripe from "stripe";
import { createClient } from "@/lib/supabase/server";

// Initialize Stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-11-20.acacia",
});

export async function POST() {
  try {
    // Get authenticated user
    const supabase = await createClient();
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json(
        { error: "Unauthorized. Please log in to proceed." },
        { status: 401 }
      );
    }

    if (!user.email) {
      return NextResponse.json(
        { error: "User email is required." },
        { status: 400 }
      );
    }

    // Validate environment variables
    const priceId = process.env.STRIPE_PRICE_ID_OPERATOR;

    if (!priceId) {
      console.error("STRIPE_PRICE_ID_OPERATOR is not set in environment variables");
      return NextResponse.json(
        { error: "Checkout configuration missing. STRIPE_PRICE_ID_OPERATOR not set." },
        { status: 500 }
      );
    }

    // Get base URL from environment or derive from request
    let baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    
    // If not set, try to derive from request headers (for development)
    if (!baseUrl) {
      // This will work in production if the request comes through properly
      // For development, we can fall back to localhost
      baseUrl = process.env.VERCEL_URL 
        ? `https://${process.env.VERCEL_URL}`
        : "http://localhost:3000";
      
      console.warn("NEXT_PUBLIC_BASE_URL not set, using derived URL:", baseUrl);
    }

    // Validate Stripe secret key
    if (!process.env.STRIPE_SECRET_KEY) {
      console.error("STRIPE_SECRET_KEY is not set in environment variables");
      return NextResponse.json(
        { error: "Checkout configuration missing. STRIPE_SECRET_KEY not set." },
        { status: 500 }
      );
    }

    // Create Checkout Session
    const session = await stripe.checkout.sessions.create({
      customer_email: user.email,
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: "subscription",
      success_url: `${baseUrl}/dashboard?payment=success`,
      cancel_url: `${baseUrl}/?payment=cancelled`,
      metadata: {
        userId: user.id, // VITAL: This is our bridge to the webhook
      },
    });

    // Return the checkout URL
    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Error creating Stripe checkout session:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Failed to create checkout session. Please try again.",
      },
      { status: 500 }
    );
  }
}

