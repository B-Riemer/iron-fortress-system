"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/layout/container";

interface MissionReport {
  operative: string;
  duration: string;
  objective: string;
  fatLoss: string;
  strength: string;
  quote: string;
}

const reports: MissionReport[] = [
  {
    operative: "J.D.",
    duration: "12 WEEKS",
    objective: "RECOMP",
    fatLoss: "-8%",
    strength: "+15%",
    quote: "Went from desk jockey to someone who can actually handle themselves. The Protocol doesn't mess around.",
  },
  {
    operative: "M.K.",
    duration: "16 WEEKS",
    objective: "MASS",
    fatLoss: "-3%",
    strength: "+28%",
    quote: "Finally found a program that builds real strength, not just show muscles. My joints feel bulletproof now.",
  },
  {
    operative: "R.T.",
    duration: "20 WEEKS",
    objective: "PERFORMANCE",
    fatLoss: "-12%",
    strength: "+22%",
    quote: "The hybrid approach changed everything. I'm faster, stronger, and more durable than I've ever been.",
  },
];

export function MissionReports() {
  return (
    <Container className="py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="space-y-12"
      >
        {/* Header */}
        <div className="text-center">
          <h2 className="font-mono text-3xl font-bold uppercase tracking-tighter text-zinc-200 mb-2">
            MISSION REPORTS
          </h2>
          <p className="font-mono text-xs text-zinc-500 uppercase tracking-widest">
            /// DECLASSIFIED TESTIMONIALS ///
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reports.map((report, index) => (
            <motion.div
              key={report.operative}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="rounded-sm border border-white/5 bg-zinc-900/50 p-6 hover:border-emerald-500/30 transition-all duration-300"
            >
              {/* Header */}
              <div className="mb-4 pb-4 border-b border-white/5">
                <p className="font-mono text-xs text-emerald-500 uppercase tracking-wider mb-1">
                  OPERATIVE: {report.operative}
                </p>
              </div>

              {/* Metrics Grid */}
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="space-y-1">
                  <p className="font-mono text-[10px] text-zinc-500 uppercase tracking-wider">
                    DURATION
                  </p>
                  <p className="font-mono text-sm font-semibold text-zinc-200">
                    {report.duration}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="font-mono text-[10px] text-zinc-500 uppercase tracking-wider">
                    OBJECTIVE
                  </p>
                  <p className="font-mono text-sm font-semibold text-zinc-200">
                    {report.objective}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="font-mono text-[10px] text-zinc-500 uppercase tracking-wider">
                    FAT LOSS
                  </p>
                  <p className="font-mono text-sm font-semibold text-emerald-500">
                    {report.fatLoss}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="font-mono text-[10px] text-zinc-500 uppercase tracking-wider">
                    STRENGTH
                  </p>
                  <p className="font-mono text-sm font-semibold text-emerald-500">
                    {report.strength}
                  </p>
                </div>
              </div>

              {/* Quote */}
              <div className="pt-4 border-t border-white/5">
                <p className="font-sans text-sm italic text-zinc-400 leading-relaxed">
                  "{report.quote}"
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </Container>
  );
}

