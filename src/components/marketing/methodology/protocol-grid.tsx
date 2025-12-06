"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/layout/container";
import { Dumbbell, Zap, Shield } from "lucide-react";

interface ProtocolCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  index: number;
}

function ProtocolCard({ icon, title, description, index }: ProtocolCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="group relative bg-transparent border border-zinc-800 rounded-sm p-6 transition-all duration-300 hover:border-emerald-500/30"
    >
      {/* Corner Markers - Blueprint Style */}
      {/* Top Left */}
      <div className="absolute top-2 left-2 text-zinc-700 group-hover:text-emerald-500/50 transition-colors">
        <svg
          width="8"
          height="8"
          viewBox="0 0 8 8"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0 0 L0 3 M0 0 L3 0"
            stroke="currentColor"
            strokeWidth="1"
            strokeLinecap="round"
          />
        </svg>
      </div>

      {/* Top Right */}
      <div className="absolute top-2 right-2 text-zinc-700 group-hover:text-emerald-500/50 transition-colors">
        <svg
          width="8"
          height="8"
          viewBox="0 0 8 8"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8 0 L8 3 M8 0 L5 0"
            stroke="currentColor"
            strokeWidth="1"
            strokeLinecap="round"
          />
        </svg>
      </div>

      {/* Bottom Left */}
      <div className="absolute bottom-2 left-2 text-zinc-700 group-hover:text-emerald-500/50 transition-colors">
        <svg
          width="8"
          height="8"
          viewBox="0 0 8 8"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0 8 L0 5 M0 8 L3 8"
            stroke="currentColor"
            strokeWidth="1"
            strokeLinecap="round"
          />
        </svg>
      </div>

      {/* Bottom Right */}
      <div className="absolute bottom-2 right-2 text-zinc-700 group-hover:text-emerald-500/50 transition-colors">
        <svg
          width="8"
          height="8"
          viewBox="0 0 8 8"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8 8 L8 5 M8 8 L5 8"
            stroke="currentColor"
            strokeWidth="1"
            strokeLinecap="round"
          />
        </svg>
      </div>

      {/* Content */}
      <div className="relative z-10">
        <div className="mb-4 text-zinc-400 group-hover:text-emerald-500 transition-colors">
          {icon}
        </div>
        <h3 className="mb-2 font-mono text-lg font-bold uppercase tracking-wider text-zinc-200 group-hover:text-emerald-500 transition-colors">
          {title}
        </h3>
        <p className="font-sans text-sm text-zinc-400 leading-relaxed">
          {description}
        </p>
      </div>
    </motion.div>
  );
}

const protocolCards = [
  {
    icon: <Dumbbell className="h-8 w-8" strokeWidth={1.5} />,
    title: "FUNCTIONAL MASS",
    description: "Muscle built for combat utility, not aesthetics.",
  },
  {
    icon: <Zap className="h-8 w-8" strokeWidth={1.5} />,
    title: "EXPLOSIVE POWER",
    description: "Speed and force production for dynamic environments.",
  },
  {
    icon: <Shield className="h-8 w-8" strokeWidth={1.5} />,
    title: "STRUCTURAL INTEGRITY",
    description: "Bulletproofing joints and tendons against injury.",
  },
];

export function ProtocolGrid() {
  return (
    <section id="methodology" className="py-24">
      <Container>
        <div className="mb-12 text-center">
          <h2 className="font-mono text-3xl font-bold uppercase tracking-tight text-zinc-200">
            THE HYBRID PROTOCOL
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {protocolCards.map((card, index) => (
            <ProtocolCard
              key={card.title}
              icon={card.icon}
              title={card.title}
              description={card.description}
              index={index}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}

