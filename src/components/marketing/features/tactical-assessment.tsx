"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Container } from "@/components/ui/layout/container";
import { TacticalCard } from "@/components/ui/layout/tactical-card";
import { ButtonPrimary } from "@/components/ui/button/button-primary";
import { Terminal, Lock } from "lucide-react";
import { cn } from "@/lib/utils";

type Step = 1 | 2 | 3 | 4;
type Objective = "hypertrophy" | "endurance" | "hybrid" | null;
type Status = "civilian" | "rookie" | "operator" | null;

export function TacticalAssessment() {
  const [step, setStep] = useState<Step>(1);
  const [objective, setObjective] = useState<Objective>(null);
  const [status, setStatus] = useState<Status>(null);
  const [progress, setProgress] = useState(0);

  // Step 3: Progress bar animation
  useEffect(() => {
    if (step === 3) {
      setProgress(0);
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setTimeout(() => setStep(4), 500);
            return 100;
          }
          return prev + 2;
        });
      }, 40); // 2 seconds total (100 * 40ms = 4000ms, but we increment by 2 so 2000ms)

      return () => clearInterval(interval);
    }
  }, [step]);

  const handleObjectiveSelect = (value: Objective) => {
    setObjective(value);
    setStep(2);
  };

  const handleStatusSelect = (value: Status) => {
    setStatus(value);
    setStep(3);
  };

  const reset = () => {
    setStep(1);
    setObjective(null);
    setStatus(null);
    setProgress(0);
  };

  return (
    <Container className="py-24">
      <div className="mx-auto max-w-2xl">
        <div className="mb-8 text-center">
          <div className="mb-4 flex justify-center">
            <div className="rounded-sm bg-emerald-500/10 p-3">
              <Terminal className="h-6 w-6 text-emerald-500" />
            </div>
          </div>
          <h2 className="font-mono text-3xl font-bold uppercase tracking-tight text-zinc-200">
            TACTICAL ASSESSMENT
          </h2>
          <p className="mt-2 font-sans text-sm text-zinc-400">
            Calculate your optimal training protocol
          </p>
        </div>

        <TacticalCard className="rounded-sm">
          <AnimatePresence mode="wait">
            {/* Step 1: Select Objective */}
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-6"
              >
                <div className="mb-4">
                  <p className="font-mono text-[10px] uppercase tracking-widest text-zinc-500 mb-2">
                    STEP 1
                  </p>
                  <h3 className="font-sans text-lg font-medium tracking-tight text-zinc-200">
                    Select Objective
                  </h3>
                </div>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                  {[
                    { value: "hypertrophy" as const, label: "HYPERTROPHY" },
                    { value: "endurance" as const, label: "ENDURANCE" },
                    { value: "hybrid" as const, label: "HYBRID" },
                  ].map((option) => (
                    <button
                      key={option.value}
                      onClick={() => handleObjectiveSelect(option.value)}
                      className="rounded-sm border border-zinc-800 bg-zinc-950 p-4 text-center font-mono text-sm font-semibold uppercase tracking-wider text-zinc-300 transition-all hover:border-emerald-500 hover:bg-emerald-500/10 hover:text-emerald-500"
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Step 2: Select Status */}
            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-6"
              >
                <div className="mb-4">
                  <p className="font-mono text-[10px] uppercase tracking-widest text-zinc-500 mb-2">
                    STEP 2
                  </p>
                  <h3 className="font-sans text-lg font-medium tracking-tight text-zinc-200">
                    Select Status
                  </h3>
                </div>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                  {[
                    { value: "civilian" as const, label: "CIVILIAN" },
                    { value: "rookie" as const, label: "ROOKIE" },
                    { value: "operator" as const, label: "OPERATOR" },
                  ].map((option) => (
                    <button
                      key={option.value}
                      onClick={() => handleStatusSelect(option.value)}
                      className="rounded-sm border border-zinc-800 bg-zinc-950 p-4 text-center font-mono text-sm font-semibold uppercase tracking-wider text-zinc-300 transition-all hover:border-emerald-500 hover:bg-emerald-500/10 hover:text-emerald-500"
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
                <button
                  onClick={() => setStep(1)}
                  className="font-mono text-xs text-zinc-500 hover:text-zinc-300 transition-colors"
                >
                  ← Back
                </button>
              </motion.div>
            )}

            {/* Step 3: Calculating */}
            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-6"
              >
                <div className="mb-4 text-center">
                  <p className="font-mono text-[10px] uppercase tracking-widest text-zinc-500 mb-2">
                    STEP 3
                  </p>
                  <h3 className="font-sans text-lg font-medium tracking-tight text-zinc-200">
                    Calculating...
                  </h3>
                </div>
                <div className="space-y-2">
                  <div className="h-2 w-full rounded-sm bg-zinc-800 overflow-hidden">
                    <motion.div
                      className="h-full bg-emerald-500"
                      initial={{ width: 0 }}
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 0.1 }}
                    />
                  </div>
                  <p className="font-mono text-xs text-center text-zinc-500">
                    {progress}% Complete
                  </p>
                </div>
              </motion.div>
            )}

            {/* Step 4: Result */}
            {step === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-6 text-center"
              >
                <div className="mb-4 flex justify-center">
                  <div className="rounded-sm bg-zinc-900/50 backdrop-blur-sm border border-white/5 p-4">
                    <Lock className="h-8 w-8 text-emerald-500" />
                  </div>
                </div>
                <div className="mb-4 text-center">
                  <p className="font-mono text-[10px] uppercase tracking-widest text-zinc-500 mb-2">
                    ANALYSIS COMPLETE
                  </p>
                  <h3 className="font-sans text-lg font-medium tracking-tight text-zinc-200">
                    Classified
                  </h3>
                </div>
                <div className="rounded-sm border border-emerald-500/50 bg-zinc-950/50 backdrop-blur-sm p-6">
                  <p className="font-mono text-sm text-zinc-400 mb-4">
                    Your tactical assessment report is ready. Access requires
                    authentication.
                  </p>
                  <ButtonPrimary href="/login" as="link" className="w-full">
                    LOGIN TO VIEW REPORT
                  </ButtonPrimary>
                </div>
                <button
                  onClick={reset}
                  className="font-mono text-xs text-zinc-500 hover:text-zinc-300 transition-colors"
                >
                  Start Over
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </TacticalCard>
      </div>
    </Container>
  );
}

