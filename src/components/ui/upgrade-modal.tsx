"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldAlert, X } from "lucide-react";
import { ButtonPrimary } from "@/components/ui/button/button-primary";
import { ButtonSecondary } from "@/components/ui/button/button-secondary";
import { cn } from "@/lib/utils";

interface UpgradeModalProps {
  isOpen: boolean;
  onClose: () => void;
  level?: number;
}

export function UpgradeModal({ isOpen, onClose, level = 2 }: UpgradeModalProps) {
  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  const handleUpgrade = () => {
    // Close modal and let the link handle navigation
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
            onClick={onClose}
          >
            {/* Modal Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ 
                opacity: 1, 
                scale: 1, 
                y: 0,
                x: [0, -10, 10, -10, 10, -5, 5, 0], // Shake animation
              }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ 
                duration: 0.3,
                x: {
                  duration: 0.5,
                  times: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7],
                }
              }}
              onClick={(e) => e.stopPropagation()}
              className={cn(
                "relative w-full max-w-md rounded-sm border bg-zinc-950 p-8 shadow-xl",
                "border-red-500/50"
              )}
            >
              {/* Corner Accents - Top Left */}
              <svg
                className="absolute top-0 left-0 w-3 h-3 text-red-500/50"
                viewBox="0 0 12 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0 0 L0 4 M0 0 L4 0"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>

              {/* Corner Accents - Top Right */}
              <svg
                className="absolute top-0 right-0 w-3 h-3 text-red-500/50"
                viewBox="0 0 12 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 0 L12 4 M12 0 L8 0"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>

              {/* Corner Accents - Bottom Left */}
              <svg
                className="absolute bottom-0 left-0 w-3 h-3 text-red-500/50"
                viewBox="0 0 12 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0 12 L0 8 M0 12 L4 12"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>

              {/* Corner Accents - Bottom Right */}
              <svg
                className="absolute bottom-0 right-0 w-3 h-3 text-red-500/50"
                viewBox="0 0 12 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 12 L12 8 M12 12 L8 12"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>

              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 text-zinc-600 hover:text-zinc-300 transition-colors"
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>

              {/* Icon */}
              <div className="mb-6 flex justify-center">
                <motion.div
                  animate={{ 
                    scale: [1, 1.1, 1],
                  }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="rounded-sm bg-red-500/10 p-4 border border-red-500/30"
                >
                  <ShieldAlert className="h-12 w-12 text-red-500" />
                </motion.div>
              </div>

              {/* Headline */}
              <h2 className="mb-4 text-center font-mono text-xl font-bold uppercase tracking-wider text-red-500">
                RESTRICTED ACCESS // LEVEL {level} REQUIRED
              </h2>

              {/* Body */}
              <p className="mb-8 text-center font-sans text-sm leading-relaxed text-zinc-400">
                This intel is classified for Operators only. Upgrade your clearance to proceed.
              </p>

              {/* Actions */}
              <div className="flex flex-col gap-3">
                <ButtonPrimary 
                  href="/#pricing" 
                  as="link" 
                  className="w-full"
                  onClick={handleUpgrade}
                >
                  UPGRADE CLEARANCE
                </ButtonPrimary>
                <ButtonSecondary onClick={onClose} className="w-full">
                  ABORT
                </ButtonSecondary>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

