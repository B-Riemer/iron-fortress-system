"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Container } from "@/components/ui/layout/container";
import { ButtonPrimary } from "@/components/ui/button/button-primary";
import { ButtonSecondary } from "@/components/ui/button/button-secondary";
import { Check, X, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ClearanceLevel } from "@/lib/types/clearance";
import { useRouter } from "next/navigation";

interface PricingCard {
  level: ClearanceLevel;
  price: string;
  features: { text: string; included: boolean }[];
  buttonText: string;
  buttonHref?: string;
  highlighted?: boolean;
  badge?: string;
}

const pricingCards: PricingCard[] = [
  {
    level: "RECRUIT",
    price: "0€",
    features: [
      { text: "Basic Access", included: true },
      { text: "Public Intel", included: false },
      { text: "Standard Logs", included: false },
      { text: "Full Protocol Access", included: false },
      { text: "Classified Intel", included: false },
      { text: "Advanced Metrics", included: false },
      { text: "Priority Support", included: false },
    ],
    buttonText: "INITIATE SEQUENCING",
    buttonHref: "/login",
  },
  {
    level: "OPERATOR",
    price: "29€ / MO",
    highlighted: true,
    badge: "MOST DEPLOYED",
    features: [
      { text: "Basic Access", included: true },
      { text: "Public Intel", included: true },
      { text: "Standard Logs", included: true },
      { text: "Full Protocol Access", included: true },
      { text: "Classified Intel", included: true },
      { text: "Advanced Metrics", included: true },
      { text: "Priority Support", included: true },
    ],
    buttonText: "REQUEST CLEARANCE",
    // No buttonHref - will trigger checkout instead
  },
  {
    level: "SHADOW",
    price: "APPLICATION ONLY",
    features: [
      { text: "Basic Access", included: true },
      { text: "Public Intel", included: true },
      { text: "Standard Logs", included: true },
      { text: "Full Protocol Access", included: true },
      { text: "Classified Intel", included: true },
      { text: "Advanced Metrics", included: true },
      { text: "Priority Support", included: true },
      { text: "1:1 Strategy", included: true },
      { text: "Custom Protocols", included: true },
      { text: "Direct Comms Line", included: true },
    ],
    buttonText: "APPLY FOR EVALUATION",
    buttonHref: "/login",
  },
];

function TacticalCrate({
  children,
  highlighted = false,
  className,
}: {
  children: React.ReactNode;
  highlighted?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative flex flex-col p-8 bg-zinc-900/40 border rounded-sm overflow-hidden",
        highlighted
          ? "border-emerald-500 shadow-[0_0_40px_-10px_rgba(16,185,129,0.3)]"
          : "border-zinc-800",
        className
      )}
    >
      {/* Corner Rivets - Top Left */}
      <div className="absolute top-0 left-0 w-1.5 h-1.5 bg-zinc-700" />
      {/* Corner Rivets - Top Right */}
      <div className="absolute top-0 right-0 w-1.5 h-1.5 bg-zinc-700" />
      {/* Corner Rivets - Bottom Left */}
      <div className="absolute bottom-0 left-0 w-1.5 h-1.5 bg-zinc-700" />
      {/* Corner Rivets - Bottom Right */}
      <div className="absolute bottom-0 right-0 w-1.5 h-1.5 bg-zinc-700" />
      {children}
    </div>
  );
}

export function PricingSection() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleCheckout = async () => {
    setIsLoading(true);

    try {
      const response = await fetch("/api/stripe/checkout", {
        method: "POST",
      });

      // Handle 401: Redirect to login
      if (response.status === 401) {
        router.push("/login");
        setIsLoading(false);
        return;
      }

      // Parse response data
      let data;
      try {
        data = await response.json();
      } catch (parseError) {
        throw new Error("Invalid response from server");
      }

      if (!response.ok) {
        // Log the error for debugging
        console.error("Checkout API error:", data.error, "Status:", response.status);
        throw new Error(data.error || "Failed to create checkout session");
      }

      if (data.url) {
        // Redirect to Stripe Checkout
        window.location.href = data.url;
      } else {
        throw new Error("No checkout URL received");
      }
    } catch (error) {
      console.error("Checkout error:", error);
      alert("Checkout System Offline");
      setIsLoading(false);
    }
  };

  return (
    <section id="pricing" className="py-24">
      <Container>
        {/* Headline */}
        <div className="mb-12 text-center">
          <h2 className="font-mono text-3xl font-bold uppercase tracking-tighter text-zinc-200">
            CLEARANCE LEVELS
          </h2>
        </div>

        {/* Pricing Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pricingCards.map((card, index) => {
            const isOperatorCard = card.level === "OPERATOR";
            const shouldUseCheckout = isOperatorCard && !card.buttonHref;

            return (
              <motion.div
                key={card.level}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <TacticalCrate highlighted={card.highlighted} className="h-full">
                  {/* Badge */}
                  {card.badge && (
                    <div className="mb-4 text-center">
                      <span className="inline-block rounded-sm border border-emerald-500/50 bg-emerald-500/10 px-3 py-1 font-mono text-[10px] font-semibold uppercase tracking-wider text-emerald-500">
                        {card.badge}
                      </span>
                    </div>
                  )}

                  {/* Title */}
                  <h3 className="mb-2 font-mono text-xl font-bold uppercase tracking-wider text-zinc-200">
                    {card.level}
                  </h3>

                  {/* Price */}
                  <div className="mb-6">
                    <p
                      className={cn(
                        "font-mono text-2xl font-bold tracking-tight",
                        card.highlighted
                          ? "text-emerald-500"
                          : "text-zinc-300"
                      )}
                    >
                      {card.price}
                    </p>
                  </div>

                  {/* Features */}
                  <ul className="mb-8 flex-1 space-y-3">
                    {card.features.map((feature, featureIndex) => (
                      <li
                        key={featureIndex}
                        className="flex items-start gap-3"
                      >
                        {feature.included ? (
                          <Check className="mt-0.5 h-5 w-5 shrink-0 text-emerald-500" />
                        ) : (
                          <X className="mt-0.5 h-5 w-5 shrink-0 text-zinc-800" />
                        )}
                        <span
                          className={cn(
                            "font-sans text-sm",
                            feature.included
                              ? "text-zinc-300"
                              : "text-zinc-600"
                          )}
                        >
                          {feature.text}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {/* Button */}
                  <div className="mt-auto">
                    {card.highlighted ? (
                      shouldUseCheckout ? (
                        <ButtonPrimary
                          onClick={handleCheckout}
                          disabled={isLoading}
                          className="w-full rounded-sm disabled:opacity-50 disabled:cursor-not-allowed"
                          as="button"
                        >
                          {isLoading ? (
                            <span className="flex items-center justify-center gap-2">
                              <Loader2 className="h-4 w-4 animate-spin" />
                              INITIATING UPLINK...
                            </span>
                          ) : (
                            card.buttonText
                          )}
                        </ButtonPrimary>
                      ) : (
                        <ButtonPrimary
                          href={card.buttonHref || "/login"}
                          as="link"
                          className="w-full rounded-sm"
                        >
                          {card.buttonText}
                        </ButtonPrimary>
                      )
                    ) : (
                      <ButtonSecondary
                        href={card.buttonHref || "/login"}
                        as="link"
                        className="w-full rounded-sm"
                      >
                        {card.buttonText}
                      </ButtonSecondary>
                    )}
                  </div>
                </TacticalCrate>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

