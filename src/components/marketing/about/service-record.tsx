"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/layout/container";
import { FileText, Calendar } from "lucide-react";

const Redacted = ({ children }: { children: React.ReactNode }) => {
  return (
    <span 
      className="relative inline-block bg-zinc-800 text-zinc-800 hover:bg-transparent hover:text-emerald-500 transition-all duration-300 cursor-help select-none rounded-sm px-1 z-10"
      style={{ 
        color: 'rgb(39 39 42)',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = 'transparent';
        e.currentTarget.style.color = 'rgb(16 185 129)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = 'rgb(39 39 42)';
        e.currentTarget.style.color = 'rgb(39 39 42)';
      }}
    >
      {children}
    </span>
  );
};

const timelineItems = [
  { year: "2018", label: "Spec Ops" },
  { year: "2021", label: "Hybrid Protocol" },
  { year: "2024", label: "Iron Fortress" },
];

export function ServiceRecord() {
  return (
    <Container>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="grid grid-cols-1 gap-12 lg:grid-cols-2 items-center py-24"
      >
        {/* Left: Text Content */}
        <div className="space-y-6">
          <div className="flex items-center gap-2 mb-4">
            <FileText className="h-5 w-5 text-emerald-500" />
            <h2 className="font-mono text-2xl font-bold uppercase tracking-wider text-zinc-200">
              OPERATOR PROFILE: <Redacted>[REDACTED]</Redacted>
            </h2>
          </div>

          <div className="rounded-sm border border-zinc-800 bg-zinc-900/50 p-6">
            <p className="font-sans text-zinc-300 leading-relaxed">
              Subject demonstrated exceptional capability in{" "}
              <Redacted>[REDACTED]</Redacted> environments. Transferred
              to civilian sector to implement{" "}
              <Redacted>Protocol 7</Redacted>.
            </p>
          </div>

          <div className="rounded-sm border border-zinc-800 bg-zinc-900/50 p-4">
            <p className="font-mono text-xs text-zinc-500 uppercase tracking-widest">
              Classification: CONFIDENTIAL
            </p>
          </div>
        </div>

        {/* Right: Timeline */}
        <div className="space-y-6">
          <div className="flex items-center gap-2 mb-4">
            <Calendar className="h-5 w-5 text-emerald-500" />
            <h3 className="font-mono text-lg font-semibold uppercase tracking-wider text-zinc-200">
              SERVICE TIMELINE
            </h3>
          </div>

          <div className="space-y-4">
            {timelineItems.map((item, index) => (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.2 }}
                className="flex items-center gap-4"
              >
                <div className="flex flex-col items-center">
                  <div className="h-3 w-3 rounded-full bg-emerald-500" />
                  {index < timelineItems.length - 1 && (
                    <div className="h-16 w-px bg-zinc-800 mt-2" />
                  )}
                </div>
                <div className="flex-1 rounded-sm border border-zinc-800 bg-zinc-900/50 p-4">
                  <p className="font-mono text-sm font-bold text-emerald-500 mb-1">
                    {item.year}
                  </p>
                  <p className="font-sans text-sm text-zinc-300">{item.label}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </Container>
  );
}

