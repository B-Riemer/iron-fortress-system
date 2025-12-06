"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSoundFx } from "@/hooks/use-sound-fx";

export function BootSequence() {
  const [showBoot, setShowBoot] = useState(false);
  const [step, setStep] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const { playTypewriter, playConfirm } = useSoundFx();

  useEffect(() => {
    // Check sessionStorage
    if (typeof window !== "undefined") {
      const booted = sessionStorage.getItem("booted");
      if (booted) {
        return; // Don't show boot sequence
      }
      setShowBoot(true);
    }
  }, []);

  useEffect(() => {
    if (!showBoot) return;

    let typewriterInterval1: NodeJS.Timeout | null = null;
    let typewriterInterval2: NodeJS.Timeout | null = null;

    // Step 1: "INITIALIZING IRON KERNEL..." (Typewriter effect)
    const step1Timer = setTimeout(() => {
      setStep(1);
      const text = "INITIALIZING IRON KERNEL...";
      let index = 0;
      typewriterInterval1 = setInterval(() => {
        if (index < text.length) {
          setDisplayText(text.slice(0, index + 1));
          // Play keyboard sound on each character (except spaces)
          if (text[index] !== " ") {
            playTypewriter();
          }
          index++;
        } else {
          if (typewriterInterval1) clearInterval(typewriterInterval1);
        }
      }, 30);
    }, 500);

    // Step 2: "DECRYPTING USER DATA..." (Typewriter effect with glitch)
    const step2Timer = setTimeout(() => {
      setStep(2);
      const text = "DECRYPTING USER DATA...";
      let index = 0;
      setDisplayText(""); // Reset display text
      typewriterInterval2 = setInterval(() => {
        if (index < text.length) {
          setDisplayText(text.slice(0, index + 1));
          // Play keyboard sound on each character (except spaces)
          if (text[index] !== " ") {
            playTypewriter();
          }
          index++;
        } else {
          if (typewriterInterval2) clearInterval(typewriterInterval2);
        }
      }, 30);
    }, 1500);

    // Step 3: "UPLINK ESTABLISHED." (Blinking cursor + confirmation sound)
    const step3Timer = setTimeout(() => {
      setStep(3);
      playConfirm(); // PC confirmation sound
      setDisplayText("UPLINK ESTABLISHED.");
    }, 2500);

    // Step 4: Exit animation (starts at 3.0s, animation takes 0.5s)
    const exitTimer = setTimeout(() => {
      setShowBoot(false);
      if (typeof window !== "undefined") {
        sessionStorage.setItem("booted", "true");
      }
    }, 3000);

    return () => {
      clearTimeout(step1Timer);
      clearTimeout(step2Timer);
      clearTimeout(step3Timer);
      clearTimeout(exitTimer);
      if (typewriterInterval1) clearInterval(typewriterInterval1);
      if (typewriterInterval2) clearInterval(typewriterInterval2);
    };
  }, [showBoot, playTypewriter, playConfirm]);

  if (!showBoot) return null;

  return (
    <AnimatePresence>
      {showBoot && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ y: "-100%", transition: { duration: 0.5, ease: "easeInOut" } }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-zinc-950"
        >
          <div className="font-mono text-emerald-500 text-lg tracking-wider">
            {/* Step 1: Typewriter effect */}
            {step === 1 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center gap-2"
              >
                <span>{displayText}</span>
                <motion.span
                  animate={{ opacity: [1, 0] }}
                  transition={{ duration: 0.5, repeat: Infinity }}
                >
                  |
                </motion.span>
              </motion.div>
            )}

            {/* Step 2: Typewriter effect with glitch */}
            {step === 2 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center gap-2"
              >
                <motion.span
                  animate={{
                    x: [0, -1, 1, -1, 0],
                    opacity: [1, 0.9, 1, 0.95, 1],
                  }}
                  transition={{
                    duration: 0.05,
                    repeat: Infinity,
                    repeatType: "reverse",
                  }}
                >
                  {displayText}
                </motion.span>
                <motion.span
                  animate={{ opacity: [1, 0] }}
                  transition={{ duration: 0.5, repeat: Infinity }}
                >
                  |
                </motion.span>
              </motion.div>
            )}

            {/* Step 3: Blinking cursor */}
            {step === 3 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center gap-2"
              >
                <span>UPLINK ESTABLISHED.</span>
                <motion.span
                  animate={{ opacity: [1, 0] }}
                  transition={{ duration: 0.5, repeat: Infinity }}
                >
                  |
                </motion.span>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

