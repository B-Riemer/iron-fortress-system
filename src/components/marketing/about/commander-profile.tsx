"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Container } from "@/components/ui/layout/container";
import { Calendar } from "lucide-react";

const timelineItems = [
  { year: "2018", label: "Spec Ops" },
  { year: "2021", label: "Hybrid Protocol" },
  { year: "2024", label: "Iron Fortress" },
];

export function CommanderProfile() {
  return (
    <Container className="py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="grid grid-cols-1 gap-12 items-center lg:grid-cols-2"
      >
        {/* Left Column: Portrait */}
        <div className="relative">
          {/* Tech Frame - Corner Brackets */}
          {/* Top Left */}
          <svg
            className="absolute -top-2 -left-2 w-4 h-4 text-zinc-700"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0 0 L0 6 M0 0 L6 0"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>

          {/* Top Right */}
          <svg
            className="absolute -top-2 -right-2 w-4 h-4 text-zinc-700"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M16 0 L16 6 M16 0 L10 0"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>

          {/* Bottom Left */}
          <svg
            className="absolute -bottom-2 -left-2 w-4 h-4 text-zinc-700"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0 16 L0 10 M0 16 L6 16"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>

          {/* Bottom Right */}
          <svg
            className="absolute -bottom-2 -right-2 w-4 h-4 text-zinc-700"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M16 16 L16 10 M16 16 L10 16"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>

          {/* Portrait Image */}
          <div className="aspect-[3/4] relative overflow-hidden rounded-sm border border-white/5 shadow-[0_0_30px_-10px_rgba(16,185,129,0.3)]">
            <Image
              src="/assets/commander.jpg"
              alt="Commander Profile"
              fill
              className="object-cover w-full h-full grayscale contrast-125 hover:grayscale-0 transition-all duration-500"
              sizes="(max-width: 768px) 100vw, 50vw"
            />

            {/* Status Badge - Bottom Left */}
            <div className="absolute bottom-4 left-4 z-10 rounded-sm border border-emerald-500/50 bg-emerald-500/10 px-3 py-1.5 backdrop-blur-sm">
              <p className="font-mono text-[10px] font-semibold uppercase tracking-wider text-emerald-500">
                STATUS: ACTIVE
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Intel */}
        <div className="space-y-6">
          {/* Headline */}
          <h2 className="font-mono text-4xl font-bold uppercase tracking-tighter text-zinc-200">
            THE ARCHITECT
          </h2>

          {/* Subline */}
          <p className="font-mono text-sm text-emerald-500 uppercase tracking-wider">
            OPERATOR ID: [ COMMANDER ] // HEAD COACH
          </p>

          {/* Manifesto */}
          <div className="rounded-sm border border-white/5 bg-zinc-900/50 p-6">
            <p className="font-sans text-zinc-400 leading-relaxed">
              I don't train civilians. I forge weapons. The Hybrid Protocol is not a suggestion—it is a requirement for modern survival. We build athletes who can sprint, fight, and lift heavy. No compromises.
            </p>
          </div>

          {/* Service Timeline */}
          <div className="space-y-4">
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
                  <div className="flex-1 rounded-sm border border-white/5 bg-zinc-900/50 p-4">
                    <p className="font-mono text-sm font-bold text-emerald-500 mb-1">
                      {item.year}
                    </p>
                    <p className="font-sans text-sm text-zinc-300">{item.label}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </Container>
  );
}

