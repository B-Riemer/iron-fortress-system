"use client";

import { ButtonPrimary } from "@/components/ui/button/button-primary";
import { ButtonSecondary } from "@/components/ui/button/button-secondary";

export function HeroCta() {
  const handleLearnMore = () => {
    document.getElementById("methodology")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
      <ButtonPrimary href="/login">Begin Mission</ButtonPrimary>
      <ButtonSecondary as="button" onClick={handleLearnMore}>
        Learn More
      </ButtonSecondary>
    </div>
  );
}

