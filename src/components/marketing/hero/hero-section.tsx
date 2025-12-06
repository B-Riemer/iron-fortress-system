import { Container } from "@/components/ui/layout/container";
import { HeroVideo } from "./hero-video";
import { HeroHeadline } from "./hero-headline";
import { HeroSubheadline } from "./hero-subheadline";
import { HeroIcons } from "./hero-icons";
import { HeroCta } from "./hero-cta";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden min-h-screen flex flex-col justify-center">
      {/* Layer 1: Video Background */}
      <HeroVideo />

      {/* Layer 2: Content - Above video */}
      <div className="relative z-10 container mx-auto max-w-4xl text-center px-4 py-24">
        <HeroHeadline />
        <HeroSubheadline />
        <HeroIcons />
        <HeroCta />
      </div>
    </section>
  );
}

