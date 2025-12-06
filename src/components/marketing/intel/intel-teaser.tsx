"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Container } from "@/components/ui/layout/container";
import { TacticalCard } from "@/components/ui/layout/tactical-card";
import { UpgradeModal } from "@/components/ui/upgrade-modal";
import { Lock, Shield, Eye } from "lucide-react";
import { cn } from "@/lib/utils";

interface IntelCard {
  title: string;
  description: string;
  level: number;
  icon: React.ReactNode;
}

const intelCards: IntelCard[] = [
  {
    title: "Nutrition for Extended Ops",
    description: "Advanced protocols for sustained performance in high-stress environments.",
    level: 1,
    icon: <Shield className="h-5 w-5" />,
  },
  {
    title: "Sleep Optimization",
    description: "Recovery strategies for elite operators operating on minimal rest.",
    level: 2,
    icon: <Eye className="h-5 w-5" />,
  },
  {
    title: "Mental Resilience Training",
    description: "Classified techniques for maintaining peak cognitive function under pressure.",
    level: 3,
    icon: <Lock className="h-5 w-5" />,
  },
];

const levelColors = {
  1: "bg-emerald-500/20 text-emerald-500 border-emerald-500/50",
  2: "bg-yellow-500/20 text-yellow-500 border-yellow-500/50",
  3: "bg-red-500/20 text-red-500 border-red-500/50",
};

export function IntelTeaser() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [lockedCardLevel, setLockedCardLevel] = useState<number | null>(null);

  const handleCardClick = (card: IntelCard) => {
    // Level 2+ requires operator clearance
    if (card.level >= 2) {
      setLockedCardLevel(card.level);
      setIsModalOpen(true);
    }
    // Level 1 could navigate normally (not implemented here)
  };

  return (
    <Container className="py-24">
      <div className="mb-12 text-center">
        <h2 className="font-mono text-3xl font-bold uppercase tracking-wider text-zinc-200">
          INTELLIGENCE DATABASE
        </h2>
        <p className="mt-2 font-sans text-sm text-zinc-400">
          Access classified training protocols and tactical knowledge
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {[...intelCards].sort((a, b) => a.level - b.level).map((card, index) => (
          <IntelCard 
            key={card.title} 
            card={card} 
            index={index}
            onClick={() => handleCardClick(card)}
          />
        ))}
      </div>

      <UpgradeModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        level={lockedCardLevel || 2}
      />
    </Container>
  );
}

function IntelCard({ 
  card, 
  index,
  onClick,
}: { 
  card: IntelCard; 
  index: number;
  onClick?: () => void;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const isLocked = card.level >= 2;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group"
    >
      <TacticalCard 
        variant="transparent" 
        className={cn(
          "rounded-sm transition-all cursor-pointer",
          isLocked 
            ? "hover:border-red-500/50" 
            : "hover:border-emerald-500/50"
        )}
        onClick={onClick}
      >
        {/* Header with Status Indicator */}
        <div className="mb-4 flex items-center justify-between">
          <span
            className={cn(
              "border px-1 py-0.5 rounded-none font-mono text-[9px] font-semibold uppercase tracking-wider",
              levelColors[card.level as keyof typeof levelColors]
            )}
          >
            LEVEL {card.level}: {card.level === 1 ? "PUBLIC" : card.level === 2 ? "RESTRICTED" : "CLASSIFIED"}
          </span>
          <div className="flex items-center gap-2">
            <span className="font-mono text-[10px] uppercase tracking-widest text-zinc-600 group-hover:text-emerald-500 transition-colors">
              {isHovered ? "ACCESSING..." : "SECURE"}
            </span>
            <div className="text-zinc-600 group-hover:text-emerald-500 transition-colors">
              {card.icon}
            </div>
          </div>
        </div>

        {/* Title */}
        <h3 className="mb-2 text-sm font-medium tracking-wide text-zinc-300 group-hover:text-white transition-colors">
          {card.title}
        </h3>

        {/* Description */}
        <p className="font-sans text-sm text-zinc-400 leading-relaxed">
          {card.description}
        </p>
      </TacticalCard>
    </motion.div>
  );
}

