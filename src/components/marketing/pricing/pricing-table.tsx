"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/layout/container";
import { ButtonPrimary } from "@/components/ui/button/button-primary";
import { ButtonSecondary } from "@/components/ui/button/button-secondary";
import { Check, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface PricingTier {
  title: string;
  price: string;
  description?: string;
  features: { text: string; included: boolean }[];
  buttonText: string;
  buttonHref?: string;
  highlighted?: boolean;
  badge?: string;
}

const tiers: PricingTier[] = [
  {
    title: "RECRUIT",
    price: "0€ / MO",
    features: [
      { text: "Basic Access", included: true },
      { text: "Public Intel", included: true },
      { text: "Standard Logs", included: true },
      { text: "Full Protocol Access", included: false },
      { text: "Classified Intel", included: false },
      { text: "Advanced Metrics", included: false },
      { text: "Priority Support", included: false },
    ],
    buttonText: "INITIATE",
    buttonHref: "/login",
  },
  {
    title: "OPERATOR",
    price: "29€ / MO",
    highlighted: true,
    badge: "RECOMMENDED LOADOUT",
    features: [
      { text: "Basic Access", included: true },
      { text: "Public Intel", included: true },
      { text: "Standard Logs", included: true },
      { text: "Full Protocol Access", included: true },
      { text: "Classified Intel (Level 2)", included: true },
      { text: "Advanced Metrics", included: true },
      { text: "Priority Support", included: true },
    ],
    buttonText: "REQUEST CLEARANCE",
    buttonHref: "/login",
  },
  {
    title: "SHADOW",
    price: "APPLICATION ONLY",
    features: [
      { text: "Basic Access", included: true },
      { text: "Public Intel", included: true },
      { text: "Standard Logs", included: true },
      { text: "Full Protocol Access", included: true },
      { text: "Classified Intel (Level 2)", included: true },
      { text: "Advanced Metrics", included: true },
      { text: "Priority Support", included: true },
      { text: "1:1 Strategy", included: true },
      { text: "Custom Protocols", included: true },
      { text: "Direct Comms Line", included: true },
    ],
    buttonText: "APPLY FOR ACCESS",
    buttonHref: "/login",
  },
];

function RivetCrate({
  children,
  highlighted = false,
  stealth = false,
  className,
}: {
  children: React.ReactNode;
  highlighted?: boolean;
  stealth?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative rounded-sm border bg-zinc-900/40 p-8",
        highlighted
          ? "border-emerald-500 shadow-[0_0_30px_-10px_rgba(16,185,129,0.2)]"
          : stealth
          ? "border-zinc-700"
          : "border-zinc-800",
        className
      )}
    >
      {/* Rivets - Top Left */}
      <div className="absolute -top-1 -left-1 h-2 w-2 rounded-sm bg-zinc-800 border border-zinc-700" />
      {/* Rivets - Top Right */}
      <div className="absolute -top-1 -right-1 h-2 w-2 rounded-sm bg-zinc-800 border border-zinc-700" />
      {/* Rivets - Bottom Left */}
      <div className="absolute -bottom-1 -left-1 h-2 w-2 rounded-sm bg-zinc-800 border border-zinc-700" />
      {/* Rivets - Bottom Right */}
      <div className="absolute -bottom-1 -right-1 h-2 w-2 rounded-sm bg-zinc-800 border border-zinc-700" />
      {children}
    </div>
  );
}

export function PricingTable() {
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
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {tiers.map((tier, index) => (
            <motion.div
              key={tier.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <RivetCrate 
                highlighted={tier.highlighted} 
                stealth={tier.title === "SHADOW"}
                className="h-full flex flex-col"
              >
                {/* Badge */}
                {tier.badge && (
                  <div className="mb-4 text-center">
                    <span className="inline-block rounded-sm border border-emerald-500/50 bg-emerald-500/10 px-3 py-1 font-mono text-[10px] font-semibold uppercase tracking-wider text-emerald-500">
                      {tier.badge}
                    </span>
                  </div>
                )}

                {/* Title */}
                <h3 className="mb-2 font-mono text-xl font-bold uppercase tracking-wider text-zinc-200">
                  {tier.title}
                </h3>

                {/* Price */}
                <div className="mb-6">
                  <p
                    className={cn(
                      "font-mono text-2xl font-bold tracking-tight",
                      tier.highlighted
                        ? "text-emerald-500"
                        : "text-zinc-300"
                    )}
                  >
                    {tier.price}
                  </p>
                </div>

                {/* Features */}
                <ul className="mb-8 flex-1 space-y-3">
                  {tier.features.map((feature, featureIndex) => (
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
                  {tier.highlighted ? (
                    <ButtonPrimary
                      href={tier.buttonHref}
                      as="link"
                      className="w-full"
                    >
                      {tier.buttonText}
                    </ButtonPrimary>
                  ) : tier.title === "SHADOW" ? (
                    <ButtonSecondary
                      href={tier.buttonHref}
                      as="link"
                      className="w-full"
                    >
                      {tier.buttonText}
                    </ButtonSecondary>
                  ) : (
                    <ButtonSecondary
                      href={tier.buttonHref}
                      as="link"
                      className="w-full"
                    >
                      {tier.buttonText}
                    </ButtonSecondary>
                  )}
                </div>
              </RivetCrate>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}

